import dotenv from "dotenv";
import mysql, {Connection, queryCallback, QueryFunction} from "mysql";

dotenv.config();
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const database = process.env.DB_NAME;

export class DB {
  public static instance: DB;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new DB();
    }

    return this.instance;
  }

  public connection: Connection = null;

  constructor() {
    if (!this.connection) {
      this.connection = mysql.createConnection({
        host,
        user,
        password,
        database
      });
    }
  }

  public getConnection() {
    return this.connection
  }

  public query(query: string, value: any, cb: queryCallback = null) {
    this.connection.query(query, value, (err, rows, fields) => {
      if (err) {
        throw err;
      }
      cb && cb(rows, fields)
    });
  }

}
