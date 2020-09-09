<template>
  <div>
    <TodoItem />
    <TodoCreator />
  </div>
</template>

<script>
import lowdb from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";
import cryptoRandomString from "crypto-random-string";

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
      //Local DB 초기화
      this.db
        .defaults({
          todos: [], //Collection
        })
        .write();
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
    },
  },
};
</script>
