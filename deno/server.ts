import { DataTypes, Database, Model, SQLite3Connector } from 'https://deno.land/x/denodb_updated/mod.ts';

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
    
      token: DataTypes.STRING,
    };
  }
  
db.link([Signatures]);

//todo: remove drop when in prod!
// await db.sync({ drop: true });
// await db.sync()

import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { valid as emailValid } from "https://deno.land/x/validation@v0.4.0/email.ts";
import * as uuid from "https://deno.land/std/uuid/mod.ts";
import { Zoic } from "https://deno.land/x/zoic/zoic.ts";

const app = new Application();
const router = new Router();

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
        const { email, firstname, lastname, job } = fields
        if (!emailValid(email)) {
            ctx.response.body = 'bad email!';
            return;
        }

        const consent = (fields.consent === "1");
        const token = uuid.v1.generate().toString();

        try {
            await Signatures.create({
                firstName: firstname,
                lastName: lastname,
                email,
                job,
                consent,
                token,
            })
        } catch (e) {
            ctx.response.body = 'nok!';
            return;
        }
        console.log(token, await Signatures.count())
        
        ctx.response.body = 'submitted!';
    } else {
        ctx.response.body = 'nok!';
    }
});

router.get('/confirm', async (ctx) => {
    const token = ctx.request.url.searchParams.get('token') || ''
    const email = ctx.request.url.searchParams.get('email') || ''
    if (email == '' || token == '' || !emailValid(email)) {
        ctx.response.body = 'bad request';
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
    capacity: 1,
});

const nameCache = new Zoic({
    cache: 'LFU',
    expire: '15m, 3s',
    capacity: 1,
});

router.get('/count', countCache.use, async (ctx) => {
    ctx.response.body = await Signatures.where('token', '').count()
})

router.get('/names', nameCache.use, async (ctx) => {
    const names = await Signatures.where("consent", true).where("token", "").select("firstName", "lastName", "job").limit(10).orderBy("id", "desc").get()
    ctx.response.body = JSON.stringify(names)
})

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: 8080 });