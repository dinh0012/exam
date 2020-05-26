import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import bodyParser from "body-parser"
import syncRequest from "sync-request"
// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = 8080;

const app: any = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/download", function(req, res, next) {
    let filePath = `${__dirname}/a.docx`
    let fileName = "a.docx"; // The default name the browser will use
    res.download(filePath, fileName);
});
// define a route handler for the default home page
app.post("/track",  (req, res) => {
    console.log('status', req.body.status)
    let updateFile =  (response, body, path) => {
        if (body.status === 2) {
            let file = syncRequest("GET", body.url);
            console.log("data", file.getBody())

            fs.writeFileSync(path, file.getBody());
        }

        response.write("{\"error\":0}");
        response.end();
    }

    let readbody = function(request, response, path) {
        let content = "";
        request.on("data", function(data) {
            content += data;
        });
        console.log("data", JSON.parse(content))

        request.on("end", function() {
            let body = JSON.parse(content);
            updateFile(response, body, path);
        });
    }
    const pathForSave = `${__dirname}/b.docx`
    if (req.body.hasOwnProperty("status")) {
        updateFile(res, req.body, pathForSave);
    } else {
        readbody(req, res, pathForSave)
    }
});

// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${ port }`);
});
