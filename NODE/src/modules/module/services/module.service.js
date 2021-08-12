import { logger } from "../../../utils/logger.js";
import modulePGRepository from "../repositories/module.pg.repository.js";

const moduleService = {};
const context = "Module Service";

moduleService.getInfo = async () => {
    logger.info(`[${context}]: Consulting the data sources`);
    const info = await modulePGRepository.getData();
    console.log("AQUI ESTOY");
    return info;
};

export default moduleService;