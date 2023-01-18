<template lang="">
  <div
    class="d-flex justify-center flex-column mt-10"
    :class="{
      'grey--text': !$vuetify.theme.dark,
      'white--text': $vuetify.theme.dark,
    }"
  >
    <h1 class="text-center">404</h1>
    <div class="text-center">
      <span class="font-weight-light">Page </span>
      <span>not </span>
      <span class="font-weight-light">found</span>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
