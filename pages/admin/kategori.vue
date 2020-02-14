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
                <h1 class="dislpay-1" style="text-align:left; padding:10px; color:white">Kategori</h1>
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

                <v-btn color="blue-grey darken-2" dark class="mb-2" @click="dialog = true">
                  <v-icon left dark>add</v-icon>Kategori
                </v-btn>
              </v-toolbar>
            </div>
          </div>
        </div>

        <v-data-table
          :search="search"
          :headers="headers"
          :items="kategori"
          class="elevation-1 pt-5 mt-5 white"
        >
          <template v-slot:items="props">
            <td>
              <b>{{ props.item.nama }}</b>
            </td>
       
          
            <td class="text-xs-left">
            
              <v-icon small @click="deleteItem(props.item)">delete</v-icon>
            </td>
          </template>
          <template v-slot:no-data>
         
          </template>
        </v-data-table> 
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" persistent max-width="600px">
    
      <v-card>
        <v-card-title>
          <span class="headline">Tambah Kategori</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
             <v-text-field
                 v-model="createitem.nama"
                 label="kategori"
      
             ></v-text-field>
              </v-flex>
         
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
  </v-container>
</template>
<script>
import axios from "~/plugins/axios";
import {mapGetters} from 'vuex'

export default {
  layout: "admin",
  middleware : 'cekAdmin',
computed: {
    ...mapGetters({
      token: "getToken",
      options : 'getOptions',
      series : 'getSeries'
    }),
},
  data: () => ({
    
    dialog: false,
    kategori : [],
    beritas : [],
    
    search: "",
    createitem: {
      nama :''
    },
    
    headers: [
   
      {
        text: "kategori",
        value: "nama"
      },
      
     
      { text: "Actions", value: "", sortable: false }
    ],
  
   
  }),

 
 
  
  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios.get("/admin/kategori",{
            headers: {
                Authorization: `bearer ${this.token}`
            }

        }).then(ress => {
        let data = ress.data;
        console.log(data);
        this.kategori = data;
      });
    },
   
    cekPns() {},
    editItem(item) {
      this.edit = true;
      this.editedIndex = this.users.indexOf(item);

      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);
      //this.dialog = true;
    },

    async deleteItem(items) {
      const index = this.kategori.indexOf(items);
      let item = Object.assign({}, items);
      console.log(item);
      let swal = await this.$swal.fire({
        title: "Serius?",
        text: " Kamu tega menghapus  " + item.nama,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus Saja!",
        cancelButtonText: "Tidak , Saya tidak tega"
      });
      if (swal.value) {
        let r = await axios.delete("/admin/kategori/" + item._id,{
            headers: {
                Authorization: `bearer ${this.token}`
            }

        });
        if (r.data.success) {
          this.kategori.splice(index, 1);
          this.$swal.fire("Bagus!", "Data Berhasil Di Hapus!", "success");
        } else {
          this.$swal.fire("Gagal!", r.data.message, "error");
        }
      }
    },

    

    async save() {
      let data = this.createitem
      let ress = await axios.post("/admin/kategori", data,{
            headers: {
                Authorization: `bearer ${this.token}`
            }

        });
      if (ress.data.success) {
        this.$swal.fire("Bagus!", ress.data.message, "success");
      } else {
        this.$swal.fire("Gagal!", ress.data.message, "error");
      }

      console.log(ress.data);
      this.initialize();
      this.close();
    },



    close() {
      this.dialog = false;
    
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    }
  }
};
</script>

<style scoped>
.cc {
  /* max-width: 85px;
  max-height: 85px; */
  width: 100%;
  /* line-height: 60px; */
  padding: 15px !important;
}
#file {
    display: none;
}
</style>