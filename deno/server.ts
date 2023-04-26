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

import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { valid as emailValid } from "https://deno.land/x/validation@v0.4.0/email.ts";
import * as uuid from "https://deno.land/std/uuid/mod.ts";
import { Zoic } from "https://deno.land/x/zoic/zoic.ts";
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import LRU from "https://deno.land/x/lru_cache@6.0.0-deno.4/mod.ts";
import * as log from "https://deno.land/std/log/mod.ts";

await log.setup({
    handlers: {
      console: new log.handlers.ConsoleHandler("DEBUG", {
        formatter: "[{datetime}] {levelName} {msg}",
      }),
  
      file: new log.handlers.FileHandler("DEBUG", {
        filename: "./log.txt",
        // you can change format of output message using any keys in `LogRecord`.
        formatter: "[{datetime}] {levelName} {msg}",
      }),
    },
  
    loggers: {
      // configure default logger available via short-hand methods above.
      default: {
        level: "DEBUG",
        handlers: ["console", "file"],
      },
    },
  });

const logger = log.getLogger();

const ipCache = new LRU<any, any>({
    max: 500
    , length: () => 1
    , dispose: (key, n) => (0)
    , maxAge: 1000 * 60
});

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
        // the form data is fully available
        const { fields } = formData;
        logger.debug(`Attempted request from ${ctx.request.ip} ${JSON.stringify(formData)}` )
        const email = fields.email.trim()
        const firstname = fields.firstname.trim()
        const lastname = fields.lastname.trim()
        const job = fields.job.trim()
        const city = fields.city.trim()

        if (email == '' || firstname == '' || lastname == '' || job == '' || city == '') {
            logger.debug(`Empty inputs "${email}", "${firstname}" "${lastname}" "${job}" "${city}"`)
        }
        

        if (!emailValid(email) || await Signatures.where("email", email).select("email").count() > 0) {
            logger.debug(`Incorrect email or existing: ${email}`)
            ctx.response.body = 'Špatný formát e-mailu, nebo e-mail byl již registrován na jiný podpis!';
            return;
        }

        if (ipCache.get(ctx.request.ip) === 'marked') {
            logger.debug(`Bounce back, accessed IP: ${ctx.request.ip}`)
            ctx.response.body = 'IP adresa již byla použita v jiné žádosti, počkejte prosím!';
            return;
        }

        const consent = (fields.consent === "1");
        const token = uuid.v1.generate().toString();

        logger.debug(`Sending email token for: "${email}" with token: ${token}`)
        const client = new SmtpClient();
        await client.connectTLS({
            hostname: env.get('DENO_SERV') || '',
            port: Number(env.get('DENO_PORT') || 465),
            username: env.get('DENO_USER') || '',
            password: env.get('DENO_PASS') || '',
        }).then(() => logger.debug('SMTP connected!'));

        const blob = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            job: job,
            consent,
            token,
            ip: ctx.request.ip,
            city,
        }
        await client.send({
            from: env.get('DENO_FROM') || env.get('DENO_USER') || '',
            to: `${email}`,
            subject: "[Scala Petice] Zadost o overeni podpisu",
            content: "Do petice pod názvem Scala ve Scale jsme zaznamenali Váš online podpis! Děkujeme a držme si palce, že naše milované kino zůstane přesně takové, jaké je! Aby váš podpis byl řádne zaznamenán, potřebuje od vás potvrzení formou kliknutí na odkaz níže.",
            html: `Dobrý den,<br />
Do petice pod názvem Scala ve Scale jsme zaznamenali Váš online podpis! Děkujeme a držme si palce, že naše milované kino zůstane přesně takové, jaké je! Aby váš podpis byl řádne zaznamenán, potřebuje od vás potvrzení formou kliknutí na odkaz níže.<br />
<br />
<a href='${SERVER_URL}/confirm?email=${email}&token=${token}'>${SERVER_URL}/confirm?email=${email}&token=${token}</a><br />
<br />
Nezapomeňte prosím, že tato online petice není právně závazná a že pro širší podporu Scaly je možné podepsat i petici písemnou, právně závaznou. Neváhejte sledovat náš IG - <a href="https://instagram.com/scala_ve_scale/" target="_blank" rel="noreferrer">Scala ve Scale</a>, kde se dozvíte více jak o této petici, tak o dění okolo boje za Scalu.<br />
<br />
S pozdravem,<br />
Inciativa Scala ve Scale`,
        });
        await client.close()
        logger.debug(`The email should be sent out!: ${email}, ${token}`)
        logger.debug(`Marking IP as tainted: ${ctx.request.ip}`)
        ipCache.set(ctx.request.ip, 'marked')
        logger.debug(`Marked!: ${ctx.request.ip}`)
        logger.debug(`Writing data to database: ${JSON.stringify(blob)}`)
        await Signatures.create(blob)
        logger.debug(`Done! ${JSON.stringify(blob)}`)


        ctx.response.body = 'ok';
    } else {
        ctx.response.body = 'Zlá žádost!';
    }
});

function generateBody(headline: string, text: string) {
    return new TextEncoder().encode(`
      <!doctype html>
      <html>
      tasks: {
        level: "ERROR",
        handlers: ["console"],
      },
        <head>
          <meta charset="utf-8">
          <title>${headline}</title>
        </head>
        <body>
          <div style="display: flex; justify-content: center; align-items: center; font-family: Tahoma, sans-serif">
          <div style="text-align: center">
           <h1>${headline}</h1>
           <p>${text}</p>
           </div>
          </div>
        </body>
      </html>
`);
}

router.get('/confirm', async (ctx) => {
    const token = (ctx.request.url.searchParams.get('token') || '').trim()
    const email = (ctx.request.url.searchParams.get('email') || '').trim()
    logger.debug(`Token confirmation request: ${email}, ${token}, ${ctx.request.ip}`)
    if (email == '' || token == '' || !emailValid(email)) {
        ctx.response.body = 'Zlá žádost!';
        logger.debug('Fail!')
        return;
    }log

    try {
        const candidate = await Signatures.where('email', email).get() as Signatures[]

        if (candidate[0].token == '') {
            ctx.response.body = generateBody('Email již byl potvrzen!', 'Petici jste již podepsali. Děkujeme za ochotu!')
            logger.debug('Already signed!')
            return;
        }
        candidate[0].token = ''
        await candidate[0].update()

        ctx.response.body = generateBody('Úspěch!', 'Děkujeme za potvrzení e-mailu, Váš hlas byl zaregistrován do petice!')
        logger.debug(`Success! ${email}, ${token}`)
    } catch {
        ctx.response.body = generateBody('Chyba!', 'Neznama chyba!')
        logger.debug(`Fatal failure! "${email}", "${token}"`)
    }
})

const countCache = new Zoic({
    cache: 'LFU',
    expire: '5m, 3s',
    capacity: 15,
});

router.get('/count', countCache.use, async (ctx) => {
    ctx.response.body = await Signatures.where('token', '=', '').count()
})

router.get('/names', countCache.use, async (ctx) => {
    const names = await Signatures.where("consent", true).where("token", "").select("firstName", "lastName", "job").limit(10).orderBy("id", "desc").get()
    ctx.response.body = JSON.stringify(names)
})

const itemCache = new Zoic({
    cache: 'LFU',
    expire: '15m, 3s',
    capacity: 100,
});

import { isNumber } from "https://deno.land/x/is_number/mod.ts";

router.get('/fetch/:page', itemCache.use, async (ctx) => {
    if (ctx?.params?.page == null || !isNumber(ctx.params.page)) {
        ctx.response.body = 'nok';
        return;
    }
    const page = Number(ctx?.params?.page)
    const skipOffset = page * 10
    const limit = 10
    const names = await Signatures.where("consent", true).where("token", "").select("firstName", "lastName", "job", "city", "created_at").skip(skipOffset).limit(limit).orderBy("id", "desc").get()
    ctx.response.body = JSON.stringify(names)
})

app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());
app.use(router.allowedMethods());
logger.debug('Server should be running! <star>')

// await app.listen({port: 8080})
app.listen({ port: 443, certFile: '/etc/letsencrypt/live/pocitadlo.scalavescale.cz/cert.pem', keyFile: '/etc/letsencrypt/live/pocitadlo.scalavescale.cz/privkey.pem' });
await app.listen({ port: 8080, certFile: '/etc/letsencrypt/live/pocitadlo.scalavescale.cz/cert.pem', keyFile: '/etc/letsencrypt/live/pocitadlo.scalavescale.cz/privkey.pem' });
