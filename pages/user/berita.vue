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

                <v-btn color="blue-grey darken-2" dark class="mb-2" @click="dialog = true">
                  <v-icon left dark>add</v-icon>Berita
                </v-btn>
              </v-toolbar>
            </div>
          </div>
        </div>

        <v-data-table
          :search="search"
          :headers="headers"
          :items="beritas"
          class="elevation-1 pt-5 mt-5 white"
          
        >
          <template v-slot:items="props" >
            <tr :class="{ tolak: props.item.tolak }">
              <td >
              <b>{{ moment(props.item.waktu).locale('id').format('LLL') }}</b>
            </td>
           
            <td>
              <b>{{ props.item.judul }}</b>
            </td>

            <td >
              <v-icon small @click="deleteItem(props.item)">delete</v-icon>
              <v-icon small @click="editItem(props.item)">create</v-icon>
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
          <span class="headline">Tambah Berita</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="createitem.judul" label="judul berita" :rules="notNull"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="kategori"
                  item-text="nama"
                  menu-props="auto"
                  item-value="nama"
                  v-model="createitem.kategori"
                  label="kategori"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <vue-editor v-model="createitem.isi"></vue-editor>
              </v-flex>
              <v-flex xs12>
                <label
                  for="file"
                  style="margin:0px"
                  class="v-btn v-btn--outline v-btn--depressed theme--light indigo--text"
                >
                  Pilih Gambar Sampul
                  <v-icon right class="indigo--text">cloud_upload</v-icon>
                </label>
                <input type="file" id="file" @change="getFile">
                <p>{{namafile}}</p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="edit" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Berita</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
               <v-flex xs12>
               <img :src="getUrl + editedItem.foto" alt="" style="width:100%"  v-if="editedItem.foto">
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="editedItem.judul" label="judul berita" :rules="notNull"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="kategori"
                  item-text="nama"
                  menu-props="auto"
                  item-value="nama"
                  v-model="editedItem.kategori"
                  label="kategori"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <vue-editor v-model="editedItem.isi"></vue-editor>
              </v-flex>
              <v-flex xs12>
                <label
                  for="file"
                  style="margin:0px"
                  class="v-btn v-btn--outline v-btn--depressed theme--light indigo--text"
                >
                  Pilih Gambar Sampul
                  <v-icon right class="indigo--text">cloud_upload</v-icon>
                </label>
                <input type="file" id="file" @change="getFile">
                <p>{{namafile}}</p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="edited">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import axios from "~/plugins/axios";
import moment from "moment"
import {mapGetters} from 'vuex'

export default {
  layout: "user",
  middleware : 'cekUser',
  computed : {
    ...mapGetters({
        getUrl : 'getUrl',
        token : 'getToken'
    }) 
    
    
  },
  data: () => ({
    notNull: [v => !!v || "ini harus di isi"],
    edit: false,
    moment : moment,
    tolak : true,

    dialog: false,
    namafile: "",
    kategori: [],
    beritas: [],
editedIndex : -1 ,
    search: "",
    createitem: {
      judul: "",
      file: "",
      isi: "",
      kategori: ""
    },
    editedItem: {
      judul: "",
      file: "",
      isi: "",
      kategori: ""
    },

    headers: [
      {
        text: "waktu",
        value: "waktu"
      },
      {
        text: "judul",
        value: "judul"
      },

      { text: "Actions", value: "", sortable: false }
    ]
  }),

  watch: {
    dialog() {}
  },
  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      
      var token = this.token
      console.log(token)
      axios.get("/user/kategori",{
            headers: {
                Authorization: `bearer ${this.token}`
            }

        }).then(ress => {
        this.kategori = ress.data;
      });
      axios.get("/user/berita",{
            headers: {
                Authorization: `bearer ${this.token}`
            }

        }).then(ress => {
        let data = ress.data;
        console.log(data);
        this.beritas = data;
      });
    },
    
    editItem(item) {
      this.edit = true;
      this.editedIndex = this.beritas.indexOf(item);

      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);
      //this.dialog = true;
    },

    async deleteItem(items) {
      const index = this.beritas.indexOf(items);
      let item = Object.assign({}, items);
      console.log(item);
      let swal = await this.$swal.fire({
        title: "Serius?",
        text: " Kamu tega menghapus  " + item.judul,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus Saja!",
        cancelButtonText: "Tidak , Saya tidak tega"
      });
      if (swal.value) {
        let r = await axios.delete("/user/berita/" + item._id,{
            headers: {
                Authorization: `bearer ${this.token}`
            }

        });
        if (r.data.success) {
          this.beritas.splice(index, 1);
          this.$swal.fire("Bagus!", "Data Berhasil Di Hapus!", "success");
        } else {
          this.$swal.fire("Gagal!", r.data.message, "error");
        }
      }
    },

    close() {
      this.dialog = false;
      this.edit = false;
         this.createitem.file = '';
        this.editedItem.file = '';
        this.namafile = '';
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      const fd = new FormData();

      let data = {
        judul: this.createitem.judul,
        kategori: this.createitem.kategori,
        isi: this.createitem.isi
      };
      fd.append("myfile", this.createitem.file);
      for (var key in data) {
        fd.append(key, data[key]);
      }
      let ress = await axios.post("/user/berita", fd,{
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
    getFile(e) {
      if (e.target.files[0]) {
        this.createitem.file = e.target.files[0];
        this.editedItem.file = e.target.files[0];
        this.namafile = e.target.files[0].name;
        console.log(this.createitem.file);
      }
      // else {
      //   this.createitem.file = ''
      //   this.editedItem.file = ''
      //   this.namafile = ''
      // }
    },
   async edited() {
       const fd = new FormData();

      let data = {
        judul: this.editedItem.judul,
        kategori: this.editedItem.kategori,
        isi: this.editedItem.isi
      };
      fd.append("myfile", this.editedItem.file);
      for (var key in data) {
        fd.append(key, data[key]);
      }
      let ress = await axios.put("/user/berita/"+this.editedItem._id, fd,{
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
   
  }
};
</script>

<style  >
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
.tolak {
    color: white;
    background: red;

}
</style>