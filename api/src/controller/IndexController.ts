import {DB} from "../model/DB/db";
import {Request, Response} from "express-serve-static-core";
import Questions from "../model/Questions";

export class IndexController {
  public async index(req: Request, res: Response) {
    const questions = new Questions()
    const a = await questions.insert({question: "this is a question"});
    res.json({a});

  }

  public helloWorld(req: Request, res: Response) {
    res.send("Hello World!");
  }
}
