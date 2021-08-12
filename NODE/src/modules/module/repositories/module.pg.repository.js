import pool from "../../../db/pg.connection.js";
import { logger } from "../../../utils/logger.js";

const modulePGRepository = {};
const context = "Module PG Repository";

modulePGRepository.getData = async () => {
    logger.info(`[${context}]: Obtaning info from pg`);
    const resp = await pool.query("select * from application");
    return resp.rows;
}

export default modulePGRepository;