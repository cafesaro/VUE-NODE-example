import { logger } from "../../../utils/logger";
import playerPGRepository from "../repositories/player.pg.repository";

const playerService = {};
const context = "Player Service";

playerService.getPlayers = async () => {
    logger.info(`[${context}]: Consulting the data sources`);
    const info = await playerPGRepository.getPlayers();
    return info;
};

playerService.insertPlayer = async (name, value, idClub, position, country) => {
    logger.debug(`[${context}]: Inserting country in the db`);
    await playerPGRepository.insertPlayer(name, value, idClub, position, country);
};

playerService.changePlayer = async (idClub, idPlayer) => {
    logger.debug(`[${context}]: Inserting country in the db`);
    await playerPGRepository.changePlayer(idClub, idPlayer);
};

playerService.deleteTeam = async (idPlayer) => {
    logger.debug(`[${context}]: Inserting country in the db`);
    await playerPGRepository.deleteTeam(idPlayer);
};

export default playerService;