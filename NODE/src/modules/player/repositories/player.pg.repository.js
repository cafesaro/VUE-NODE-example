import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";

const playerPGRepository = {};
const context = "Player PG Repository";

playerPGRepository.getData = async () => {
    logger.info(`[${context}]: Obtaning info from pg`);
    const resp = await pool.query("select * from fut_tut.v_lnk_player_info");
    return resp.rows;
}

export default playerPGRepository;