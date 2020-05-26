import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      component: () => import('@/views/MainPage')
    },

    {
      path: '/addManga',
      component: () => import('@/views/AddManga')
    },

    {
      path: '/addAnime',
      component: () => import('@/views/AddAnime')
    }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
