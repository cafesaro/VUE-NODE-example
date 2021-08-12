import Router from "express-promise-router";
import moduleController from "./controllers/module.controller.js";
const moduleRouter = Router();

moduleRouter.get('/', moduleController.get);

export default moduleRouter;