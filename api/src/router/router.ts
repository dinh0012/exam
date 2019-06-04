import express from "express";
import {routes} from "./routeConfig";
import * as Controller from "../controller";

export const router = express.Router();

routes.map((route) => {
  const method = route.method;
  const path = route.path;
  const actionController = route.actionController;
  const explode = actionController.split("@");
  const action = explode[1];
  const controller = explode[0];

  router[method](path, (req, res) => {
    const obj = new Controller[controller]();
    obj[action](req, res);
  });
});
