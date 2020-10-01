import axios from 'axios';

export default {
  namespaced: 'movie',
  state: () => ({
    title: '',
    loading: false,
    movies: []
  }),
  setters: {},
  mutation: {
    updateState(state, payload) {
      // Javascript의 문법
      Object.keys(payload).forEach(key => {
        state[key] = payload[key];
      });
    }
  },
  actions: {
    async searchMovies({ state, commit }) {
      state.loading = true;
      commit('updateState', {
        loading: true
      });
      const res = await axios.get(
        `http://www.omdbapi.com/?apikey=e2472a39&s=${state.title}`
      );
      //   state.movies = res.data.Search
      commit('updateState', {
        loading: false
      });
      console.log(res);
    }
  }
};
