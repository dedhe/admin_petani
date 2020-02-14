
  <template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <!-- <v-flex xs12 md3 lg3 sm6 class="pr-2 pl-2">
        <v-card style="margin-bottom: 24px; margin-top: 48px;" class="red darken-4" @click="letsgo">
          <div class="red accent-4 ibu" :class="{'animated bounce infinite' : verifikasi}">
          
            <div class="cc elevation-9">
              <v-icon dark class="anak">notification_important</v-icon>
            </div>
          </div>

          <v-card-text class="pa-2">
            <p class="white--text text-xs-right pa-0">Total Item</p>
            <p class="white--text text-xs-right pa-0 display-1">{{dash.tunggu}}</p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn flat color="white" to="/admin/verifikasi">Perlu Verifikasi</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md3 lg3 sm6 class="pr-2 pl-2">
        <v-card style="margin-bottom: 24px; margin-top: 48px;">
          <div class="ibu black">
            
            <div class="cc elevation-9">
              <v-icon dark class="anak">beenhere</v-icon>
            </div>
          </div>

          <v-card-text class="pa-2">
            <p class="grey--text text-xs-right pa-0">Total Item</p>
            <p class="text-xs-right pa-0 display-1">{{dash.verifikasi}}</p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn flat color="black">Berita Terverifikasi</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md3 lg3 sm6 class="pr-2 pl-2">
        <v-card style="margin-bottom: 24px; margin-top: 48px;">
          <div class="ibu black">
         
            <div class="cc elevation-9">
              <v-icon dark class="anak">cancel</v-icon>
            </div>
          </div>

          <v-card-text class="pa-2">
            <p class="grey--text text-xs-right pa-0">Total Item</p>
            <p class="text-xs-right pa-0 display-1">{{dash.tolak}}</p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn flat color="black">Berita Di Tolak</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md3 lg3 sm6 class="pr-2 pl-2">
        <v-card style="margin-bottom: 24px; margin-top: 48px;">
          <div class="ibu black">
            
            <div class="cc elevation-9">
              <v-icon dark class="anak">supervised_user_circle</v-icon>
            </div>
          </div>

          <v-card-text class="pa-2">
            <p class="grey--text text-xs-right pa-0">Total Item</p>
            <p class="text-xs-right pa-0 display-1">{{dash.users}}</p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn flat color="black">Users</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex lg12>
        <v-card class="pa-2">
          <apexchart type="bar" height="350" :options="options" :series="series"/>
        </v-card>
      </v-flex> -->
    </v-layout>
  </v-container>
</template>


<script>
import { mapGetters } from "vuex";
import axios from "~/plugins/axios";
export default {

  middleware: ["cekAdmin",'sta'],
  layout: "admin",
  computed: {
    ...mapGetters({
      token: "getToken",
      options : 'getOptions',
      series : 'getSeries'
    }),
    verifikasi() {
      return this.dash.tunggu > 0;
    }
  },
  data() {
    return {
      ver: false,
      dash: {},
      
    };
  },
  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios
        .get("/admin/dash", {
          headers: {
            Authorization: `bearer ${this.token}`
          }
        })
        .then(ress => {
          this.dash = ress.data;
        });
      // axios
      //   .get("/admin/statistik", {
      //     headers: {
      //       Authorization: `bearer ${this.token}`
      //     }
      //   })
      //   .then(ress => {
      //     let data = ress.data;
      //     this.series = data.series
      //      this.chartOptions.xaxis.categories = ["jan"]
      //     console.log(  this.chartOptions.xaxis);
      //     // this.beritas = data;
      //   });
    },
    letsgo() {
      this.$router.push("/admin/verifikasi");
    }
  }
};
</script>

<style scoped>
.cc {
  max-width: 85px;
  max-height: 85px;
  line-height: 60px;
  padding: 15px !important;
}

.angka {
  position: absolute;
  left: 47px;
  top: 9px;
  color: #f5f5f5;
  font-size: large;
  font-weight: bold;
  text-shadow: 1px 1px 7px #424242;
}
.ibu {
  position: absolute;
  top: -41px;
  /* background: rgb(47, 47, 47); */
  left: 18px;
}
.anak {
  font-size: 36px !important;
  line-height: 56px;
  width: 56px;
  height: 56px;
}
/* .container {
  max-width: 1100px;
 } */
</style>