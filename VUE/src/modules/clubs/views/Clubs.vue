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
          <b-table :filter="filter" :per-page="itemsPerPage" :current-page="currentPage" striped hover sortable :items="clubs" :fields="clubFields" bordered :busy="isLoading">
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
import {clubs} from '../../../store/namespaces';
import clubMethods from '../../../store/clubs/methods/clubs.methods';
import {Club} from '../interfaces/clubs.interface';
import { Socket } from 'vue-socket.io-extended'

@Component({})
export default class Clubs extends Vue {
    addClubModal : boolean = false;
    isLoading : boolean = true;
    clubFields: Array<any> = []
    currentPage: number = 1;
    itemsPerPage: number = 5;
    totalRows: number = 0;
    filter = null;

    @Socket()
      connect(){
    }

    mounted(){
      this.clubAdded();        
    }

    listenerInsert(club : Club) {
        this.clubs.push(club);
    }

    created(){ 
      this.$socket.client.on('club_insert',this.listenerInsert)

    }

    async clubAdded(){
      this.isLoading = true;
      if (await this.fetchClubs()){
          this.clubFields = Object.keys(this.clubs[0]);
          this.clubFields.push('actions');
          this.isLoading = false;
          this.totalRows = this.clubs.length;
      }else{
      //     Vue.$toast.open({
      //         message: 'Ha ocurrido un error consultando las plantas',
      //         type: 'error',
      // });
      }
    }

    @clubs.Action(clubMethods.actions.FETCH_CLUBS)
    fetchClubs!: () => Promise<boolean>;

    @clubs.Getter(clubMethods.getters.GET_CLUBS)
    clubs!: Club[];
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