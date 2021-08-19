<template>
    <b-container>
      <b-row class="mt-5">
        <b-col sm="12" md="6" >
            <b-form-group
                label-for="filter-input"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    placeholder="Type to Filter"
                  ></b-form-input>

                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                  </b-input-group-append>
                </b-input-group>
            </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mt-3">
          <b-table :filter="filter" :per-page="itemsPerPage" :current-page="currentPage" striped hover sortable :items="players" :fields="playersFields" bordered :busy="isLoading">
            <template #cell()="row" style="width: 7rem;">
                {{row.value}}
            </template>
            <template #cell(actions)="data">
                <b-button size="sm" variant="outline-danger" class="mx-1">
                  <b-icon icon="trash" aria-label="Help"></b-icon>
                </b-button>
                {{data.value}}
                <b-button size="sm" variant="outline-primary" class="mx-1">
                  <b-icon icon="pencil" aria-label="Help"></b-icon>
                </b-button>
            </template> 
            <template #table-busy>
              <div class="text-center text-danger my-5">
                <b-spinner class="align-middle"></b-spinner>
              </div>
            </template>       
        </b-table>
      </b-row>
      <b-row>
          <b-col sm="7" md="4" class="my-1 mx-auto">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="itemsPerPage"
              align="fill"
              size="sm"
              class="my-0"
            ></b-pagination>
          </b-col>
      </b-row>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {players} from '../../../store/namespaces';
import playersMethods from '../../../store/players/methods/players.methods';
import {Player} from '../interfaces/players.interface';

@Component({})
export default class Players extends Vue {
    addClubModal : boolean = false;
    isLoading : boolean = true;
    playersFields: Array<any> = []
    currentPage: number = 1;
    itemsPerPage: number = 5;
    totalRows: number = 0;
    filter = null;

    mounted(){
      this.playerAdded();        
    }

    async playerAdded(){
      this.isLoading = true;
      if (await this.fetchPlayers()){
          this.playersFields = Object.keys(this.players[0]);
          this.playersFields.push('actions');
          this.isLoading = false;
          this.totalRows = this.players.length;
      }else{
      //     Vue.$toast.open({
      //         message: 'Ha ocurrido un error consultando las plantas',
      //         type: 'error',
      // });
      }
    }

    @players.Action(playersMethods.actions.FETCH_PLAYERS)
    fetchPlayers!: () => Promise<boolean>;

    @players.Getter(playersMethods.getters.GET_PLAYERS)
    players!: Player[];
}
</script>

<style scoped>
.home{
  height: 100vh;
}
.table{
  font-size: 13px;
  background-color:  #fff;
}
</style>