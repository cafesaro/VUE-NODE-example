import { Pool } from 'pg';
import { logger } from '../utils/logger';
import { env } from '../utils/enviroment';

const connectionData = {
    host : 'localhost',
    user : 'postgres',
    port : '5435',
    database : 'BASELOCALFINAL',
    password: '0000'
};

const pool = new Pool(connectionData)

pool.connect()
    .then(response => {
        logger.info('PG-DB is connected')
    })
    .catch(err => {
        logger.error(`PGDB is not connected: ${err}`);
        client.end();
    })

export default pool;