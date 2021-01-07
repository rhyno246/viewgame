import Vue from 'vue'
import VueRouter from 'vue-router'
import Game from '../views/Game.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect : '/games'
  },
  {
    path: '/games',
    name: 'Game',
    component: Game
  },
  {
    path : '/games/:slug',
    props : true,
    component : () => import('../views/GameDetail.vue')
  },
  { 
    path: '/:notFound(.*)',
    name : 'notfound',
    component : () => import('../views/NotFound.vue')
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]
// FIXME <Uncaught (in promise) Error: Avoided redundant navigation to current location >
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
