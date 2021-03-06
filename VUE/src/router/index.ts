import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/clubs',
    name: 'Clubs',
    component: () => import('@/modules/clubs/views/Clubs.vue')
  },
  {
    path: '/players',
    name: 'Players',
    component: () => import('@/modules/players/views/Players.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
