<template>
  <div class="todo-item">
    <input type="checkbox" v-model="done" @change="updateTodo" />
    <div class="item__title-wrap">
      <div class="item__title">{{todo.title}}</div>
      <div class="item__date">{{date}}</div>
    </div>
    <div class="item__actions">
      <button @click="onEditMode">수정</button>
      <button @click="deleteTodo">삭제</button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: {
    todo: Object,
  },
  computed: {
    done: {
      get() {
        //상태를 가지고 왔을 때
        return this.todo.done;
      },
      set(done) {
        //상태를 지정해 줬을 때 DB에 저장하는 코드 작성하기
        this.updateTodo({
          done,
        });
      },
    },
    date() {
      const date = dayjs(this.todo.createdAt);
      const isSame = date.isSame(this.todo.updatedAt);
      if (isSame) {
        return date.format("YYYY년 MM월 DD일");
      }
      return `${date.format("YYYY년 MM월 DD일")} (edited)`;
    },
  },
  methods: {
    onEditMode() {},
    offEditMode() {},
    updateTodo(value) {
      //이벤트명, 현재 todo객체, 어떠한 값이 업데이트될 것인지 값을 전달
      this.$emit("update-todo", this.todo, value);
    },
    deleteTodo() {
      this.$emit("delete-todo", this.todo);
    },
  },
};
</script>