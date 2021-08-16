import Router from "express-promise-router";
import clubController from "./controllers/club.controller";
const clubRouter = Router();

// GET
clubRouter.get('/', clubController.get);

// POST
clubRouter.post('/', clubController.insertClub);

export default clubRouter;