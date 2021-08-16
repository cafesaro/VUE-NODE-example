import Router from "express-promise-router";
import playerController from "./controllers/player.controller";
const playerRouter = Router();

// GET
playerRouter.get('/', playerController.get);

// POST
playerRouter.post('/', playerController.insertPlayer);

export default playerRouter;