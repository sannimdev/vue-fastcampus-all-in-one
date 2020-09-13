<template>
  <div>
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @update-todo="updateTodo"
      @delete-todo="deleteTodo"
    />
    <hr />
    <TodoCreator @create-todo="createTodo" />
  </div>
</template>

<script>
import lowdb from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";
import cryptoRandomString from "crypto-random-string";
import _cloneDeep from "lodash/cloneDeep";
import _find from "lodash/find";
import _assign from "lodash/assign";
// import _remove from "lodash/remove";
import _findIndex from "lodash/findIndex";
import TodoCreator from "./TodoCreator";
import TodoItem from "./TodoItem";

export default {
  components: {
    TodoCreator,
    TodoItem,
  },
  data() {
    return {
      db: null,
      todos: [],
    };
  },
  created() {
    this.initDB();
  },
  methods: {
    initDB() {
      const adapter = new LocalStorage("todo-app"); //DB 이름
      //db와 어댑터 연결
      this.db = lowdb(adapter); //?

      const hasTodos = this.db.has("todos").value();

      if (hasTodos) {
        //DB의 모든 내용을 복사 (Deep)
        this.todos = _cloneDeep(this.db.getState().todos);
      } else {
        //LocalDB 초기화
        this.db
          .defaults({
            todos: [], //Collection
          })
          .write();
      }
    },
    createTodo(title) {
      const newTodo = {
        id: cryptoRandomString({ length: 10 }),
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
        done: false,
      };

      //get과 push는 lodash에서 제공하는 메서드
      //write는 lowdb에서 제공하는 메서드로 실제 db에 변경사항을 반영하고자 한다면 꼭 호출해야
      this.db.get("todos").push(newTodo).write();

      //Create Client
      this.todos.push(newTodo);
    },
    updateTodo(todo, value) {
      this.db.get("todos").find({ id: todo.id }).assign(value).write();

      const foundTodo = _find(this.todos, { id: todo.id });
      _assign(foundTodo, value);
    },
    deleteTodo(todo) {
      //DB에서 삭제
      this.db.get("todos").remove({ id: todo.id }).write();

      //lodash의 remove는 반응성을 가지지 못한다.
      // _remove(this.todos, { id: todo.id });

      //Index값을 찾은 후 이를 바탕으로 원소 지우기
      const foundIndex = _findIndex(this.todos, { id: todo.id });
      this.$delete(this.todos, foundIndex);
    },
  },
};
</script>
