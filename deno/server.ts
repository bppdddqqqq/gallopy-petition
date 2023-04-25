import { DataTypes, Database, Model, SQLite3Connector } from 'https://deno.land/x/denodb_updated/mod.ts';
import { SERVER_URL } from '../src/global.js'

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

const env = Deno.env;
//todo: remove drop when in prod!
if (env.get('DENO_FIRST_START') === 'TRUE')
    await db.sync({ drop: true });
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

const ipCache = new LRU<string, string>({
    max: 4096
    , length: (n, key) => 1
    , dispose: (key, n) =>  (0)
    , maxAge: 1000 * 15
});

const client = new SmtpClient();

router.get('/', (ctx) => {
    ctx.response.body = 'hello!';
})

router.post('/sign', async (ctx) => {
    const body = ctx.request.body();
    if (body.type === "form-data") {
        const value = body.value;
        const formData = await value.read();
        // the form data is fully available
        const { fields } = formData;
        console.debug('Attempted request:', formData)
        const { email, firstname, lastname, job, city } = fields

        if (ipCache.get(ctx.request.ip) === 'marked') {
            console.debug('Bounce back, accessed IP: ', ctx.request.ip)
            ctx.response.body = 'IP adresa již byla použita v jiné predošlé žádosti, počkejte prosím!';
            return;
        }
        if (!emailValid(email) || await Signatures.where("email", email).select("email").count() > 0) {
            console.debug('Incorrect email or existing: ', email)
            ctx.response.body = 'Zlý format e-mailu nebo e-mail byl už registrován na jiný podpis!';
            return;
        }

        const consent = (fields.consent === "1");
        const token = uuid.v1.generate().toString();
        console.debug('Sending email token for: ', email, 'with token: ', token)
        await client.connectTLS({
            hostname: env.get('DENO_SERV') || "email-smtp.us-east-1.amazonaws.com",
            port: env.get('DENO_PORT') || 465,
            username: env.get('DENO_USER'),
            password: env.get('DENO_PASS'),
          }).then(() => console.log('SMTP connected!'));
        await client.send({
            from: "scala.noreply@gmail.com",
            to: email,
            subject: "[Scala Petice] Zadost o potvrzeni emailu pro podpis",
            content: ".z",
            html: `Dobry den, posilame vam informaci, ze jste na nasem webu www.scalavescale.cz podepsal petici a je nutne pro dokonceni podpisu potvrdit email touhle spravou. Pro potvrzeni stlacte odkaz nize <a href='${SERVER_URL}/confirm?email=${email}&token=${token}'>${SERVER_URL}/confirm?email=${email}&token=${token}</a>`,
        });
        await client.close()
        console.debug('The email should be sent out!: ', email, token)
        console.debug('Writing data to database: ', formData)
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
        console.debug('Done!', formData)
        console.debug('Marking IP as tainted: ', ctx.request.ip)
        ipCache.set(ctx.request.ip, 'marked')
        console.debug('Marked!:', ctx.request.ip)
        
        ctx.response.body = 'ok';
    } else {
        ctx.response.body = 'Zlá žádost!';
    }
});

router.get('/confirm', async (ctx) => {
    const token = ctx.request.url.searchParams.get('token') || ''
    const email = ctx.request.url.searchParams.get('email') || ''
    console.debug("Token confirmation request: ", email, token, ctx.request.ip)
    if (email == '' || token == '' || !emailValid(email)) {
        ctx.response.body = 'Zlá žádost!';
        console.debug('Fail!')
        return;
    }

    try {
        const candidate = await Signatures.where('email', email).where('token', token).get() as Signatures[]
    
        candidate[0].token = ''
        await candidate[0].update()
        
        ctx.response.body = 'Dekujeme, za potvrzeni emailu, vas hlas byl zaregistrovan do petice!'
        console.debug('Success!')
    } catch {
        ctx.response.body = 'Chyba! Uz jste petici podepsali!'
        console.debug('Fatal failure!')
    }
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
console.log('Server should be running! <star>')
await app.listen({ port: 8080, certFile: '/etc/letsencrypt/live/pocitadlo.scalavescale.cz/cert.pem', keyFile: '/etc/letsencrypt/live/pocitadlo.scalavescale.cz/privkey.pem' });