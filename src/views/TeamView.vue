<template>
  <div class="team">
    <h1 class="subtitle-1 grey--text">This is Team page</h1>
    <v-container class="my-5">
      <v-layout row wrap class="my-auto">
        <v-flex xs12 sm6 md4 v-for="person in team" :key="person.role">
          <v-card class="text-center ma-3">
            <v-responsive class="pt-5"> image is ganna be here </v-responsive>
            <v-card-text>
              <div class="subheading font-weight-bold">
                {{ person.name }}
              </div>
              <div class="grey--text">
                {{ person.role }}
              </div>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
              <v-btn depressed color="transparent grey--text mb-2">
                <v-icon small left>mdi-message</v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      team: [
        { name: "Peyman", role: "FrontEnd-Developer" },
        { name: "Peyman", role: "CEO" },
        { name: "Peyman", role: "BackEnd-Developer" },
      ],
    };
  },
};
</script>
<style lang=""></style>
