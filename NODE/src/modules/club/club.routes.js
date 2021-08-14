import Router from "express-promise-router";
import clubController from "./controllers/module.controller";
const clubRouter = Router();

clubRouter.get('/', moduleController.get);

export default clubRouter;