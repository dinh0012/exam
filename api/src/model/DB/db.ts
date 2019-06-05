import dotenv from "dotenv";
import mysql, {Connection, Pool, PoolConnection, queryCallback, QueryFunction} from "mysql";

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

  public connection: Pool = null;

  constructor() {
    if (!this.connection) {
      this.connection = mysql.createPool({
        host,
        user,
        password,
        database
      });
      this.connection.getConnection((err, connection) => {
        if (err) {
          if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error("Database connection was closed.")
          }
          if (err.code === "ER_CON_COUNT_ERROR") {
            console.error("Database has too many connections.")
          }
          if (err.code === "ECONNREFUSED") {
            console.error("Database connection was refused.")
          }
        }
        if (connection) { connection.release() }
      })
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
