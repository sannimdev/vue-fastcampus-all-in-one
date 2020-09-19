<template>
  <div>
    <RouterLink to="/" class="to-home">
      <i class="material-icons">home</i>
    </RouterLink>
    <RouterView />
  </div>
</template>

<script>
export default {
  created() {
    //라우터는 뷰 라우터에서 제공하는 정보를 나타냄 (세팅해 놓은 결괏값)
    console.log("router", this.$router);
    //라우트는
    console.log("route", this.$route);
  },
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap");

.router-link-exact-active {
  display: none;
}
</style>
