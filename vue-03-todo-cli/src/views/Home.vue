<template>
  <section class="home">
    <div>
      <h1>Homepage</h1>
      <!-- 방법#1. $router.push 이용하기 -->
      <h2 @click="$router.push('/about')">About</h2>
      <!-- 방법#2. router-link 이용하기 -->
      <!-- 이렇게도 설정할 수 있음. React의 JSX의 Link 정도? -->
      <router-link to="/todos" tag="h2">TodoApp</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',

  methods: {
    // in JS code
    // toTodoApp() {
    //   this.$router.push('/todos');
    // },
  },
};
</script>
