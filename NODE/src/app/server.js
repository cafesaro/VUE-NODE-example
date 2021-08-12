import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { logger } from '../utils/logger.js';
import routerIndex from '../routes/index.routes.js';

// SETTINGS
const app = express();
app.set('port', 3000);

// MIDDLEWARES
app.use(morgan("dev", { "stream": logger.stream }));
app.use(json());
app.use(cors({
    "origin": "*",
    "methods": "GET,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));
app.use(helmet());

// ROUTES
app.get('/', async (req, res) => {
    res.status(200).send("Server running");
});
app.use('/cg', routerIndex);


export default app;