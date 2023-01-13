<template>
  <v-app>
    <Loader />
    <v-main>
      <Navbar />
      <router-view class="mx-5 my-3"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/nav-bar.vue";
import Loader from "@/components/page-loader.vue";

export default {
  name: "App",

  components: {
    Navbar,
    Loader,
  },
};
</script>
