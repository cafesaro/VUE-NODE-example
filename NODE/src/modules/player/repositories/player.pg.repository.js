import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import PGQuery from "../../../utils/pg.queries";


const playerPGRepository = {};
const context = "Player PG Repository";

playerPGRepository.getPlayers = async () => {
    logger.info(`[${context}]: Obtaning players from pg`);
    await pool.query(PGQuery.setSchema());
    const resp = await pool.query(PGQuery.getPlayers());
    return resp.rows;
}

playerPGRepository.insertPlayer= async (name, value, idClub, position, country) => {
    logger.debug(`[${context}]: Saving club in pg`);
    await pool.query(PGQuery.setSchema());
    await pool.query(PGQuery.insertPlayer(name, value, idClub, position, country));
};

export default playerPGRepository;