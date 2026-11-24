# Filmy

A Vue client for the movie catalog API. Users can register, log in, browse movies, view movie details, and add comments. Admin users can also add, update, and delete movies from the dashboard.

## Run locally

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the address printed by Vite. Run `npm run build` to create a production build.

The client uses `https://movie-catalog-olarte.onrender.com` by default. The API URL is set in `.env` as `VITE_API_URL`; change it there (see `.env.example`) and restart the dev server to use another compatible API.

## API and access

The supplied `s86-MTE` project is the Express API reference; this project is the Vue client and does not require a separate database connection. The API requires a bearer token even for its movie list, so visitors must log in to browse the catalog. Registration has email, password, and password confirmation fields; it creates regular users only. Admin accounts must already exist in the API. The API enforces admin permissions for managing movies.

Routes: `/register`, `/login`, `/movies`, `/movies/:id`, `/addMovie`, and `/movies/:id/edit`. A production host must serve `index.html` for client-side routes.
