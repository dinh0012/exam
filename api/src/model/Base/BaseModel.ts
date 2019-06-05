import {DB} from "../DB/db";
import {isArray} from "lodash";
import {forEachComment} from "tslint";
interface ConditionParameters {
  column: string,
  operator: string,
  value: any,
}
type TypeConditionParameters = ConditionParameters[]

class BaseModel {
  public tableName = "";
  public query: string = "";
  public selects: string = "";
  public conditions: string = "";
  public bindValues: any[] = [];

  public async insert(value: object) {
    const query = `INSERT INTO ${this.tableName} SET ?`
    return await DB.getInstance().query(query, value)
  }

  public async select(column: string[] | string) {
    if (isArray(column)) {
      column = column.join(",");
    }
    this.selects = `SELECT ${column} FROM ${this.tableName} `
    return this;
  }

  public async where(...condition: TypeConditionParameters) {
    const length = condition.length;
    let column
    let  operator
    let value

    switch (length) {
      case 1:
        if (isArray(condition[0])) {
          this.query += this.where(condition[0]);
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
    this.bindValues.push(value)
    const andStatement = this.conditions ? " AND " : "";
    this.conditions += ` ${andStatement} WHERE ${column} ${operator} ? `
    return this;
  }

  public async first() {
    const query = this.selects + this.conditions + " LIMIT 1"
    return await DB.getInstance().query(query, this.bindValues)
  }
}
