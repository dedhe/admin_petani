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
                <h1 class="dislpay-1" style="text-align:left; padding:10px; color:white">youtube</h1>
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
                  <v-icon left dark>add</v-icon>youtube
                </v-btn>
              </v-toolbar>
            </div>
          </div>
        </div>

        <v-data-table
          :search="search"
          :headers="headers"
          :items="youtube"
          class="elevation-1 pt-5 mt-5 white"
        >
          <template v-slot:items="props">
            <td>
              <b>{{ props.item.nama }}</b>
            </td>
        <td>
              <a :href="props.item.link"> <v-chip color="primary" dark>{{props.item.link}}</v-chip></a>  </td>
          
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
          <span class="headline">Tambah youtube</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
             <v-text-field
                 v-model="createitem.nama"
                 label="Nama Youtube"
      
             ></v-text-field>
              </v-flex>
           <v-flex xs12>
             <v-text-field
                 v-model="createitem.link"
                 label="Link Youtube"
      
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
import { mapGetters, mapActions } from "vuex";
export default {
  layout: "admin",
  middleware : 'cekAdmin',
computed : {
     ...mapGetters({
       token : "getToken",
       user : "getUser"
     })
   },
  data: () => ({
    
    dialog: false,
    youtube : [],
   
    
    search: "",
    createitem: {
      nama :'',
      link: ''
    },
    
    headers: [
   
      {
        text: "Judul Video",
        value: "nama"
      },
      {
        text: "Link",
        value: "link"
      },
      
      
     
      { text: "Actions", value: "", sortable: false }
    ],
  
   
  }),

 
 
  
  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios.get("/admin/youtube", {
          headers: {
            Authorization: `bearer ${this.token}`
          }
        }).then(ress => {
        let data = ress.data;
        console.log(data);
        this.youtube = data;
      });
    },
   
  
   

    async deleteItem(items) {
      const index = this.youtube.indexOf(items);
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
        let r = await axios.delete("/admin/youtube/" + item._id, {
          headers: {
            Authorization: `bearer ${this.token}`
          }
        });
        if (r.data.success) {
          this.youtube.splice(index, 1);
          this.$swal.fire("Bagus!", "Data Berhasil Di Hapus!", "success");
        } else {
          this.$swal.fire("Gagal!", r.data.message, "error");
        }
      }
    },

    

    async save() {
      let data = this.createitem
      let ress = await axios.post("/admin/youtube", data, {
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
 
  width: 100%;
  padding: 15px !important;
}

</style>