<template lang="">
  <div class="d-flex justify-center align-center load-animation">
    <v-card flat outlined class="mx-auto my-15 rounded-lg" max-width="450">
      <v-form>
        <v-container>
          <v-row>
            <v-card-title primary-title class="mx-auto" style="width: 100%">
              <v-flex
                xs12
                class="text-uppercase headline grey--text text-center ma-5"
              >
                <span class="font-weight-light">sign </span>
                <span>up</span>
              </v-flex>
            </v-card-title>
            <div
              :class="{
                'd-flex flex-column px-2': this.$vuetify.breakpoint.xsOnly,
              }"
              class="px-2 d-flex flex-row"
              style="width: 100%"
            >
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="firstName"
                  :rules="nameRules"
                  color="blue darken-2"
                  label="First name"
                  class="rounded-pill mx-3"
                  outlined
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="lastName"
                  :rules="nameRules"
                  color="blue darken-2"
                  label="Last name"
                  class="rounded-pill mx-3"
                  outlined
                  required
                ></v-text-field>
              </v-flex>
            </div>
            <v-flex xs12 class="mx-5">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                class="rounded-pill"
                label="Email address"
                color="blue darken-2"
                outlined
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12 class="mx-5">
              <v-text-field
                outlined
                class="rounded-pill"
                color="blue darken-2"
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[passwordRules.required, passwordRules.min]"
                :type="show1 ? 'text' : 'password'"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-flex>
            <v-card-actions class="mx-auto" width="100%">
              <v-flex xs12 class="d-flex justify-center mb-5 mx-5">
                <v-btn
                  color="pink lighten-1"
                  large
                  class="px-15 py-5 white--text rounded-pill"
                  @click="register()"
                  >sign up</v-btn
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
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
export default {
  data() {
    return {
      show1: false,
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
      firstName: "",
      lastName: "",
      nameRules: [(val) => (val || "").length > 0 || "This field is required"],
    };
  },
  methods: {
    register() {
      createUserWithEmailAndPassword(getAuth(), this.email, this.password)
        .then(() => {
          console.log("Successfully registered");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.code);
          alert(error.message);
        });

      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          setDoc(doc(db, user.uid, "dark-mode"), {
            darkmode: false,
          });
          setDoc(doc(db, user.uid, "name"), {
            firstName: this.firstName,
            lastName: this.lastName,
          });
          console.log("this is users uid: " + user.uid);
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
