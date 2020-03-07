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
           
            <div class="cc elevation-9" style="border-radius:20px;">
              <v-toolbar style="background : rgb(24, 39, 36)">
                <h1 class="dislpay-1" style="text-align:left; padding:10px; color:white">Cluster</h1>
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
                  <v-icon left dark>add</v-icon>Cluster
                </v-btn>
              </v-toolbar>
            </div>
          </div>
        </div>
     
        <v-data-table
          :search="search"
          :headers="headers"
          :items="users"
          class="elevation-1 pt-5 mt-5 white"
        >
          <template v-slot:items="props">
             <td>
              <img :src="`${url}${props.item.img}`" alt=""> 
            </td>
             <td>
              <b>{{ props.item.clusterName }}</b>
            </td>
            <td>
              <b>{{ props.item.price }} $</b>
            </td>
            <td>{{ props.item.description }}</td>

            <td class="text-xs-left">
              <v-icon small @click="editItem(props.item)">create</v-icon>
              <v-icon small @click="deleteItem(props.item)">delete</v-icon>
            </td>
          </template>
          <template v-slot:no-data>
            <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Tambah Cluster</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="createitem.nama" label="Nama Cluster"></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field v-model="createitem.price" label="Harga dalam $" type="number"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  name="name"
                  label="Deskripsi"
                  id="id"
                  v-model="createitem.isi"
                  type="area"
                ></v-textarea>
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
                <input type="file" id="file" @change="getFile" />
                <p>{{namafile}}</p>
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
    <v-dialog v-model="edit" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Cluster</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-text-field v-model="editedItem.clusterName" label="Nama Cluster"></v-text-field>
              <v-flex xs12>
                <!-- <vue-editor v-model="editedItem.isi"></vue-editor> -->
                <v-textarea
                  name="name"
                  label="deskripsi"
                  id="id"
                  v-model="editedItem.description"
                  type="area"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="edit = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="edited">Save</v-btn>
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
  middleware: "cekAdmin",
  computed: {
    ...mapGetters({
      token: "getToken",
      user: "getUser"
    })
  },

  watch: {
    dialog() {
      this.createitem = {
        nama: "",
        username: "",
        password: ""
      };
    }
  },
  data: () => ({
    url : 'http://localhost:9080/files/',
    dialog: false,
    edit: false,
    users: [],

    search: "",
    createitem: {},

    defaultItem: {},

    headers: [
      {
        text : "",
        value : ""
      },
      {
        text: "Nama Cluster",
        value: "clusterName"
      },
      {
        text : "Harga",
        value: "price"
      },
      {
        text: "Deskripsi",
        value: "description"
      },

      { text: "Actions", value: "", sortable: false }
    ],
    editedItem: {},

    namafile: null
  }),

  created() {
    this.init();
  },

  methods: {
    getFile(e) {
      if (e.target.files[0]) {
        this.createitem.file = e.target.files[0];
        this.editedItem.file = e.target.files[0];
        this.namafile = e.target.files[0].name;
        console.log(this.createitem.file);
      }
    },

    init() {
      axios
        .get("/admin/cluster", {
          headers: {
            Authorization: `bearer ${this.token}`
          }
        })
        .then(ress => {
          let data = ress.data;
          console.log(data);
          this.users = data;
        });
    },
    editItem(item) {
      this.edit = true;
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);
    },

    async deleteItem(items) {
      const index = this.users.indexOf(items);
      let item = Object.assign({}, items);
      console.log(item);
      let swal = await this.$swal.fire({
        title: "Serius?",
        text: " Kamu yakin menghapus  " + item.clusterName,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus Saja!",
        cancelButtonText: "Tidak , Saya tidak yakin"
      });
      if (swal.value) {
        let r = await axios.delete("/admin/cluster/" + item._id, {
          headers: {
            Authorization: `bearer ${this.token}`
          }
        });
        if (r.data.success) {
          this.users.splice(index, 1);
          this.$swal.fire("Bagus!", "Data Berhasil Di Hapus!", "success");
        } else {
          this.$swal.fire("Gagal!", r.data.message, "error");
        }
      }
    },

    close() {
      this.dialog = false;

      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      const fd = new FormData();

      let data = {
        clusterName: this.createitem.nama,
        price: this.createitem.price,
        description: this.createitem.isi
      };
      fd.append("myFile", this.createitem.file);
      for (var key in data) {
        fd.append(key, data[key]);
      }
      let ress = await axios.post("/admin/cluster", fd, {
        headers: {
          Authorization: `bearer ${this.token}`
        }
      });
      if (ress.data.success) {
        this.$swal.fire("Bagus!", ress.data.message, "success");
      } else {
        this.$swal.fire("Gagal!", ress.data.message, "error");
      }

      //   console.log(ress.data);
      this.init();
      this.close();
    },

    editItem(item) {
      this.edit = true;
      this.editedIndex = this.users.indexOf(item);

      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);
      //this.dialog = true;
    },
    async edited() {
      let ress = await axios.put(
        "/admin/cluster/" + this.editedItem._id,
        this.editedItem,
        {
          headers: {
            Authorization: `bearer ${this.token}`
          }
        }
      );
      if (ress.data.success) {
        this.$swal.fire("Bagus!", ress.data.message, "success");
      } else {
        this.$swal.fire("Gagal!", ress.data.message, "error");
      }

      console.log(ress.data);
      this.init();
      this.edit = false;
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