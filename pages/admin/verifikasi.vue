<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex md12 class>
        <div style="position:relative; width:100%; text-align:center ;">
          <div
            class="blue-grey darken-1"
            style="    position: absolute;
  
   
    max-width:90%;
    margin: 0 auto;
    border-radius:20px;
    

left: 0;
right: 0;
top: -20px"
          >
            <!-- <span class="angka">12</span> -->
            <div class="cc elevation-9" style="border-radius:20px;">
              <v-toolbar class="blue-grey darken-3">
                <h1 class="dislpay-1" style="text-align:left; padding:10px; color:white">Berita</h1>
                <v-spacer></v-spacer>
                <v-toolbar-title>
                  <v-text-field
                    solo
                    label="Pencarian"
                    prepend-inner-icon="search"
                    class="mt-2"
                    v-model="search"
                  ></v-text-field>
                </v-toolbar-title>
              </v-toolbar>
            </div>
          </div>
        </div>

        <v-data-table
          :search="search"
          :headers="headers"
          :items="berita"
          class="elevation-1 pt-5 mt-5 white"
        >
          <template v-slot:items="props">
            <tr @click="buka(props.item)">
              <td>
                <b>{{ moment(props.item.waktu).locale('id').format('LLL') }}</b>
              </td>
              <td class="text-xs-left">
                <b>{{ props.item.user.username }}</b>
              </td>
              <td>
                <b>{{ props.item.judul }}</b>
              </td>
            </tr>
          </template>
          <template v-slot:no-data></template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Lihat Berita</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                  <v-chip  color="teal" dark>Kategori : {{lihat.kategori}}</v-chip>
                  <v-chip  color="teal" dark>waktu : {{ moment(lihat.waktu).locale('id').format('LLL')}}</v-chip>
                 <h1>{{lihat.judul}}</h1>
                 
                 <img :src="`${url}${lihat.foto}`" alt="" style="width:100%">
                 <div v-html="lihat.isi" class="baca"></div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn color="white darken-1" flat @click="verifikasi(lihat)" class="green">Verifikasi</v-btn>
            <v-btn color="white darken-1" flat @click="tolak(lihat)" class="red">Tolak</v-btn>
          <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
        
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "~/plugins/axios";
import moment from "moment";

import { mapGetters } from "vuex";
export default {
  layout: "admin",
  middleware: "cekAdmin",
  computed: {
    ...mapGetters({
      token: "getToken",
      url: "getUrl"
    })
  },
  created() {
    this.initialize();
  },
  data() {
    return {
      berita: [],
      moment: moment,
      dialog : false,
      search : '',
      headers: [
        {
          text: "waktu",
          value: "waktu"
        },
        {
          text: "user",
          value: "user"
        },
        {
          text: "judul",
          value: "judul"
        }
      ],
      lihat : {

      }
    };
  },
  methods: {
    initialize() {
      axios
        .get("/admin/verifikasi", {
          headers: {
            Authorization: `bearer ${this.token}`
          }
        })
        .then(ress => {
          this.berita = ress.data;
        });
    },
    buka(items){
          //const index = this.berita.indexOf(items);
          this.lihat = Object.assign({}, items);
          this.dialog = true
          console.log(this.lihat)
    },
    close (){
        this.dialog = false
    },
    verifikasi(items) {
        const index = this.berita.indexOf(items);
        let item = Object.assign({}, items)
        axios.put('/admin/verifikasi/'+item._id,{},  {
          headers: {
            Authorization: `bearer ${this.token}`
          }}).then((ress) => {
            let data = ress.data
            if (data.success) {
          this.berita.splice(index, 1);
          this.$swal.fire("Bagus!",data.message, "success");
        } else {
          this.$swal.fire("Gagal!", data.message, "error");
        }
            this.dialog = false
        })
        .catch((err) => {
            console.log(err)
            this.dialog = false
        })
        
    },
    tolak(items) {
        const index = this.berita.indexOf(items);
        let item = Object.assign({}, items)
        axios.put('/admin/tolak/'+item._id, {},  {
          headers: {
            Authorization: `bearer ${this.token}`
          }}).then((ress) => {
            let data = ress.data
            if (data.success) {
          this.berita.splice(index, 1);
          this.$swal.fire("Bagus!",data.message, "success");
        } else {
          this.$swal.fire("Gagal!", data.message, "error");
        }
            this.dialog = false
        })
        .catch((err) => {
            console.log(err)
            this.dialog = false
        })
    }
  }
};
</script>

<style lang="css" scoped>
    img{
        width: 100% !important;
    }
</style>
