<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { request } from '../services/api'

const route = useRoute()
const movie = ref(null)
const error = ref('')
const loading = ref(true)
const comment = ref('')
const commentError = ref('')
const submitting = ref(false)

onMounted(async () => {
  try {
    movie.value = await request(`/movies/getMovie/${route.params.id}`)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

async function addComment() {
  commentError.value = ''
  const text = comment.value.trim()
  if (!text) {
    commentError.value = 'Please enter a comment.'
    return
  }
  submitting.value = true
  try {
    const data = await request(`/movies/addComment/${encodeURIComponent(route.params.id)}`, 'PATCH', { comment: text })
    if (!data.updatedMovie || !Array.isArray(data.updatedMovie.comments)) {
      throw new Error('The API returned an invalid comment response. Please reload the movie.')
    }
    movie.value = data.updatedMovie
    comment.value = ''
  } catch (err) {
    commentError.value = err.message
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="container page-content detail-page">
    <RouterLink class="back-link" to="/movies">&larr; Back to movies</RouterLink>

    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
    <p v-else-if="loading" class="muted" role="status">Loading movie...</p>
    <template v-else-if="movie">
      <article class="detail-feature">
        <div class="detail-feature-content">
          <p class="detail-kicker">FILMY <span>/</span> MOVIE DETAILS</p>
          <h1 class="detail-title">{{ movie.title }}</h1>
          <span class="detail-genre">{{ movie.genre }}</span>
          <dl class="detail-facts">
            <div><dt>DIRECTED BY</dt><dd>{{ movie.director }}</dd></div>
            <div><dt>RELEASE YEAR</dt><dd>{{ movie.year }}</dd></div>
          </dl>
          <div class="detail-synopsis">
            <h2>About the movie</h2>
            <p>{{ movie.description }}</p>
          </div>
        </div>
        <div class="detail-feature-art" aria-hidden="true">
          <span>THE FILMY COLLECTION</span>
          <span>EVERY FILM HAS A STORY</span>
        </div>
      </article>

      <section class="detail-comments" aria-labelledby="comments-heading">
        <div class="comments-heading">
          <div>
            <h2 id="comments-heading">Thoughts on this movie<span>.</span></h2>
            <p>Share your take with fellow movie lovers.</p>
          </div>
          <span class="comment-count">{{ movie.comments?.length || 0 }} {{ movie.comments?.length === 1 ? 'COMMENT' : 'COMMENTS' }}</span>
        </div>
        <div class="comments-layout">
          <div class="comments-list">
            <p v-if="!movie.comments?.length" class="comments-empty">No comments yet. Be the first to share your thoughts.</p>
            <ul v-else>
              <li v-for="c in movie.comments" :key="c._id" class="comment-item">
                <span class="comment-avatar" aria-hidden="true">F</span>
                <div><strong>Filmy member</strong><p>{{ c.comment }}</p></div>
              </li>
            </ul>
          </div>
          <form class="comment-form" @submit.prevent="addComment">
            <label for="comment">Add a comment</label>
            <textarea id="comment" v-model="comment" class="form-control" rows="4" placeholder="What did you think of this movie?" required></textarea>
            <div v-if="commentError" class="alert alert-danger mt-3" role="alert">{{ commentError }}</div>
            <button id="addComment" class="btn btn-red" type="submit" :disabled="submitting">{{ submitting ? 'Posting...' : 'Add comment' }}</button>
          </form>
        </div>
      </section>
    </template>
  </section>
</template>
