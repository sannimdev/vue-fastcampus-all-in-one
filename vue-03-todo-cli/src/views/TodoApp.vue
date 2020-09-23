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
      <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo" />
    </div>
    <TodoCreator class="todo-app__creator" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import scrollTo from "scroll-to";
import TodoCreator from "@/components/TodoCreator";
import TodoItem from "@/components/TodoItem";

export default {
  components: {
    TodoCreator,
    TodoItem,
  },
  computed: {
    // mapState, mapGetters를 Helpers라고 부른다.
    ...mapState("todoApp", ["todos"]),
    ...mapGetters("todoApp", [
      "filteredTodos",
      "total",
      "activeCount",
      "completedCount",
    ]),
    allDone: {
      get() {
        return this.total === this.completedCount && this.total > 0;
      },
      set(checked) {
        this.completeAll(checked);
      },
    },
  },
  watch: {
    //watch는 특정한 데이터의 변경을 살피다가 감지되면 실행하는 것
    $route() {
      // $route의 값이 변경되면 다음의 작업 수행
      // state.filter = this.$route.params.id; state의 직접적인 변경은 허용되지 않아서 mutations의 도움을 받아야 한다.
      // this.$store.commit("updateFilter", this.$route.params.id);
      this.updateFilter(this.$route.params.id);
    },
  },
  created() {
    this.initDB();
  },
  methods: {
    ...mapMutations("todoApp", ["updateFilter"]),
    ...mapActions("todoApp", ["initDB", "completeAll", "clearCompleted"]),
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
