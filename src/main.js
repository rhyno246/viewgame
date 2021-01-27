import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueYouTubeEmbed from 'vue-youtube-embed';
import VueLazyload from 'vue-lazyload';
import viewability from "./components/directives/Viewability.js";
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'img/error.svg',
  loading: 'img/loader.svg',
  attempt: 1
})
Vue.directive("viewability", viewability);
Vue.use(VueYouTubeEmbed)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
