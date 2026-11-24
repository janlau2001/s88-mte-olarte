<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../store/auth'
import { request } from '../services/api'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

async function submit() {
  try {
    const data = await request('/users/login', 'POST', { email: email.value, password: password.value })
    auth.login(data.access)
    router.push('/movies')
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <div class="auth-wrap">
    <form class="card panel card-body" @submit.prevent="submit">
      <p class="eyebrow"><span></span> WELCOME BACK</p>
      <h1>Good to see you<span class="text-red">.</span></h1>
      <p class="form-intro">Log in to explore the Filmy collection.</p>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <label for="login-email">Email address</label>
      <input id="login-email" v-model="email" class="form-control mb-3" type="email" autocomplete="email" placeholder="you@example.com" required>
      <label for="login-password">Password</label>
      <input id="login-password" v-model="password" class="form-control mb-3" type="password" autocomplete="current-password" placeholder="Your password" required>
      <button class="btn btn-red w-100">Login</button>
      <p class="mt-3 mb-0 text-center text-secondary">No account? <RouterLink to="/register">Register</RouterLink></p>
    </form>
  </div>
</template>
