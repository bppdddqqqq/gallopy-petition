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
      city: DataTypes.STRING,
      ip: DataTypes.STRING,

      token: DataTypes.STRING,
    };
  }

db.link([Signatures]);

const env = Deno.env;
if (env.get('DENO_FIRST_START') === 'TRUE')
    await db.sync({ drop: true });