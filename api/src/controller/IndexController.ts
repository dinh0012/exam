import {DB} from "../model/DB/db";
import {Request, Response} from "express-serve-static-core";

export class IndexController {
    public async index(req: Request, res: Response) {
        const a = await DB.getInstance().query("select * from questions where id = ?", [1])
        res.json({a});

    }
    public helloWorld(req: Request, res: Response) {
        res.send("Hello World!");
    }
}
