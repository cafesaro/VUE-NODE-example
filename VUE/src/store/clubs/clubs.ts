import { Club } from "@/modules/clubs/interfaces/clubs.interface";
import { clubsHttpRepository } from "@/modules/clubs/repositories/clubs.repository";
import { Module } from "vuex";
import { CLUBS_EMPTY_STATE } from "./clubs.state";
import { ClubstateInterface } from "./interfaces/clubs.state.interface";
import clubsMethods from "./methods/clubs.methods";

const clubs: Module<ClubstateInterface, any> = {
    namespaced: true,
    state: CLUBS_EMPTY_STATE,
    getters: {
        [clubsMethods.getters.GET_CLUBS](state): Club[] {
            return state.clubs;
        }
    },
    mutations: {
        [clubsMethods.mutations.SET_CLUBS](state, clubs: Club[]): void {
            state.clubs = clubs;
        }
    },
    actions: {
        async [clubsMethods.actions.FETCH_CLUBS]({ commit }): Promise<boolean> {
            try {
               const clubs: Club[] = await clubsHttpRepository.getClubs();
               if (clubs.length) {
                   commit(clubsMethods.mutations.SET_CLUBS, clubs);
                   return true;
               }
               return false; 
            } catch (e) {
                return false;
            }
        },
        async [clubsMethods.actions.SAVE_ClUB]({ commit }, club: Club): Promise<boolean> {
            try {
                const response: {status?: string} = await clubsHttpRepository.saveClub(club)
                if (response.status === "Club saved") {
                    return true;
                }
                return false;
            } catch (e) {
                return false;
            }
        }
    },
};

export default clubs;