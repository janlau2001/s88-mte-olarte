<script setup>
import { ref, onMounted } from 'vue'
import { auth } from '../store/auth'
import { request } from '../services/api'
import MovieCard from '../components/MovieCard.vue'
import MovieTable from '../components/MovieTable.vue'

const movies = ref([])
const error = ref('')
const loading = ref(true)
const deleteError = ref('')
const deleting = ref('')

onMounted(async () => {
  try {
    const data = await request('/movies/getMovies')
    movies.value = data.movies
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

async function deleteMovie(movie) {
  if (!window.confirm(`Delete "${movie.title}"? This cannot be undone.`)) return
  deleteError.value = ''
  deleting.value = movie._id
  try {
    await request(`/movies/deleteMovie/${encodeURIComponent(movie._id)}`, 'DELETE')
    movies.value = movies.value.filter(item => item._id !== movie._id)
  } catch (err) {
    deleteError.value = err.message
  } finally {
    deleting.value = ''
  }
}
</script>

<template>
  <section class="container page-content">
    <div class="page-heading d-flex justify-content-between align-items-end flex-wrap gap-3">
      <div><p class="eyebrow"><span></span> {{ auth.user?.isAdmin ? 'MANAGE THE COLLECTION' : 'THE FILMY COLLECTION' }}</p>
        <h1>{{ auth.user?.isAdmin ? 'Admin dashboard' : 'Explore movies' }}<em>.</em></h1>
        <p>{{ auth.user?.isAdmin ? 'View and add movies to the catalog.' : 'Find a story for every kind of movie night.' }}</p>
      </div>
      <div v-if="deleteError" class="alert alert-danger" role="alert">{{ deleteError }}</div>
      <RouterLink v-if="auth.user?.isAdmin" class="btn btn-red" to="/addMovie">+ Add movie</RouterLink>
    </div>
    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
    <p v-else-if="loading" class="muted" role="status">Loading movies...</p>
    <p v-else-if="!movies.length" class="muted">No movies yet.</p>
    <div v-else-if="auth.user?.isAdmin" class="table-responsive"><MovieTable :movies="movies" :deleting="deleting" @delete="deleteMovie" /></div>
    <div v-else class="row g-4">
      <div v-for="movie in movies" :key="movie._id" class="col-md-6 col-lg-4">
        <MovieCard :movie="movie" />
      </div>
    </div>
  </section>
</template>
