<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title class="pb-4">
      <h1>Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="loginInfo.username"
          label="Username"
          prepend-icon="mdi-account-circle"
        />
        <v-text-field
          v-model="loginInfo.password"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="success" rounded>Register</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="yellow" rounded @click="loginUser">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  head() {
    return {
      title: "Login"
    };
  },
  name: "Login",
  data() {
    return {
      showPassword: false,
      loginInfo: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async loginUser(loginInfo) {
      try {
        await this.$auth.loginWith("local", {
          data: loginInfo
        });
        this.$store.dispatch("snackbar/setSnackbar", {
          text: `Thanks for signing in, ${this.$auth.user.name}`
        });
        this.$router.push("/");
      } catch {
        this.$store.dispatch("snackbar/setSnackbar", {
          color: "red",
          text: "There was an issue signing in.  Please try again."
        });
      }
    }
  }
};
</script>