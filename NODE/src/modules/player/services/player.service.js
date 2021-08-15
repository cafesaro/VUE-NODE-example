import { logger } from "../../../utils/logger";
import playerPGRepository from "../repositories/player.pg.repository";

const playerService = {};
const context = "Player Service";

playerService.getInfo = async () => {
    logger.info(`[${context}]: Consulting the data sources`);
    const info = await playerPGRepository.getData();
    return info;
};

export default playerService;