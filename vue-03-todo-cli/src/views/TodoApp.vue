<template>
  <div class="todo-app">
    <div class="todo-app__actions">
      <div class="filters">
        <RouterLink to="/todos/all" tag="button">모든 항목 ({{ total }})</RouterLink>
        <RouterLink to="/todos/active" tag="button">해야 할 항목({{ activeCount }})</RouterLink>
        <RouterLink to="/todos/completed" tag="button">완료된 항목({{ completedCount }})</RouterLink>
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
import scrollTo from "scroll-to";
import TodoCreator from "@/components/TodoCreator";
import TodoItem from "@/components/TodoItem";

export default {
  components: {
    TodoCreator,
    TodoItem,
  },
  computed: {
    filteredTodos() {
      console.log("filteredTodos 호출");
      switch (this.$route.params.id) {
        case "all":
        default:
          return this.todos;
        case "active":
          return this.todos.filter((todo) => !todo.done);
        case "completed":
          return this.todos.filter((todo) => todo.done);
      }
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
@import "scss/style"; /*SCSS Partials*/

.filters button.router-link-active {
  background: royalblue;
  color: white;
}
</style>
