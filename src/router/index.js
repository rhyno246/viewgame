import Vue from 'vue'
import VueRouter from 'vue-router'
import Game from '../views/Game.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect : '/game'
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

export default router
