import { AxiosRepository } from "@/http/axios.repository";
import { Club } from "../interfaces/clubs.interface";

const RESOURCE = 'club';

export class ClubsRepository extends AxiosRepository {
    async getClubs(): Promise<Club[]> { 
        return super.getAll(RESOURCE);
    }

    async saveClub(club: Club){
        return super.post(club,RESOURCE)
    }


}

export const clubsHttpRepository = new ClubsRepository();