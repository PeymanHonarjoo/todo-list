<template>
  <nav>
    <v-app-bar app flat>
      <v-toolbar-title class="text-uppercase grey--text">
        <v-app-bar-nav-icon
          class="grey--text"
          :small="$vuetify.breakpoint.xs"
          @click="drawerChecker(), check()"
        >
          <burgerBtn :class="{ 'is-active': isActive }"></burgerBtn>
        </v-app-bar-nav-icon>
        <router-link
          class="d-inline-block grey--text text-decoration-none"
          router
          to="/"
        >
          <div :class="{ 'subtitle-1': $vuetify.breakpoint.xs }">
            <span class="font-weight-light">Todo</span>
            <span>List</span>
          </div>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        fab
        :small="$vuetify.breakpoint.xs"
        :class="{ 'subtitle-2 pa-0': $vuetify.breakpoint.xs }"
        :id="dmData.id"
        v-for="mode in dmData"
        :key="mode.id"
        text
        color="grey"
        @click="toggleDarkMode()"
      >
        <v-icon class="title">mdi-brightness-4</v-icon>
      </v-btn>

      <v-menu transition="slide-x-transition" bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            depressed
            :class="{ 'pl-0': $vuetify.breakpoint.xs }"
            class="transparent grey--text"
            :small="$vuetify.breakpoint.xs"
            dark
            v-bind="attrs"
            v-on="on"
            xsOnly1
          >
            <v-icon
              left
              :class="{ 'title font-weight-bold': $vuetify.breakpoint.xs }"
              >mdi-chevron-down</v-icon
            >
            <span
              :class="{ 'subtitle-1 font-weight-bold': $vuetify.breakpoint.xs }"
            >
              Menu
            </span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            style="color: grey"
            v-for="link in links"
            :key="link.text"
            route
            :to="link.route"
          >
            <v-list-item-title>
              {{ link.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-flex
        xs1
        v-if="isLoggedIn == true"
        :class="{ 'd-flex justify-center mx-4': !$vuetify.breakpoint.xs }"
      >
        <v-btn
          depressed
          color="transparent grey--text pa-0"
          @click="handleSignOut()"
          :class="{
            'd-flex justify-start pa-0': $vuetify.breakpoint.xs,
          }"
        >
          <span class="d-none d-sm-flex">
            <router-link
              router
              to="/suggestion"
              class="text-decoration-none grey--text"
            >
              sign out
            </router-link>
          </span>

          <v-icon
            :small="!$vuetify.breakpoint.xs"
            :right="!$vuetify.breakpoint.xs"
            :medium="$vuetify.breakpoint.xs"
            >mdi-exit-to-app</v-icon
          >
        </v-btn>
      </v-flex>
      <v-flex
        xs1
        v-if="isLoggedIn == false"
        :class="{ 'd-flex justify-center mx-4': !$vuetify.breakpoint.xs }"
      >
        <v-btn
          depressed
          color="transparent grey--text"
          :class="{
            'd-flex justify-start pa-0': $vuetify.breakpoint.xs,
          }"
        >
          <span class="d-none d-sm-flex"
            ><router-link
              router
              to="/login"
              class="text-decoration-none grey--text"
              >log in</router-link
            ></span
          >

          <v-icon
            :small="!$vuetify.breakpoint.xs"
            :right="!$vuetify.breakpoint.xs"
            :medium="$vuetify.breakpoint.xs"
            >mdi-login</v-icon
          >
        </v-btn>
      </v-flex>
    </v-app-bar>
    <v-navigation-drawer
      disable-resize-watcher
      floating
      app
      left
      v-model="drawer"
    >
      <v-list>
        <v-list-item
          class="grey--text text-uppercase"
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon left class="grey--text" style="margin-left: 5px">
              {{ link.icon }}</v-icon
            >
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="d-flex justify-start">
              <span>{{ link.text }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import burgerBtn from "./burger-btn.vue";
import { db } from "../firebase/firebase";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
export default {
  data() {
    return {
      isLoggedIn: false,
      auth: null,
      drawer: false,
      isActive: false,
      windowWidth: window.innerWidth,
      dmData: [],
      selected: false,
      links: [
        { icon: "mdi-home", text: "Home", route: "/" },
        { icon: "mdi-account", text: "Profile", route: "/profile" },
        { icon: "mdi-account-supervisor-circle", text: "Team", route: "/team" },
      ],
    };
  },

  methods: {
    drawerChecker() {
      this.drawer = !this.drawer;
    },
    check() {
      this.isActive = !this.isActive;
    },
    toggleDarkMode() {
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
          for (let i = 0; i < this.dmData.length; i++) {
            this.dmData[i].darkmode = !this.dmData[i].darkmode;
            console.log("dmData Array: " + this.dmData[i]);
            updateDoc(doc(db, user.uid, "dark-mode"), {
              darkmode: this.dmData[i].darkmode,
            });
          }
        } else {
          this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        }
      });
    },
    getWindowWidth() {
      window.addEventListener("resize", () => {
        this.windowWidth = window.innerWidth;
      });
    },
    logInCheck() {
      this.auth = getAuth();
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      });
    },
    handleSignOut() {
      signOut(this.auth).then(() => {
        this.$router.push("/");
      });
    },
  },
  components: {
    burgerBtn,
  },
  watch: {
    drawer() {
      if (!this.drawer && this.windowWidth <= "1264") {
        this.isActive = !this.isActive;
      }
    },
  },
  created() {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        onSnapshot(collection(db, user.uid), (querySnapshot) => {
          const fbProjects = [];
          querySnapshot.forEach((doc) => {
            if (doc.id === "dark-mode") {
              const dm = {
                id: doc.id,
                darkmode: doc.data().darkmode,
              };

              fbProjects.push(dm);
            }
          });
          this.dmData = fbProjects;
          for (let i = 0; i < this.dmData.length; i++) {
            if (this.dmData[i].darkmode) {
              this.$vuetify.theme.dark = true;
            } else {
              this.$vuetify.theme.dark = false;
            }
          }
        });
      }
    });
  },
  mounted() {
    this.getWindowWidth();
    this.logInCheck();
  },
};
</script>
<style>
.v-list-item--active {
  color: rgb(195, 100, 195) !important;
  text-align: center;
}
</style>
