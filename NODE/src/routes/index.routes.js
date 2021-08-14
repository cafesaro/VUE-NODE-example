import Router from "express-promise-router";
import clubRouter from "../modules/club/club.routes";
import playerRouter from "../modules/player/player.routes";

const router = Router();

router.use('/club', clubRouter);
router.use('/player', playerRouter);


export default router;