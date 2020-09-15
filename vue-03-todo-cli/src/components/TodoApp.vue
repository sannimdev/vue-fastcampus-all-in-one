<template>
  <div class="todo-app">
    <div class="todo-app__actions">
      <div class="filters">
        <button :class="{ active: filter === 'all' }" @click="changeFilter('all')">모든 항목 ({{total}})</button>
        <button
          :class="{ active: filter === 'active' }"
          @click="changeFilter('active')"
        >해야 할 항목({{activeCount}})</button>
        <button
          :class="{ active: filter === 'completed' }"
          @click="changeFilter('completed')"
        >완료된 항목({{completedCount}})</button>
      </div>
      <div class="actions clearfix">
        <div class="float--left">
          <label>
            <input type="checkbox" v-model="allDone" />
            <span class="icon">
              <i class="material-icons">done_all</i>
            </span>
          </label>
        </div>
        <div class="float--right clearfix">
          <button class="btn float--left" @click="scrollToTop">
            <i class="material-icons">expand_less</i>
          </button>
          <button class="btn float--left" @click="scrollToBottom">
            <i class="material-icons">expand_more</i>
          </button>
          <button class="btn btn--danger float--left" @click="clearCompleted">
            <i class="material-icons">delete_sweep</i>
          </button>
        </div>
      </div>
    </div>
    <div class="todo-app__list">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @update-todo="updateTodo"
        @delete-todo="deleteTodo"
      />
    </div>
    <TodoCreator class="todo-app__creator" @create-todo="createTodo" />
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
import _forEachRight from "lodash/forEachRight";
import scrollTo from "scroll-to";
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
      filter: "all",
    };
  },
  computed: {
    filteredTodos() {
      console.log("filteredTodos 호출");
      switch (this.filter) {
        case "all":
        default:
          return this.todos;
        case "active":
          return this.todos.filter((todo) => !todo.done);
        case "completed":
          return this.todos.filter((todo) => todo.done);
      }
    },
    total() {
      return this.todos.length;
    },
    activeCount() {
      return this.todos.filter((todo) => !todo.done).length;
    },
    completedCount() {
      return this.total - this.activeCount;
    },
    allDone: {
      get() {
        return this.total === this.completedCount && this.total > 0;
      },
      set(checked) {
        this.completeAll(checked);
      },
    },
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
    changeFilter(filter) {
      console.log("changeFilter 호출", filter);
      this.filter = filter;
    },
    completeAll(checked) {
      //DB
      const newTodos = this.db
        .get("todos")
        .forEach((todo) => {
          todo.done = checked;
        })
        .write();
      //Local Todos
      // this.todos.forEach((todo) => (todo.done = checked));
      this.todos = _cloneDeep(newTodos);
    },
    clearCompleted() {
      //DB에 반영
      //배열을 삭제할 때 앞에서부터 삭제하면 당겨지므로 정상적으로 원하는 아이템을 삭제할 수 없을 수도 있다.
      //따라서 맨 뒤에서부터 삭제한다면 원활하게 삭제를 할 수 있겠지? (오.....)
      // this.todos.forEach((todo) => {
      //   if (todo.done) {
      //     this.deleteTodo(todo);
      //   }
      // });

      //#1. Native (Reduce with reverse)
      //TODO: Reduce 복습하기
      // this.todos
      //   .reduce((list, todo, index) => {
      //     if (todo.done) {
      //       list.push(index); //지워야 하는 index값만 보관하고 지우고자 함.
      //     }
      //     return list;
      //   }, [])
      //   .reverse()
      //   .forEach((index) => {
      //     this.deleteTodo(this.todos[index]);
      //   });

      //#2. lodash
      _forEachRight(this.todos, (todo) => {
        if (todo.done) {
          this.deleteTodo(todo);
        }
      });
    },
    scrollToTop() {
      scrollTo(0, 0, {
        ease: "linear",
      });
    },
    scrollToBottom() {
      scrollTo(0, document.body.scrollHeight, {
        ease: "linear",
      });
    },
  },
};
</script>

<style lang="scss">
@import "../scss/style"; /*SCSS Partials*/
</style>