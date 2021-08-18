import socketIO from 'socket.io';
import { logger } from "../../utils/logger";

let socketServer = null;
const context = "Socket Coordinator"

export async function SocketServer(server) {
    const io = socketIO(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    socketServer = io;
    
    io.on("connection", (socket) => {
        logger.info(`[${context}] New connection stablished`);
    });

};

export function notifyChanges(event, data) {
    try {
        logger.info(`[${context}] Sending update notification`);
        socketServer.sockets.emit(event, data);
    } catch (error) {
        logger.error(`[${context}] Sending update notification`);
    }
}