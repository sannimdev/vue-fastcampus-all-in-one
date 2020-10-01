import axios from 'axios';

export default {
  namespaced: true,
  state: () => ({
    title: '',
    loading: false,
    movies: []
  }),
  //mutation***s***, action***s***
  mutations: {
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
        loading: true,
        movies: [] //초기화
      });
      const res = await axios.get(
        `http://www.omdbapi.com/?apikey=e2472a39&s=${state.title}`
      );
      commit('updateState', {
        movies: res.data.Search,
        loading: false
      });
      console.log(res);
    }
  }
};
