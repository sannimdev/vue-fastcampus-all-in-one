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
    fetchMovies({ state, commit }, pageNum) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async resolve => {
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=e2472a39&s=${state.title}&page=${pageNum}`
        );
        commit('pushIntoMovies', res.data.Search);
        resolve(res.data);
      });
    },
    async searchMovies({ commit, dispatch }) {
      commit('updateState', {
        loading: true,
        movies: [] //초기화
      });
      const { totalResults } = await dispatch('fetchMovies', 1);
      const pageLength = Math.ceil(totalResults / 10);
      if (pageLength > 1) {
        //더 가지고 올 아이템이 존재
        for (let i = 2; i <= pageLength; i++) {
          if (i > 4) break; //최대 40개까지의 아이템만 가져오기
          await dispatch('fetchMovies', i);
        }
      }
      commit('updateState', {
        loading: false
      });
    }
  }
};
