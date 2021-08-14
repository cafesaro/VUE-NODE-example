import Router from "express-promise-router";
import playerController from "./controllers/player.controller";
const playerRouter = Router();

playerRouter.get('/', playerController.get);

export default playerRouter;