<template>
  <div class="build views">
    <container ref="container"></container>
  </div>
</template>
<script>
import init from '@/mixins/'
import {  getUrlParames } from "@/api/httpClient.js"
export default {
  mixins: [init],
}
</script>
<style lang="scss">
@import "../styles/style.scss";
</style>