<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <v-list>
        <v-list-item v-for="item in items" :key="item.text" link :to="item.link">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-spacer></v-spacer>
      <v-btn rounded @click="themeModify">
        <v-icon>{{ this.$vuetify.theme.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>Dark / Light
      </v-btn>
    </v-navigation-drawer>
    <v-app-bar color="primary" dense fixed clipped-left app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-icon class="mx-3">mdi-compass</v-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">MySite</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="$auth.loggedIn">
        {{ $auth.user.mail }}
        <v-btn>Logout</v-btn>
      </div>
      <div v-else>
        <v-btn key="login" text rounded to="/login">Login</v-btn>
        <v-btn key="register" text rounded to="/signup">Register</v-btn>
      </div>
    </v-app-bar>
    <v-content>
      <Nuxt/>
    </v-content>
    <v-footer color="primary lighten-1" padless>
      <v-layout justify-center wrap>
        <v-btn
          v-for="item in items"
          :key="item.text + 'footer-link'"
          color="white"
          text
          rounded
          class="my-2"
          :to="item.link"
        >{{ item.text }}</v-btn>
        <v-flex primary lighten-2 py-4 text-center white--text xs12>
          {{ new Date().getFullYear() }} —
          <strong>Vuetify Dashboard</strong>
        </v-flex>
      </v-layout>
    </v-footer>
    <TheSnackbar/>
  </v-app>
</template>

<style scoped>
</style>

<script>
import TheSnackbar from "@/components/TheSnackbar.vue";

export default {
  head: {
    titleTemplate: "%s - My Site", // <-- title template
    meta: [
      {
        hid: "description",
        name: "description", // <-- moved this over from index.vue
        content:
          "Where you can find all the events taking place in your neighborhood"
      }
    ]
  },
  components: {
    TheSnackbar
  },
  data() {
    return {
      drawer: false,
      items: [
        { icon: "mdi-home", text: "Home", link: "/" },
        { icon: "mdi-login", text: "Login", link: "/login" },
        { icon: "mdi-file-table-box", text: "Table", link: "/data" },
        { icon: "mdi-file-table-box", text: "Signup", link: "/signup" },
        { icon: "mdi-file-table-box", text: "pdf", link: "/pdfThreejs" }
      ]
    };
  },
  methods: {
    themeModify() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  }
};
</script>