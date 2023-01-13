<template>
  <div class="profile">
    <div v-if="isLoggedIn == false">
      <v-card
        flat
        max-width="450"
        outlined
        class="mx-auto my-15 rounded-lg profile-load-animation"
      >
        <v-card-title primary-title class="d-flex justify-center">
          <h1 class="title mt-10 grey--text text-center text-uppercase">
            <span class="font-weight-light">You should </span>
            <span>log in</span>
            <span class="font-weight-light"> first</span>
          </h1>
        </v-card-title>
        <v-card-actions>
          <v-btn color="error" class="d-block mx-auto my-5 mb-10 rounded-xl">
            <router-link
              route
              to="/login"
              class="white--text text-decoration-none px-5"
            >
              Click here
            </router-link>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div
      v-if="isLoggedIn == true"
      class="d-flex justify-center"
      style="width: 100%"
    >
      <v-card
        flat
        max-width="600"
        width="100%"
        class="profile-load-animation mt-15"
      >
        <v-card-title primary-title class="d-flex justify-center">
          <h1 class="title grey--text text-center text-uppercase">
            <span class="font-weight-light">Your </span>
            <span>task</span>
            <span class="font-weight-light"> list</span>
          </h1>
        </v-card-title>
        <v-card-actions class="px-auto">
          <div
            class="my-5 text-uppercase d-flex justify-center"
            style="width: 100%"
            v-if="projects.length === 0"
          >
            <p class="red--text text-center">
              <span class="font-weight-light">There is </span>
              <span class="font-weight-bold">no </span>
              <span class="font-weight-light">task with your name</span>
            </p>
          </div>
          <v-container class="my-5" v-if="projects.length !== 0">
            <v-expansion-panels
              focusable
              class="profile-load-animation mb-2"
              v-for="project in projects"
              :key="project.title"
            >
              <v-expansion-panel
                v-if="
                  project.person === userName[0].firstName ||
                  project.person === userName[0].lastName
                "
                :class="`mb-1 ${project.status}`"
                :disabled="project.done"
              >
                <v-expansion-panel-header
                  expand-icon="mdi-menu-down"
                  :class="{
                    'orange--text text--darken-2': project.status === 'ongoing',
                    'success--text': project.status === 'complete',
                    'red--text': project.status === 'overdue',
                  }"
                >
                  <template v-slot:actions>
                    <v-icon
                      small
                      :class="{
                        'orange--text text--darken-2':
                          project.status === 'ongoing',
                        'success--text': project.status === 'complete',
                        'red--text': project.status === 'overdue',
                      }"
                    >
                      $expand mdi-chevron-down-circle
                    </v-icon>
                  </template>
                  {{ project.title }}
                  <v-icon
                    right
                    small
                    v-if="project.done == true"
                    class="d-flex justify-end success--text"
                  >
                    mdi-check-circle
                  </v-icon>
                </v-expansion-panel-header>
                <v-expansion-panel-content
                  class="text-center"
                  align="center"
                  :class="{
                    'text--darken-2': !$vuetify.theme.dark,
                    'orange--text text--darken-2': project.status === 'ongoing',
                    'success--text': project.status === 'complete',
                    'red--text': project.status === 'overdue',
                  }"
                >
                  {{ project.information }}
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-container>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default {
  data() {
    return {
      projects: [],
      isLoggedIn: false,
      userName: [],
    };
  },
  methods: {
    logInCheck() {
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      });
    },
  },
  mounted() {
    this.logInCheck();
  },
  created() {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        onSnapshot(collection(db, user.uid), (querySnapshot) => {
          const fbProjects = [];
          const fbUserName = [];
          querySnapshot.forEach((doc) => {
            if (doc.id !== "dark-mode" && doc.id !== "name") {
              const project = {
                id: doc.id,
                title: doc.data().title,
                person: doc.data().person,
                information: doc.data().information,
                dueBy: doc.data().dueBy,
                done: doc.data().done,
                status: doc.data().status,
                count: doc.data().count,
              };
              fbProjects.push(project);
            }
            this.projects = fbProjects;
            if (doc.id === "name") {
              const userName = {
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
              };
              fbUserName.push(userName);
            }
          });
          this.userName = fbUserName;
        });
      }
    });
  },
};
</script>
<style scoped>
.complete {
  border-left: 4px solid #3cd1c2;
  background-color: #a5f9f1 !important;
}
.ongoing {
  border-left: 4px solid orange;
  background-color: rgb(255, 221, 158) !important;
}
.overdue {
  border-left: 4px solid tomato;
  background-color: rgb(253, 188, 176) !important;
}
.profile-load-animation {
  animation: load 1.2s forwards;
}
@keyframes load {
  0% {
    opacity: 0;
  }
  33% {
    opacity: 1;
  }
  66% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
