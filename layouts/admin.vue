<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute overflow app dark class="anjay">
      <v-list class="pa-3" style="height:100% ; background: url(/b.png) rgb(24, 39, 36);
    background-size: 100% 50%;
    background-repeat: no-repeat;
    background-position: bottom;
">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-avatar :tile="false" :size="40" color="teal" class="elevation-3">
              <img src="/logo.png" alt="avatar">
            </v-avatar>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title class="nvbf">Admin</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider class="white mt-2 mb-2"></v-divider>
        <template v-for="item in items">
          <v-list-group
            no-action
            value="true"
            v-if="item.sub"
            v-model="item.model"
            :key="item.title"
            :prepend-icon="item.icon"
            active-class="gb"
            class="mt-2 pa-1 mb-3 nvbt"
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
              v-for="(child, i) in item.sub"
              :key="i"
              :to="child.path"
              active-class="highlighted"
              :class="child.path === $route.path ? 'highlighted' : ''"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ child.title}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile
            v-else
            class="mt-2 pa-1 mb-3 nvbt"
            :key="item.title"
            :to="item.path"
            active-class="highlightede"
            :class="item.path === $route.path ? 'highlighted' : ''"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="nvbf">{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content class="white muncul">
      <v-toolbar class="white" flat light>
        <v-toolbar-side-icon class="" @click.stop="drawer = !drawer" light></v-toolbar-side-icon>

       
        
      </v-toolbar>

      <nuxt/>
    </v-content>
    <v-footer inset app class="muncul">
      <span class="px-3">&copy; isoft 2017 - {{ new Date().getFullYear() }}</span>
    </v-footer>
    <!-- <notifications position="top right"></notifications> -->
  </v-app>
</template>

<script>

export default {
    
  data: () => ({
    items: [
      { title: "Dashboard", icon: "dashboard", path: "/admin" },
      { title: "Cluster", icon: "sort", path: "/admin/cluster" },
      { title: "Branch", icon: "timeline", path: "/admin/branch" },
      { title: "Member", icon: "account_box", path: "/admin/member" },
      // { title: "Layanan", icon: "call", path: "/admin/layanan" },
      // { title: "Youtube", icon: "subscriptions", path: "/admin/youtube" },
      // { title: "Laporan", icon: "feedback", path: "/admin/laporan" },
      { title: "Setting", icon: "build", path: "/admin/setting" },
   
      { title: "Logout", icon: "exit_to_app", path: "/logout" }
    ],
    drawer: null
  }),
  methods: {},
  computed: {},
 
};
</script>
<style>
.nvbt {
  transition-duration: 5s;
  transition-delay: 2s;
}
.nvbt:hover {
  border: 1px solid rgba(255, 255, 255, 0.7);
  /* box-shadow: 3px 6px 10px 0px #2647a6b3; */
  border-radius: 12px;
  cursor: pointer;
  /* transition-duration: 1s; */
}
.nvbf {
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
}
.highlighted {
  border: 1px solid rgba(255, 255, 255, 0.7);
}
.trial-enter-active,
.trial-leave-active {
  transition: opacity 1s ease-in-out;
}
.trial-enter, .trial-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes ucul {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.anjay {
  /* This section calls the slideInFromLeft animation we defined above */
  animation: 1s ease-out 0s 1 slideInFromLeft;

  /* background: #333; */
}
.muncul {
  /* This section calls the slideInFromLeft animation we defined above */
  animation: 2s ease-out 0s 1 ucul;
}
</style>
