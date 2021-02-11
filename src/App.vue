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
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage";
export default {
  name: 'App',
  components: {
    TheHeader,
    FilterMain,
    PageFooter,
  },
  created(){
    firebase.auth().onAuthStateChanged(user => {
      if(user != null){
        firebase.storage().ref('users/' + user.uid + '/profile.jpg').getDownloadURL().then(imgUrl => {
          this.$store.state.game.photo = imgUrl
        }).catch(error => {
            switch (error.code) {
              case 'storage/object-not-found':
                  break;
              case 'storage/unauthorized':
                  break;
              case 'storage/canceled':
                  break;
              case 'storage/unknown':
                  break;
            }
        })
      }
    })
  }
};
</script>

<style lang="scss">
  @import './assets/scss/base/_mixin.scss';
  @import './assets/scss/base/_variable.scss';
  @import './assets/scss/base/_base.scss';
</style>
