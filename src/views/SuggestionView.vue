<template lang="">
  <div>
    <div>
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
        <v-card-actions class="d-flex flex-column">
          <v-btn color="info" class="d-block mx-auto my-5 mb-10 rounded-xl">
            <router-link
              route
              to="/login"
              class="white--text text-decoration-none px-5"
            >
              Click here to go to login page
            </router-link>
          </v-btn>
          <v-btn color="error" class="d-block mx-auto my-5 mb-10 rounded-xl">
            <router-link
              route
              to="/preview"
              class="white--text text-decoration-none px-5"
            >
              Click here for preview
            </router-link>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
