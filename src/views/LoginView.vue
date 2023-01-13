<template lang="">
  <div class="d-flex justify-center align-center load-animation">
    <v-card flat outlined class="mx-auto my-15 rounded-lg" max-width="450">
      <v-form>
        <v-container>
          <v-row>
            <v-card-title primary-title class="mx-auto">
              <v-flex
                xs12
                class="text-uppercase headline grey--text text-center ma-5"
              >
                <span class="font-weight-light">log </span>
                <span>in</span>
              </v-flex>
            </v-card-title>
            <v-flex xs12 class="mx-5">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                class="rounded-pill"
                label="Email address"
                outlined
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 class="mx-5">
              <v-text-field
                outlined
                class="rounded-pill"
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[passwordRules.required, passwordRules.min]"
                :type="show ? 'text' : 'password'"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="show = !show"
              ></v-text-field>
            </v-flex>
            <v-flex
              xs12
              class="body-2 text-center mb-5"
              v-if="showError == true"
            >
              <span class="red--text"> {{ errorMessage }} </span>
            </v-flex>
            <v-flex xs12 class="body-2 text-center mb-5">
              <router-link router to="/signup">
                You dont have an account?
              </router-link>
            </v-flex>
            <v-card-actions class="mx-auto" width="100%">
              <v-flex xs12 class="d-flex justify-center mb-6 mx-5">
                <v-btn
                  color="pink lighten-1"
                  large
                  class="px-15 py-5 white--text rounded-pill"
                  @click="login()"
                  >log in</v-btn
                >
              </v-flex>
            </v-card-actions>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>
<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      showError: false,
      errorMessage: "",
      show: false,
      email: "",
      emailRules: [
        (v) => !!v || "Email address is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      password: "",
      passwordRules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },
  methods: {
    login() {
      signInWithEmailAndPassword(getAuth(), this.email, this.password)
        .then(() => {
          console.log("Successfully signed in");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              this.errorMessage = "Invalid email address";
              this.showError = true;
              break;
            case "auth/user-not-found":
              this.errorMessage = "No account with this email was found";
              this.showError = true;
              break;
            case "auth/wrong-password":
              this.errorMessage = "Incorrect password";
              this.showError = true;
              break;

            default:
              this.errorMessage = "Email or password was incorrect";
              this.showError = true;
              break;
          }
        });
    },
  },
};
</script>
<style>
.load-animation {
  animation: load 1.5s forwards;
}
@keyframes load {
  0% {
    transform: translateY(-10%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
