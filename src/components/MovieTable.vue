<script setup>
defineProps({ movies: Array, deleting: String })
defineEmits(['delete'])
</script>

<template>
  <table class="table table-striped align-middle">
    <thead>
      <tr><th>Title</th><th>Director</th><th>Year</th><th>Genre</th><th></th></tr>
    </thead>
    <tbody>
      <tr v-for="movie in movies" :key="movie._id">
        <td>{{ movie.title }}</td>
        <td>{{ movie.director }}</td>
        <td>{{ movie.year }}</td>
        <td>{{ movie.genre }}</td>
        <td class="text-nowrap">
          <RouterLink class="btn btn-sm btn-outline-light me-2" :to="`/movies/${movie._id}`">View</RouterLink>
          <RouterLink class="btn btn-sm btn-outline-light me-2" :to="`/movies/${movie._id}/edit`">Update</RouterLink>
          <button class="btn btn-sm btn-outline-danger" :disabled="Boolean(deleting)" @click="$emit('delete', movie)">{{ deleting === movie._id ? 'Deleting...' : 'Delete' }}</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
