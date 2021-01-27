<template>
  <v-app class="my-app">
    <the-header></the-header>
    <filter-main></filter-main>
    <v-main>
      <router-view></router-view>
    </v-main>
      <page-footer></page-footer>
  </v-app>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import PageFooter from './components/PageFooter.vue';
import FilterMain from './components/Filter/FilterMain.vue';
export default {
  name: 'App',
  components: {
    TheHeader,
    FilterMain,
    PageFooter,
  },
};
</script>

<style lang="scss">
  @import './assets/scss/base/_mixin.scss';
  @import './assets/scss/base/_variable.scss';
  @import './assets/scss/base/_base.scss';
</style>
