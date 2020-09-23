// // import { push } from 'core-js/fn/array';

// export default {
//   namespaced: true,
//   //Data 매칭되는 개념
//   state: () => ({
//     a: 123,
//     b: [1, 2, 3],
//   }),
//   //Computed
//   getters: {
//     someGetter1(state, getters) {
//       return state.a + 1;
//     },
//     someGetter2(state, getters) {
//       return state.a + getters.someGetter1;
//     },
//   },
//   mutations: {
//     someMutation(state, payload) {
//       state.a = 789;
//       state.b.push(payload);
//     },
//   },
//   actions: {
//     someAction1({ state, getters, commit, dispatch }, payload) {
//       //   state.a = 789; //error
//       //   state.b.push(payload); //error
//       commit('someMutation', payload);
//     },
//     someAction2(context, payload) {
//       context.commit('someMutation');
//       context.dispatch('someAction1', payload);
//     },
//   },
// };
