import Router from "express-promise-router";
import moduleRouter from "../modules/module/module.routes.js";
const router = Router();

router.use('/job-application', moduleRouter);

export default router;