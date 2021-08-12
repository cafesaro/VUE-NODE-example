import { logger } from "../../../utils/logger.js";
import moduleService from "../services/module.service.js";

const moduleController = {};
const context = "Module Controller";

moduleController.get = async (req, res, next) => {
    try {
        logger.info(`[${context}]: Getting info`);
        const resp = await moduleService.getInfo();
        res.status(200).send(resp);
    } catch (error) {
        next(error);
    }
}

export default moduleController;