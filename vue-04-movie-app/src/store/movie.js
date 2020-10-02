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
    },
    pushIntoMovies(state, movies) {
      state.movies.push(...movies);
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
        `http://www.omdbapi.com/?apikey=e2472a39&s=${state.title}&page=1`
      );
      commit('updateState', {
        movies: res.data.Search
      });
      const pageLength = Math.ceil(res.data.totalResults / 10);
      if (pageLength > 1) {
        //더 가지고 올 아이템이 존재
        for (let i = 2; i <= pageLength; i++) {
          if (i > 4) break; //최대 40개까지의 아이템만 가져오기
          const resMore = await axios.get(
            `http://www.omdbapi.com/?apikey=e2472a39&s=${state.title}&page=${i}`
          );
          commit('pushIntoMovies', resMore.data.Search);
        }
      }
      commit('updateState', {
        loading: false
      });
    }
  }
};
