<script setup>
import { auth } from '../store/auth'
import television from '../assets/images/image1.jpg'
import film from '../assets/images/image2.jpg'
</script>

<template>
  <div class="landing">
    <section class="landing-hero">
      <div class="container landing-hero-content">
        <h1>Good stories<br>start <em>here.</em></h1>
        <p class="hero-copy">From familiar favorites to your next discovery, explore a collection made for the love of movies.</p>
        <div class="hero-actions">
          <RouterLink class="btn btn-red" :to="auth.token ? '/movies' : '/login'">
            {{ auth.token ? 'Explore the catalog' : 'Get started' }} <span aria-hidden="true">→</span>
          </RouterLink>
          <RouterLink v-if="!auth.token" class="landing-secondary" to="/register">Create an account <span aria-hidden="true">↗</span></RouterLink>
        </div>
      </div>
      <div class="container hero-bottom"><span>THE FILMY COLLECTION</span><span>SCROLL TO EXPLORE ↓</span></div>
    </section>

    <section class="container intro-section">
      <div class="intro-heading">
        <div>
          <h2>For the love<br>of the <em>story.</em></h2>
        </div>
        <p>Every great movie starts with a story. Filmy brings them together in one place, so there's always something new to discover.</p>
      </div>
      <div class="editorial-grid">
        <article class="editorial-card">
          <img :src="television" alt="A vintage television against a warm patterned wall">
          <div class="editorial-caption"><span>01 / DISCOVER</span><h3>Find your next favorite.</h3><p>Browse a collection of films, one story at a time.</p></div>
        </article>
        <article class="editorial-card">
          <img :src="film" alt="A curled strip of film">
          <div class="editorial-caption"><span>02 / EXPLORE</span><h3>Get to know the story.</h3><p>Explore the details behind each movie in the catalog.</p></div>
        </article>
      </div>
    </section>
    <footer class="container landing-footer"><strong>FILMY<span>.</span></strong><span>MADE FOR MOVIE LOVERS</span></footer>
  </div>
</template>
