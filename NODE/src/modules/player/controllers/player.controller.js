import { logger } from "../../../utils/logger";
import playerService from "../services/player.service";

const playerController = {};
const context = "Player Controller";

playerController.get = async (req, res, next) => {
    try {
        logger.info(`[${context}]: Getting info`);
        const resp = await playerService.getInfo();
        res.status(200).send(resp);
    } catch (error) {
        next(error);
    }
}

export default playerController;