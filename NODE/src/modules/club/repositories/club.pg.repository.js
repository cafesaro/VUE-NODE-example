import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import PGQuery from "../../../utils/pg.queries";

const clubPGRepository = {};
const context = "Club PG Repository";

clubPGRepository.getClubs = async () => {
    logger.info(`[${context}]: Obtaning clubs from pg`);
    await pool.query(PGQuery.setSchema());
    const resp = await pool.query(PGQuery.getClubs());
    return resp.rows;
}

clubPGRepository.insertClub= async (name, bugdet, coach, country) => {
    logger.debug(`[${context}]: Saving club in pg`);
    await pool.query(PGQuery.setSchema());
    await pool.query(PGQuery.insertClub(name, bugdet, coach, country));
};


export default clubPGRepository;