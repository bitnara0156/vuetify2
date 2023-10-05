<template>
  <v-card width="400" class="mx-auto my-5">
    <v-card-title class="pb-4">
      <h1>Signup</h1>
    </v-card-title>
    <v-card-text>
      <v-form ref="signUpForm" v-model="formValidity">
        <v-text-field
          v-model="userInfo.name"
          :rules="nameRules"
          label="Name"
          required
          prepend-icon="mdi-account"
          dense
        />
        <v-text-field
          label="Email"
          type="email"
          v-model="userInfo.email"
          :rules="emailRules"
          required
          prepend-icon="mdi-at"
          dense
        />
        <v-file-input label="Attach profile picture" prepend-icon="mdi-camera" dense></v-file-input>
        <v-menu
          v-model="userInfo.birthday"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
          dense
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Birthday"
              prepend-icon="mdi-calendar-star"
              readonly
              v-on="on"
              dense
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
        </v-menu>
        <v-text-field
          v-model="userInfo.password"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          required
          :rules="passwordRules"
          counter
          dense
        />
        <v-checkbox
          label="Agree to terms & conditions"
          v-model="agreeToTerms"
          :rules="agreeToTermsRules"
          required
        ></v-checkbox>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        type="submit"
        color="yellow"
        class="mr-4"
        @click="registerUser(userInfo)"
        :disabled="!formValidity"
        rounded
      >Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  head() {
    return {
      title: "Signup"
    };
  },
  name: "Signup",
  data: () => ({
    showPassword: false,
    userInfo: {
      name: "",
      email: "",
      password: "",
      birthday: "",
      picture: ""
    },
    nameRules: [value => !!value || "Name is required."],
    emailRules: [
      value => !!value || "Email is required.",
      value => value.indexOf("@") !== 0 || "Email should have a username.",
      value => value.includes("@") || "Email should include an @ symbol.",
      value =>
        value.indexOf(".") - value.indexOf("@") > 1 ||
        "Email should contain a valid domain.",
      value => value.includes(".") || "Email should include a period symbol.",
      value =>
        value.indexOf(".") <= value.length - 3 ||
        "Email should contain a valid domain extension."
    ],
    passwordRules: [
      value => value.length >= 6 || "Password is required. Lenght min 6."
    ],
    agreeToTermsRules: [
      value =>
        !!value ||
        "You must agree to the terms and conditions to sign up for an account."
    ],
    date: new Date().toISOString().substr(0, 10),
    agreeToTerms: false,
    formValidity: false
  }),
  methods: {
    async registerUser(registrationInfo) {
      try {
        await this.$axios.post("/users", registrationInfo);
        await this.$auth.loginWith("local", {
          data: registrationInfo
        });
        this.$store.dispatch("snackbar/setSnackbar", {
          text: `Thanks for signing up, ${this.$auth.user.name}`
        });
        this.$router.push("/");
      } catch {
        this.$store.dispatch("snackbar/setSnackbar", {
          color: "red",
          text: "There was an issue signing up.  Please try again."
        });
      }
    },
    resetForm() {
      this.$refs.signUpForm.reset();
    },
    resetValidation() {
      this.$refs.signUpForm.resetValidation();
    },
    validateForm() {
      this.$refs.signUpForm.validate();
    }
  }
};
</script>