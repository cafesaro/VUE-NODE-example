import { Player } from "@/modules/players/interfaces/players.interface";
import { playersHttpRepository } from "@/modules/players/repositories/players.repository";
import { Module } from "vuex";
import { PLAYERS_EMPTY_STATE } from "./players.state";
import { PlayerstateInterface } from "./interfaces/players.state.interface";
import playersMethods from "./methods/players.methods";

const players: Module<PlayerstateInterface, any> = {
    namespaced: true,
    state: PLAYERS_EMPTY_STATE,
    getters: {
        [playersMethods.getters.GET_PLAYERS](state): Player[] {
            return state.players;
        }
    },
    mutations: {
        [playersMethods.mutations.SET_PLAYERS](state, players: Player[]): void {
            state.players = players;
        }
    },
    actions: {
        async [playersMethods.actions.FETCH_PLAYERS]({ commit }): Promise<boolean> {
            try {
               const players: Player[] = await playersHttpRepository.getPlayers();
               if (players.length) {
                   commit(playersMethods.mutations.SET_PLAYERS, players);
                   return true;
               }
               return false; 
            } catch (e) {
                return false;
            }
        },
        async [playersMethods.actions.SAVE_PLAYERS]({ commit }, club: Player): Promise<boolean> {
            try {
                const response: {status?: string} = await playersHttpRepository.savePlayer(club)
                if (response.status === "Player saved") {
                    return true;
                }
                return false;
            } catch (e) {
                return false;
            }
        }
    },
};

export default players;