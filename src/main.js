import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { auth } from './store/auth'
import Landing from './pages/Landing.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Movies from './pages/Movies.vue'
import MovieDetail from './pages/MovieDetail.vue'
import AddMovie from './pages/AddMovie.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Landing },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/movies', component: Movies, meta: { auth: true } },
    { path: '/movies/:id', component: MovieDetail, meta: { auth: true } },
    { path: '/addMovie', component: AddMovie, meta: { auth: true, admin: true } },
    { path: '/movies/:id/edit', component: AddMovie, meta: { auth: true, admin: true } },
  ],
})

router.beforeEach(to => {
  if (to.meta.auth && !auth.token) return '/login'
  if (to.meta.admin && !auth.user?.isAdmin) return '/movies'
})

createApp(App).use(router).mount('#app')
