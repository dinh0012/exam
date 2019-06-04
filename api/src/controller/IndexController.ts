export class IndexController {
    public index(req, res) {
        console.log(111)
        res.json({"a":1});
    }
    public helloWorld(req, res) {
        console.log(111)
        res.send('Hello World!');
    }
}

