import {DB} from '../DB/db';

class BaseModel {
  public tableName = '';

  public insert()
  {
    DB.getInstance().query("select * from questions where id = ?", [1], ( rows, fields) => {

    })
  }
}
