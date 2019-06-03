import dotenv from "dotenv";
import express from "express";
import * as Controller from  "./controller";

import {routes} from './route';

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime 
// as if it were an environment variable
const port = process.env.SERVER_PORT;

const app = express();

// define a route handler for the default home page
routes.map((route) => {
    const method = route.method;
    const path = route.path;
    const actionController = route.actionController;
    const explode = actionController.split('@');
    const action = explode[1];
    const controller = explode[0];
    app[method](path, function (req, res) {
        const obj = new Controller[controller]();
        obj[action](req, res);
    })
})

// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${ port }`);
});