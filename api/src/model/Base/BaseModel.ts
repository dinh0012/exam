import {DB} from "../DB/db";
import {isArray} from "lodash";

export default class BaseModel {
  public  tableName = "";
  public  query: string = "";
  public  selects: string = "";
  public  conditions: string = "";
  public  bindValues: any[] = [];

  public  async insert(value: object) {
    const query = `INSERT INTO ${this.tableName} SET ?`
    return await DB.getInstance().query(query, value)
  }

  public  update(value: object) {
    this.query = `UPDATE ${this.tableName} SET ?`
    this.bindValues.push(value);
    return this
  }

  public  select(column: string[] | string) {
    if (isArray(column)) {
      column = column.join(",");
    }
    this.selects = `SELECT ${column} FROM ${this.tableName} `
    this.query = `SELECT ${column} FROM ${this.tableName} `
    return this;
  }

  public  where(...condition: any[]) {
    const length = condition.length;
    let column
    let  operator
    let value
    switch (length) {
      case 1:
        if (isArray(condition)) {
          condition.forEach((item) => {
            item.forEach((subItem: any) => {
              if (isArray(subItem)) {
                this.where( ...subItem);
              } else {
                this.where( ...item);
              }
            })
          })
        }
        break;
      case 2:
        column = condition[0]
        operator = "="
        value = condition[1]
        break;
      case 3:
        column = condition[0]
        operator = condition[1]
        value = condition[2]
        break;
      default:
        break
    }
    if (column) {
      this.bindValues.push(value)
      const andStatement = this.conditions ? " AND " : "";
      const WhereStatement = this.conditions ? "" : "WHERE";
      this.conditions += ` ${andStatement} ${WhereStatement} ${column} ${operator} ? `
    }
    return this;
  }

  public  async first() {
    this.query = this.query + " LIMIT 1"
    return await this.execute()
  }

  public  async get() {
    return await this.execute()
  }

  public async execute() {
    this.query += this.conditions
    const result = await DB.getInstance().query(this.query, this.bindValues)
    this.resetParameters();
    return  result;
  }

  private resetParameters() {
  this.query = "";
  this.selects = "";
  this.conditions = "";
  this.bindValues = [];
  }
}
