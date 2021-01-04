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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
