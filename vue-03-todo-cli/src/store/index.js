import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  //   strict: true, //배포 시에는 false, 개발 시에는 true
  strict: process.env.NODE_ENV !== 'production',
});
