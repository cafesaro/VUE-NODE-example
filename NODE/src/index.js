import "@babel/polyfill";
import { logger } from "./utils/logger.js";
import app from './app/server.js';

app.listen(app.get('port'), () => 
    logger.info(`Server on port ${app.get('port')}`)
)