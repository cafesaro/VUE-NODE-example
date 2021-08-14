import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";

const clubPGRepository = {};
const context = "Module PG Repository";

clubPGRepository.getData = async () => {
    logger.info(`[${context}]: Obtaning info from pg`);
    const resp = await pool.query("select * from fut_tut.v_lnk_club_info");
    return resp.rows;
}

export default clubPGRepository;