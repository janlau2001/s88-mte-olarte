<script setup>
defineProps({ movie: Object })
</script>

<template>
  <article class="card movie-card h-100">
    <div class="movie-card-top"><span>FILMY / THE COLLECTION</span><span>{{ movie.year }}</span></div>
    <div class="card-body d-flex flex-column">
      <span class="movie-genre">{{ movie.genre }}</span>
      <h2 class="movie-title">{{ movie.title }}</h2>
      <p class="movie-director">Directed by {{ movie.director }}</p>
      <p class="movie-description">{{ movie.description }}</p>
      <RouterLink class="movie-link mt-auto" :to="`/movies/${movie._id}`">View movie <span aria-hidden="true">↗</span></RouterLink>
    </div>
  </article>
</template>
