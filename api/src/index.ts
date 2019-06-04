import dotenv from "dotenv";
import express from "express";
import {router} from  "./router/router";

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;

const app: any = express();

// define a route handler for the default home page
app.use("/", router)

// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${ port }`);
});
