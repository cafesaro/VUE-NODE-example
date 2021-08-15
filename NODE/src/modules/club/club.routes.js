import Router from "express-promise-router";
import clubController from "./controllers/club.controller";
const clubRouter = Router();

clubRouter.get('/', clubController.get);

export default clubRouter;