import Vue from 'vue';
import Vuex from 'vuex';
import todoApp from './todoApp';

Vue.use(Vuex);

export default new Vuex.Store({
  //strict: true, //배포 시에는 false, 개발 시에는 true
  strict: process.env.NODE_ENV !== 'production',
  //연습용 데이터. index.js에 들어 있는 actions 등의 요소는 namespace가 필요하지 않다.
  modules: {
    todoApp,
  },
  // //Data
  // state: {},
  // //Methods
  // //실제 값을 변경할 때 사용 (비동기 처리를 할 수 없음)
  // //state를 변경할 수 있는 권한이 mutations 이하에 주어진다.
  // mutations: {},
  // //Methods
  // //비동기를 포함한 일반 로직을 작성(비동기 O)
  // //actions에서는 state값을 직접 변경할 수가 없음.
  // actions: {},
});
