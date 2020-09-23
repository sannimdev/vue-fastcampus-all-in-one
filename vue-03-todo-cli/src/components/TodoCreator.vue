<template>
  <div>
    <button @click="createTodo">
      <i class="material-icons">add</i>
    </button>
    <input
      type="text"
      :value="title"
      :placeholder="placeholder"
      @input="title = $event.target.value"
      @keypress.enter="createTodo"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      placeholder: "할일을 추가하세요🙂",
    };
  },
  methods: {
    createTodo() {
      //생성
      const validatedTitle = this.title.trim();
      if (!validatedTitle) {
        alert("유효하지 않은 제목입니다.");
        this.title = this.title.trim();
        return;
      }
      // this.$emit("create-todo", this.title); 이제 이벤트를 올릴 필요가 없이 저장소에 바로 접근이 가능하다
      this.$store.dispatch("todoApp/createTodo", this.title);
      this.title = "";

      this.$nextTick(() => {
        //렌더링되는 시간을 기다려준다.
        window.scrollTo(0, document.body.scrollHeight);
      });
    },
  },
};
</script>