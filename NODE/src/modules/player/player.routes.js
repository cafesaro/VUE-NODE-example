import Router from "express-promise-router";
import playerController from "./controllers/player.controller";
const playerRouter = Router();

// GET
playerRouter.get('/', playerController.get);

// POST
playerRouter.post('/', playerController.insertPlayer);

// PUT
playerRouter.put('/:idPlayer/toteam/:idClub', playerController.changePlayer);
playerRouter.put('/:idPlayer/noteam', playerController.deleteTeam);

export default playerRouter;