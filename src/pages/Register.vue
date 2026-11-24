<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { request } from '../services/api'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

async function submit() {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  try {
    await request('/users/register', 'POST', { email: email.value, password: password.value })
    router.push('/login')
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <div class="auth-wrap">
    <form class="card panel card-body" @submit.prevent="submit">
      <p class="eyebrow"><span></span> JOIN THE COLLECTION</p>
      <h1>Welcome to Filmy<span class="text-red">.</span></h1>
      <p class="form-intro">Make an account and find your next favorite.</p>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <label for="register-email">Email address</label>
      <input id="register-email" v-model="email" class="form-control mb-3" type="email" autocomplete="email" placeholder="you@example.com" required>
      <label for="register-password">Password</label>
      <input id="register-password" v-model="password" class="form-control mb-3" type="password" autocomplete="new-password" placeholder="At least 8 characters" minlength="8" required>
      <label for="register-confirm">Confirm password</label>
      <input id="register-confirm" v-model="confirmPassword" class="form-control mb-3" type="password" autocomplete="new-password" placeholder="Repeat your password" required>
      <button class="btn btn-red w-100">Register</button>
      <p class="mt-3 mb-0 text-center text-secondary">Have an account? <RouterLink to="/login">Login</RouterLink></p>
    </form>
  </div>
</template>
