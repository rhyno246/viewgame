import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueYouTubeEmbed from 'vue-youtube-embed';
import VueLazyload from 'vue-lazyload';
import viewability from "./components/directives/Viewability.js";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import firebase from 'firebase/app';
import "firebase/firestore"
Vue.config.productionTip = false


 const firebaseConfig = {
  apiKey: "AIzaSyA6hgfpYY1LH_O17A6h31biF1rX3h9N2-E",
  authDomain: "authviewgame.firebaseapp.com",
  projectId: "authviewgame",
  storageBucket: "authviewgame.appspot.com",
  messagingSenderId: "256553392757",
  appId: "1:256553392757:web:a80ab6ff1e15430456763c",
  storageBucket : 'gs://authviewgame.appspot.com/',
};
firebase.initializeApp(firebaseConfig);


Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'img/error.svg',
  loading: 'img/loader.svg',
  attempt: 1
})

Vue.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
});

Vue.directive("viewability", viewability);
Vue.use(VueYouTubeEmbed)

let app;
firebase.auth().onAuthStateChanged(user =>{
  if(!app){
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})



