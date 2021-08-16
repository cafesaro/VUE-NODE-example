import { logger } from "../../../utils/logger";
import clubPGRepository from "../repositories/club.pg.repository";

const clubService = {};
const context = "Module Service";

clubService.getClubs = async () => {
    logger.info(`[${context}]: Consulting the data sources`);
    const info = await clubPGRepository.getClubs();
    return info;
};

clubService.insertClub = async (name, bugdet, coach, country) => {
    logger.debug(`[${context}]: Inserting country in the db`);
    await clubPGRepository.insertClub(name, bugdet, coach, country);
};

export default clubService;