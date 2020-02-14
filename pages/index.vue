<template>
  <v-app class="red darken-2">
    <v-content style="background-image : url(/background.jpg)">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 style="justify-content: center;
    display: flex;" >
            <v-card class="lf">
              <div class="text-align:center ; width:100%">
                <img
                  src="/logo.png"
                  alt
                  style="display: block;
                          margin-left: auto;
                          margin-right: auto;
                          width: 50%; "
                >
              </div>
              <v-form @keyup.native.enter="login">
              <v-card-text>
                <h1 style="text-align: center; margin-bottom : 10px ; color :rgb(27, 42, 39);">Selamat Datang Di Panel Admin</h1>
                <h4 style="text-align: center; margin-bottom : 50px">Silahkan Masuk</h4>
                
                  <v-text-field label="username" type="text" outline clearable v-model="username"></v-text-field>
                  <v-text-field
                    id="password"
                    label="Password"
                    type="password"
                    outline
                    clearable
                    v-model="password"
                  ></v-text-field>
                
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark class="green darken-2" @click="login">Login</v-btn>
              </v-card-actions> 
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-snackbar v-model="snackbar" color="black" top>
      {{ msg }}
      <v-btn color="red" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>
<style>
.lf {
  padding: 20px;
    border-radius: 20px;
    box-shadow:  rgb(27, 42, 39) 2px -1px 9px 4px;
    width: 420px;
    background: #fffffff0 !important;
}
</style>
<script>
import axios from "~/plugins/axios";
import { mapGetters, mapActions } from "vuex";

export default {
  
  data: () => {
    return {
      username: "",
      password: "",
      snackbar: false,
      timeout: 6000,
      msg: ""
    };
  },
  methods: {
    ...mapActions({
      setToken : 'setToken',
      setUser : 'setUser'
          }),
    login() {
      var data = {
        username: this.username,
        password: this.password
      };
      axios
        .post("/login", data)
        .then(ress => {
          if (ress.data.success) {
            localStorage.setItem("token", ress.data.data.token)
            // Cookies.set('token', ress.data.data.token);
            
            this.setToken(ress.data.data.token)
            this.setUser(ress.data.data.user)
            if(ress.data.data.user.level == 'admin'){
             this.$router.push("/admin")
            }
          
          
            
          } else {
            (this.snackbar = true), (this.msg = ress.data.message)
          }
        })
        .catch(err =>{
           (this.snackbar = true), (this.msg = 'something error')
        })
    }
  }
};
</script>
