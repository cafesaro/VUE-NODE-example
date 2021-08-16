import { logger } from "../../../utils/logger";
import clubService from "../services/club.service";

const clubController = {};
const context = "Club Controller";

clubController.get = async (req, res, next) => {
    try {
        logger.info(`[${context}]: Getting info`);
        const resp = await clubService.getClubs();
        res.status(200).send(resp);
    } catch (error) {
        next(error);
    }
}

clubController.insertClub = async (req, res, next) => {
    try {
        const name = req.body.name_club;
        const bugdet = req.body.bugdet;
        const coach = req.body.name_coach;
        const country = req.body.name_country;
        logger.info(`[${context}]: Getting club info`);
        await clubService.insertClub(name, bugdet, coach, country);
        res.status(200).send({
            status: "club saved"
        });
    } catch (error) {
        next(error);
    }
}

export default clubController;