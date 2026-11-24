<script setup>
import { useRouter } from 'vue-router'
import { auth } from '../store/auth'

const router = useRouter()

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="navbar navbar-expand navbar-dark">
    <div class="container">
      <RouterLink class="navbar-brand brand" to="/"><img src="../assets/images/logo.svg" alt="">FILMY</RouterLink>
      <div class="navbar-nav ms-auto align-items-center">
        <template v-if="auth.token">
          <RouterLink class="nav-link" to="/movies">Movies</RouterLink>
          <RouterLink v-if="auth.user?.isAdmin" class="nav-link" to="/addMovie">Add Movie</RouterLink>
          <button class="btn btn-red btn-sm ms-2" @click="logout">Logout</button>
        </template>
        <template v-else>
          <RouterLink class="nav-link" to="/login">Login</RouterLink>
          <RouterLink class="btn btn-red btn-sm ms-2" to="/register">Register</RouterLink>
        </template>
      </div>
    </div>
  </nav>
</template>
