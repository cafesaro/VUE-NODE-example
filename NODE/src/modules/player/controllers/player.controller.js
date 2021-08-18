import { logger } from "../../../utils/logger";
import playerService from "../services/player.service";

const playerController = {};
const context = "Player Controller";

playerController.get = async (req, res, next) => {
    try {
        logger.info(`[${context}]: Getting info`);
        const resp = await playerService.getPlayers();
        res.status(200).send(resp);
    } catch (error) {
        next(error);
    }
}

playerController.changePlayer = async (req, res, next) => {
    try {
        logger.info(`[${context}]: Getting info`);
        const idClub = req.params.idClub;
        const idPlayer = req.params.idPlayer;
        const resp = await playerService.changePlayer(idClub, idPlayer);
        res.status(200).send(resp);
    } catch (error) {
        next(error);
    }
}

playerController.deleteTeam = async (req, res, next) => {
    try {
        logger.info(`[${context}]: Getting info`);
        const idPlayer = req.params.idPlayer;
        const resp = await playerService.changePlayer(idPlayer);
        res.status(200).send(resp);
    } catch (error) {
        next(error);
    }
}

playerController.insertPlayer = async (req, res, next) => {
    try {
        const name = req.body.name_player;
        const value = req.body.value;
        const idClub = req.body.idClub;
        const position = req.body.name_position;
        const country = req.body.name_country;
        logger.info(`[${context}]: Getting player info`);
        await playerService.insertPlayer(name, value, idClub, position, country);
        res.status(200).send({
            status: "Player saved"
        });
    } catch (error) {
        next(error);
    }
}

export default playerController;