import { AxiosRepository } from "@/http/axios.repository";
import { Player } from "../interfaces/players.interface";

const RESOURCE = 'player';

export class PlayerRepository extends AxiosRepository {
    async getPlayers(): Promise<Player[]> { 
        console.log("hola");
        return super.getAll(RESOURCE);
    }

    async savePlayer(player: Player){
        return super.post(player,RESOURCE)
    }


}

export const playersHttpRepository = new PlayerRepository();