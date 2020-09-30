<template>
  <div>
    <v-text-field
      v-model="title"
      outlined
      prepend-inner-icon="mdi-map-marker"
      @keypress.enter="searchMovies"
    >
      <template v-slot:prepend-inner>
        <v-icon>search</v-icon>
      </template>
      <template v-slot:append>
        <v-progress-circular
          v-if="loading"
          size="24"
          indeterminate
          color="primary"
        />
      </template>
    </v-text-field>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      loading: false,
    };
  },
  methods: {
    async searchMovies() {
      this.loading = true;
      const res = await axios.get(
        `http://www.omdbapi.com/?apikey=e2472a39&s=${this.title}`
      );
      this.loading = false;
      console.log(res);
    },
  },
};
</script>
