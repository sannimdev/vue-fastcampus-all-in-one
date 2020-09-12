<template>
  <div class="todo-item">
    <div v-if="isEditMode" class="item__inner item--edit">
      <input
        ref="titleInput"
        type="text"
        :value="editedTitle"
        @input="editedTitle = $event.target.value"
        @keypress.enter="editedTodo"
        @keypress.esc="offEditMode"
      />
      <div class="item__actions">
        <button key="complete" @click="editedTodo">완료</button>
        <button key="cancel" @click="offEditMode">취소</button>
      </div>
    </div>
    <div v-if="!isEditMode" class="item__inner item--normal">
      <input type="checkbox" v-model="done" @change="updateTodo" />
      <div class="item__title-wrap">
        <div class="item__title">{{todo.title}}</div>
        <div class="item__date">{{date}}</div>
      </div>
      <div class="item__actions">
        <!-- 돔이 갱신될 때 button의 구조가 같다면 완료를 수정버튼으로 인식할 수 있는 등의 불상사 발생
        DOM을 매번 갱신하면 성능효율이 떨어지므로 선택한 것으로 뷰에 다른 요소의 버튼이라는 것을 인식시켜줘야 한다.
        key속성을 이용하여 식별할 수 있도록 한다.-->
        <button key="update" @click="onEditMode">수정</button>
        <button key="delete" @click="deleteTodo">삭제</button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: {
    todo: Object,
  },
  data() {
    return {
      isEditMode: false,
      editedTitle: "", //취소될 상황을 염두
    };
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
    editedTodo() {
      if (this.todo.title !== this.editedTitle) {
        //수정 완료되면 DB 업데이트
        this.updateTodo({
          title: this.editedTitle,
          updatedAt: new Date(),
        });
        this.offEditMode();
      }
    },
    onEditMode() {
      this.isEditMode = true;
      this.editedTitle = this.todo.title;
      //데이터가 바뀌긴 했지만 이것이 렌더링이 완료됐다는 것을 의미하지는 않는다.
      //그렇기 때문에 Vue에서 제공하는 Vue.nextTick 함수를 이용하는 것을 생각해 볼 수 있다.
      //https://kr.vuejs.org/v2/api/index.html#Vue-nextTick
      this.$nextTick(() => {
        this.$refs.titleInput.focus();
      });
    },
    offEditMode() {
      this.isEditMode = false;
    },
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