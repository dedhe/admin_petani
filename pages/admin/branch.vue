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
                <h1 class="dislpay-1" style="text-align:left; padding:10px; color:white">Branch</h1>
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
                  <v-icon left dark>add</v-icon>Branch
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
              <b>{{ props.item.name }}</b>
            </td>
            <td>
              <b>{{ props.item.email }}</b>
            </td>
            <td>{{ props.item.location }}</td>
            <td>{{ props.item.provinsi.name }}</td>
            <td>{{ props.item.kota.name }}</td>
            <td>{{ props.item.kecamatan.name }}</td>
            <td class="text-xs-left">
              <v-icon small @click="editItem(props.item)">create</v-icon>
              <v-icon small @click="deleteItem(props.item)">delete</v-icon>
            </td>
          </template>
          <template v-slot:no-data></template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <!-- tambah -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Tambah Branch</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="createitem.name" label="Nama Branch"></v-text-field>
                <v-text-field v-model="createitem.email" label="Email"></v-text-field>

                <v-text-field
                  v-model="createitem.password"
                  label="Password"
                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                  :type="show1 ? 'text' : 'password'"
                  hint="At least 8 characters"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
                <v-text-field v-model="createitem.hp" label="No HP"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="prov"
                  item-text="name"
                  items-value="id"
                  return-object
                  label="Pilih Provinsi"
                  v-model="createitem.provinsi"
                  required
                  @change="getKokab(createitem.provinsi.id)"
                ></v-select>
              </v-flex>

              <v-flex xs12>
                <v-select
                  :items="kab"
                  item-text="name"
                  items-value="id"
                  return-object
                  label="Pilih Kabupaten / Kota"
                  v-model="createitem.kota"
                  @change="getKec(createitem.kota.id)"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="kec"
                  item-text="name"
                  items-value="id"
                  return-object
                  label="Pilih Kecamatan"
                  v-model="createitem.kecamatan"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="createitem.location" label="Lokasi"></v-text-field>
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

    <!-- edit -->

    <v-dialog v-model="edit" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Branch</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="editedItem.name" label="Nama Branch"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="prov"
                  item-text="name"
                  items-value="id"
                  return-object
                  label="Pilih Provinsi"
                  v-model="editedItem.provinsi"
                  required
                  @change="getKokab(editedItem.provinsi.id)"
                ></v-select>
              </v-flex>

              <v-flex xs12>
                <v-select
                  :items="kab"
                  item-text="name"
                  items-value="id"
                  return-object
                  label="Pilih Kabupaten / Kota"
                  v-model="editedItem.kota"
                  @change="getKec(editedItem.kota.id)"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="kec"
                  item-text="name"
                  items-value="id"
                  return-object
                  label="Pilih Kecamatan"
                  v-model="editedItem.kecamatan"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="editedItem.location" label="Lokasi"></v-text-field>
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
      user: "getUser",
    }),
  },

  watch: {
    dialog() {
      this.createitem = {
        nama: "",
        username: "",
        password: "",
      };
      this.getWilayah();
    },
    editedItem() {},
  },
  data: () => ({
    dialog: false,
    edit: false,
    users: [],
    show1: false,
    search: "",
    createitem: {},

    defaultItem: {
      nama: "",
      username: "",
      password: "",
    },

    headers: [
      {
        text: "Nama Branch",
        value: "name",
      },
         {
        text: "Email",
        value: "email",
      },
      {
        text: "Lokasi",
        value: "location",
      },
      {
        text: "Provinsi",
        value: "provinsi.name",
      },
      {
        text: "Kab / Kota",
        value: "kota.name",
      },
      {
        text: "Kecamatan",
        value: "kecamatan.name",
      },

      { text: "Actions", value: "", sortable: false },
    ],
    editedItem: {},
    kab: [],
    prov: [],
    kec: [],
  }),

  created() {
    this.init();
  },

  methods: {
    getWilayah() {
      axios.get("/wilayah/provinsi").then((res) => {
        this.prov = res.data;
      });
    },
    getKokab(id) {
      axios.get("/wilayah/provinsi/" + id).then((res) => {
        this.kab = res.data;
        this.kec = [];
      });
    },
    getKec(id) {
      axios.get("/wilayah/kota/" + id).then((res) => {
        this.kec = res.data;
      });
    },

    init() {
      axios
        .get("/admin/branch", {
          headers: {
            Authorization: `bearer ${this.token}`,
          },
        })
        .then((ress) => {
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
        text: " Kamu yakin menghapus  " + item.nama,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus Saja!",
        cancelButtonText: "Tidak , Saya tidak yakin",
      });
      if (swal.value) {
        let r = await axios.delete("/admin/branch/" + item._id, {
          headers: {
            Authorization: `bearer ${this.token}`,
          },
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
      let data = this.createitem;
      let ress = await axios.post("/admin/branch", data, {
        headers: {
          Authorization: `bearer ${this.token}`,
        },
      });
      if (ress.data.success) {
        this.$swal.fire("Bagus!", ress.data.message, "success");
      } else {
        this.$swal.fire("Gagal!", ress.data.message, "error");
      }

      console.log(ress.data);
      this.init();
      this.close();
    },
    editItem(item) {
      this.edit = true;
      this.editedIndex = this.users.indexOf(item);

      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);
      //this.dialog = true;
      this.getWilayah();
      console.log(this.editedItem);
      this.getKokab(this.editedItem.provinsi.id);
      this.getKec(this.editedItem.kota.id);
    },
    async edited() {
      let ress = await axios.put(
        "/admin/branch/" + this.editedItem._id,
        this.editedItem,
        {
          headers: {
            Authorization: `bearer ${this.token}`,
          },
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
    },
  },
};
</script>

<style scoped>
.cc {
  width: 100%;
  padding: 15px !important;
}
</style>