import Vue from 'vue';
import cryptoRandomString from 'crypto-random-string';
import lowdb from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import _find from 'lodash/find';
import _assign from 'lodash/assign';
import _cloneDeep from 'lodash/cloneDeep';
import _findIndex from 'lodash/findIndex';
import _forEachRight from 'lodash/forEachRight';

export default {
  namespaced: true, //독립적으로 관리하기 위함
  state: () => ({
    db: null,
    todos: [],
    filter: 'all',
  }), //arrow function 문법으로 작성 //state도 data와 마찬가지로 함수여야 한다.
  getters: {
    filteredTodos(state) {
      console.log('filteredTodos 호출');
      switch (state.filter) {
        case 'all':
        default:
          return state.todos;
        case 'active':
          return state.todos.filter((todo) => !todo.done);
        case 'completed':
          return state.todos.filter((todo) => todo.done);
      }
    },
    total(state) {
      return state.todos.length;
    },
    activeCount(state) {
      return state.todos.filter((todo) => !todo.done).length;
    },
    completedCount(state, getters) {
      return getters.total - getters.activeCount;
    },
  },
  mutations: {
    //궁극적인 데이터 변경은 가능하나 비동기 로직 처리는 불가능함
    assignDB(state, db) {
      //state로 바로 접근할 수 있도록 첫 번째 인수로 받음
      state.db = db;
    },
    createDB(state, newTodo) {
      //get과 push는 lodash에서 제공하는 메서드
      //write는 lowdb에서 제공하는 메서드로 실제 db에 변경사항을 반영하고자 한다면 꼭 호출해야
      state.db
        .get('todos')
        .push(newTodo)
        .write();
    },
    updateDB(state, { todo, value }) {
      state.db
        .get('todos')
        .find({ id: todo.id })
        .assign(value);
    },
    deleteDB(state, todo) {
      state.db
        .get('todos')
        .remove({
          id: todo.id,
        })
        .write();
    },
    assignTodos(state, todos) {
      state.todos = todos;
    },
    pushTodo(state, newTodo) {
      state.todos.push(newTodo);
    },
    assignTodo(state, { foundTodo, value }) {
      _assign(foundTodo, value);
    },
    deleteTodo(state, foundIndex) {
      Vue.delete(state.todos, foundIndex);
    },
    updateTodo(state, { todo, key, value }) {
      todo[key] = value;
    },
    updateFilter(state, filter) {
      state.filter = filter;
    },
  },
  actions: {
    //actions는 일반적인 logic을 처리할 수 있으나 데이터 변경이 불가능함 (=> mutations를 경유해야 함.)
    initDB({ state, commit }) {
      //첫 번째로 담고 있는 context 인수는  state, getters, mutations, actions를 담고 있음
      const adapter = new LocalStorage('todo-app'); //DB 이름
      //db와 어댑터 연결
      commit('assignDB', lowdb(adapter));
      const hasTodos = state.db.has('todos').value();

      if (hasTodos) {
        //DB의 모든 내용을 복사 (Deep)
        commit('assignTodos', _cloneDeep(state.db.getState().todos));
      } else {
        //LocalDB 초기화
        state.db
          .defaults({
            todos: [], //Collection
          })
          .write();
      }
    },
    createTodo({ commit }, title) {
      const newTodo = {
        id: cryptoRandomString({ length: 10 }),
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
        done: false,
      };

      //Create DB
      commit('createDB', newTodo);

      //Create Client
      commit('pushTodo', newTodo);
    },
    updateTodo({ state, commit }, { todo, value }) {
      //Update DB
      commit('updateDB', { todo, value });
      const foundTodo = _find(state.todos, { id: todo.id });
      commit('assignTodo', { foundTodo, value });
    },
    deleteTodo({ state, commit }, todo) {
      //DB에서 삭제
      commit('deleteDB', todo);
      //lodash의 remove는 반응성을 가지지 못한다.
      // _remove(state.todos, { id: todo.id });

      //Index값을 찾은 후 이를 바탕으로 원소 지우기
      const foundIndex = _findIndex(state.todos, { id: todo.id });
      //Vue를 이용한 delete메서드와 this.$delete메서드와는 같다.
      //Delete Client
      commit('deleteTodo', foundIndex);
    },
    completeAll({ state, commit }, checked) {
      //DB commit에서는 반환값을 받아낼 수가 없는 구조이다.
      // 따라서 newTodos를 통해서 새로운 값을 알아내지 못하므로 commit으로 이관하는 작업을 온전히 수행할 수가 없다.
      const newTodos = state.db
        .get('todos')
        .forEach((todo) => {
          //그래서 이쪽 부분만 mutation으로 이관해야 하는 작업을 수행해야 한다.
          commit('updateTodo', {
            todo,
            key: 'done',
            value: checked,
          });
        })
        .write();
      // actions에서는 직접 데이터를 수정하는 작업을 수행할 수 없다.
      // state.todos = _cloneDeep(newTodos);
      commit('assignTodos', _cloneDeep(newTodos));
    },
    clearCompleted({ state, dispatch }) {
      _forEachRight(state.todos, (todo) => {
        if (todo.done) {
          dispatch.deleteTodo(todo);
        }
      });
    },
  },
};
