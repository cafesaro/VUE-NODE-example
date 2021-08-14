import { logger } from "../../../utils/logger";
import clubService from "../services/module.service";

const clubController = {};
const context = "Module Controller";

clubController.get = async (req, res, next) => {
    try {
        logger.info(`[${context}]: Getting info`);
        const resp = await clubService.getInfo();
        res.status(200).send(resp);
    } catch (error) {
        next(error);
    }
}

export default clubController;