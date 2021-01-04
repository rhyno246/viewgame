<template>
  <v-app class="my-app">
    <the-header></the-header>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from './components/TheHeader.vue';

export default {
  name: 'App',
  components: {
    TheHeader
  },

  data: () => ({

  }),
};
</script>

<style lang="scss">
  @import './assets/scss/base/_mixin.scss';
  @import './assets/scss/base/_variable.scss';
  @import './assets/scss/base/_base.scss';
</style>
