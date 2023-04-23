import { DataTypes, Database, Model, SQLite3Connector } from 'https://deno.land/x/denodb_updated/mod.ts';

if 
const conn = new SQLite3Connector({
    filepath: 'app.db'
})

const db = new Database(conn);

class Signatures extends Model {
    static table = 'signatures';
    static timestamps = true;

    static fields = {
      id: { primaryKey: true, autoIncrement: true },
    
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      consent: DataTypes.BOOLEAN,
      job: DataTypes.STRING,
      city: DataTypes.STRING,
      ip: DataTypes.STRING,
    
      token: DataTypes.STRING,
    };
  }
  
db.link([Signatures]);

//todo: remove drop when in prod!
await db.sync({ drop: env['DENO_PRODUCTION_MODE']=='FALSE' });
// await db.sync()

import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { valid as emailValid } from "https://deno.land/x/validation@v0.4.0/email.ts";
import * as uuid from "https://deno.land/std/uuid/mod.ts";
import { Zoic } from "https://deno.land/x/zoic/zoic.ts";
import LRU from "https://deno.land/x/lru_cache@6.0.0-deno.4/mod.ts";
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const app = new Application();
const router = new Router();

const ipCache = new LRU<any, any>({
    max: 4096
    , length: (n, key) => 1
    , dispose: (key, n) =>  (0)
    , maxAge: 1000 * 15
});

import { readCSVObjects } from "https://deno.land/x/csv/mod.ts";
import env from 'https://deno.land/x/sqlite@v3.1.3/build/vfs.js';

let awsUsername = '';
let awsPassword = ''
if (env['DENO_PRODUCTION_MODE'] != 'TRUE') {
    const f = await Deno.open("./credentials.csv");
    for await (const obj of readCSVObjects(f)) {
        awsUsername = obj['Smtp Username']
        awsPassword = obj['Smtp Password\r']
    }
}

const client = new SmtpClient();

router.get('/', (ctx) => {
    ctx.response.body = 'hello!';
})

router.post('/sign', async (ctx) => {
    const body = ctx.request.body();
    if (body.type === "form-data") {
        const value = body.value;
        const formData = await value.read();
        console.log(formData)
        // the form data is fully available
        const { fields } = formData;
        const { email, firstname, lastname, job, city } = fields

        if (ipCache.has(ctx.request.ip)) {
            ctx.response.body = 'IP adresa jiz byla pouzita v jine zadosti!';
            return;
        }
        if (!emailValid(email) || await Signatures.where("email", email).select("email").count() > 0) {
            ctx.response.body = 'Zly format emailu nebo email byl pouzit!';
            return;
        }

        const consent = (fields.consent === "1");
        const token = uuid.v1.generate().toString();

        await client.connectTLS({
            hostname: env['DENO_SERV'] || "email-smtp.us-east-1.amazonaws.com",
            port: env['DENO_PORT'] || 465,
            username: env['DENO_USER'] || awsUsername,
            password: env['DENO_PASS'] || awsPassword,
          }).then(() => console.log('SMTP connected!'));
        await client.send({
            from: "scala.noreply@gmail.com",
            to: email,
            subject: "[Scala Petice] Zadost o potvrzeni emailu pro podpis",
            content: ".",
            html: `Dobry den, posilame vam informaci, ze jste na nasem webu podepsal petici a je nutne pro dokonceni podpisu potvrdit email touhle spravou. Pro potvrzeni stlacte odkaz nize <a href='http://localhost:8080/confirm?email=${email}&token=${token}'>http://localhost:8080/confirm?email=${email}&token=${token}</a>`,
        });
        await client.close()
        await Signatures.create({
            firstName: firstname,
            lastName: lastname,
            email,
            job,
            consent,
            token,
            ip: ctx.request.ip,
            city,
        })
        ipCache.set(ctx.request.ip, '')
        console.log(email, token)
        
        ctx.response.body = 'Odevzdáno!!';
    } else {
        ctx.response.body = 'Zlá žádost!';
    }
});

router.get('/confirm', async (ctx) => {
    const token = ctx.request.url.searchParams.get('token') || ''
    const email = ctx.request.url.searchParams.get('email') || ''
    if (email == '' || token == '' || !emailValid(email)) {
        ctx.response.body = 'Zlá žádost!';
        return;
    }

    const candidate = await Signatures.where('email', email).where('token', token).get() as Signatures[]
    
    candidate[0].token = ''
    await candidate[0].update()
    
    ctx.response.body = 'Dekujeme, za potvrzeni emailu, vas hlas byl zaregistrovan do petice!'
})

const countCache = new Zoic({
    cache: 'LFU',
    expire: '5m, 3s',
    capacity: 15,
});

router.get('/count', countCache.use, async (ctx) => {
    ctx.response.body = await Signatures.where('token', '').count()
})

router.get('/names', countCache.use, async (ctx) => {
    const names = await Signatures.where("consent", true).where("token", "").select("firstName", "lastName", "job").limit(10).orderBy("id", "desc").get()
    ctx.response.body = JSON.stringify(names)
})

app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: 8080 });