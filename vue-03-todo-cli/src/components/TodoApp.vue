<template>
  <div>
    <TodoItem />
    <TodoCreator />
  </div>
</template>

<script>
import TodoCreator from "./TodoCreator";
import TodoItem from "./TodoItem";
export default {
  components: {
    TodoCreator,
    TodoItem,
  },
};
</script>
