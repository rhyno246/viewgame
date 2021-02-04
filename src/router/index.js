import Vue from 'vue'
import VueRouter from 'vue-router'
import Game from '../views/Game.vue'
import firebase from "firebase/app"
import "firebase/auth"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect : '/game',
    meta : { requiresAuth : true }
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
  {
    path : '/search',
    name : 'Search',
    component : () => import('../views/Search.vue')
  },
  {
    path : '/game/:slug',
    props : true,
    name : 'GameDetail',
    component : () => import('../views/GameDetail.vue')
  },

  {
    path : '/sign-up',
    name : 'SignUp',
    component : () => import('../views/SignUp.vue')
  },
  {
    path : '/login',
    name : 'Login',
    component : () => import('../views/Login.vue')
  },
  {
    path : '/profile',
    name : 'Profile',
    component : () => import('../views/profile.vue')
  },
  { 
    path: '/:notFound(.*)',
    name : 'notfound',
    component : () => import('../views/NotFound.vue')
  },
]
// FIXME <Uncaught (in promise) Error: Avoided redundant navigation to current location >
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from , next)=> {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if(requiresAuth && !isAuthenticated){
    next("/game");
  }else{
    next();
  }

})
export default router
