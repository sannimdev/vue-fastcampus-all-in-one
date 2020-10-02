<template>
  <v-row>
    <v-col
      v-for="movie in movies"
      :key="movie.imdbID"
      cols="12"
      lg="3"
      md="3"
      sm="2"
    >
      {{ movie.Title }}
      {{ movie.Year }}
      {{ movie.Poster }}
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    movies() {
      return this.$store.state.movie.movies;
    },
  },
};
</script>