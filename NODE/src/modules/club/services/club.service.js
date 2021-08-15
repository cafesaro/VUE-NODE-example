import { logger } from "../../../utils/logger";
import clubPGRepository from "../repositories/club.pg.repository";

const clubService = {};
const context = "Module Service";

clubService.getClubs = async () => {
    logger.info(`[${context}]: Consulting the data sources`);
    const info = await clubPGRepository.getClubs();
    return info;
};

export default clubService;