<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { request } from '../services/api'

const router = useRouter()
const route = useRoute()
const editing = Boolean(route.params.id)
const movie = reactive({ title: '', director: '', year: '', genre: '', description: '' })
const error = ref('')
const loading = ref(editing)
const saving = ref(false)
const loadFailed = ref(false)

onMounted(async () => {
  if (!editing) return
  try {
    const data = await request(`/movies/getMovie/${encodeURIComponent(route.params.id)}`)
    movie.title = data.title
    movie.director = data.director
    movie.year = data.year
    movie.genre = data.genre
    movie.description = data.description
  } catch (err) {
    loadFailed.value = true
    error.value = err.message
  } finally {
    loading.value = false
  }
})

async function submit() {
  error.value = ''
  const body = {
    title: movie.title.trim(),
    director: movie.director.trim(),
    year: Number(movie.year),
    genre: movie.genre.trim(),
    description: movie.description.trim(),
  }
  if (!body.title || !body.director || !body.genre || !body.description || !Number.isInteger(body.year) || body.year < 1) {
    error.value = 'Please complete every field and enter a valid year.'
    return
  }
  saving.value = true
  try {
    const path = editing ? `/movies/updateMovie/${encodeURIComponent(route.params.id)}` : '/movies/addMovie'
    await request(path, editing ? 'PATCH' : 'POST', body)
    await router.push('/movies')
  } catch (err) {
    error.value = err.message
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <section class="container page-content">
  <RouterLink class="back-link" to="/movies">&larr; Back to dashboard</RouterLink>
  <p v-if="loading" class="muted" role="status">Loading movie...</p>
  <p v-else-if="loadFailed" class="alert alert-danger" role="alert">{{ error }}</p>
  <form v-else class="card panel card-body add-form" @submit.prevent="submit">
    <p class="eyebrow"><span></span> ADMIN DASHBOARD</p>
    <h1>{{ editing ? 'Update movie' : 'Add a movie' }}<span class="text-red">.</span></h1>
    <p class="form-intro">{{ editing ? 'Edit the movie details.' : 'Add another story to the collection.' }}</p>
    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
    <label for="title">Title</label>
    <input id="title" v-model="movie.title" class="form-control mb-3" placeholder="Movie title" required>
    <label for="director">Director</label>
    <input id="director" v-model="movie.director" class="form-control mb-3" placeholder="Director's name" required>
    <label for="year">Year</label>
    <input id="year" v-model="movie.year" class="form-control mb-3" type="number" min="1" placeholder="Release year" required>
    <label for="genre">Genre</label>
    <input id="genre" v-model="movie.genre" class="form-control mb-3" placeholder="Genre" required>
    <label for="description">Description</label>
    <textarea id="description" v-model="movie.description" class="form-control mb-3" placeholder="What's this movie about?" rows="4" required></textarea>
    <button class="btn btn-red w-100" :disabled="saving">{{ saving ? 'Saving...' : editing ? 'Update Movie' : 'Add Movie' }}</button>
  </form>
  </section>
</template>
