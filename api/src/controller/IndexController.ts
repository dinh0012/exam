import {DB} from "../model/DB/db";
import {Request, Response} from "express-serve-static-core";

export class IndexController {
    public index(req: Request, res: Response) {
        DB.getInstance().query("select * from questions where id = ?", [1], ( rows, fields) => {
            res.json({a: rows});
        })

    }
    public helloWorld(req: Request, res: Response) {
        res.send("Hello World!");
    }
}
