import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import PGQuery from "../../../utils/pg.queries";

const clubPGRepository = {};
const context = "Club PG Repository";

clubPGRepository.getClubs = async () => {
    logger.info(`[${context}]: Obtaning clubs from pg`);
    await pool.query(PGQuery.setSchema());
    const resp = await pool.query(PGQuery.getPlants());
    return resp.rows;
}

export default clubPGRepository;