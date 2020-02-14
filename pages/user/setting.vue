<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <div style="position:relative; width:100%; text-align:center ; z-index: 2;">
          <div
            style="    position: absolute;
  
    background: rgb(47, 47, 47);
    max-width:90%;
    margin: 0 auto;
    border-radius:20px;
    

left: 0;
right: 0;
top: -20px"
          >
            <!-- <span class="angka">12</span> -->
            <div class="cc elevation-9" style="border-radius:20px;">
              <h1
                class="dislpay-1"
                style="text-align:left; padding:10px; color:white"
              >Setting Password</h1>
            </div>
          </div>
        </div>
        <v-card class="pa-5 pt-5 mt-5">
          <v-form v-model="valid">
            <v-text-field
              v-model="plama"
              :rules="rpl"
              label="password lama"
              type="password"
           
            ></v-text-field>
            <v-text-field
              v-model="pbaru"
              :rules="rpb"
              type="password"
              label="password baru"
             
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark @click="login" :disabled="!valid">Submit</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "~/plugins/axios";
import { mapGetters, mapActions } from "vuex";
export default {
   middleware :'cekUser',
   computed : {
     ...mapGetters({
       token : "getToken",
       user : "getUser"
     })
   },
  layout: "user",
  data: () => {
    return {
      valid : false,
      plama: "",
      pbaru: "",
      rpl: [
        v => !!v || "tidak boleh kosong",
        v => v.length >= 5 || "password min 5 char"
      ],
      rpb: [
        v => !!v || "tidak boleh kosong",
        v => v.length >= 5 || "password min 5 char"
      ]
    };
  },
  methods: {
    async login() {
      try {
         var data = {
        password: this.plama,
        newpassword: this.pbaru
      };
      var ress = await axios.put(
        "/user/password/"+this.user.username,
        { data },
        {
          headers: {
            Authorization: `bearer ${this.token}`
          }
        }
      )
      if(ress.data.success){
          this.$swal.fire("yea!", ress.data.message, "success");
          //window.location.href = '/admin/logout';
      }
      else{
          this.$swal.fire("Waduh!", ress.data.message, "error");
      }
      } catch (error) {
        console.log(error)
      }
     
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
</style>