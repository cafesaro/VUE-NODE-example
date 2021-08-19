import "@babel/polyfill";
import { SocketServer } from "./modules/sockets/sockets.coordinator";
import { logger } from "./utils/logger";
import app from './app/server';

const server = app.listen(app.get('port'), () => 
    logger.info(`Server on port ${app.get('port')}`)
)
SocketServer(server);