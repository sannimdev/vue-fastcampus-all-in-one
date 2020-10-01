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
import { mapActions } from 'vuex';

export default {
  name: 'SearchBar',
  computed: {
    title: {
      //Getter
      get() {
        return this.$store.state.movie.title;
      },
      //Setter
      set(title) {
        this.$store.commit('movie/updateState', { title });
      },
    },
    /*[Vue warn]: Computed property "title" was assigned to but it has no setter. */
    // title() {
    //   return this.$store.state.movie.title;
    // },
    loading() {
      return this.$store.state.movie.loading;
    },
  },
  methods: {
    ...mapActions('movie', ['searchMovies']),
  },
};
</script>
