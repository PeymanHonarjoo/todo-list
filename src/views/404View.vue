<template lang="">
  <div class="d-flex justify-center flex-column mt-10">
    <v-card
      flat
      outlined
      class="ma-5 pa-10"
      :class="{
        'grey--text text--darken-1': !$vuetify.theme.dark,
        'white--text': $vuetify.theme.dark,
      }"
    >
      <div class="text-center title">
        <v-icon class="red--text">mdi-tooltip-remove</v-icon>
      </div>
      <h1 class="text-center">
        <span class="red--text">4</span>
        <span class="orange--text">0</span>
        <span class="cyan--text">4</span>
      </h1>
      <div class="text-center">
        <span class="red--text">Page </span>
        <span class="font-weight-bold orange--text">not </span>
        <span class="cyan--text">found</span>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
