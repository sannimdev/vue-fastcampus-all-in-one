<template>
  <div>
    <RouterLink to="/" class="to-home">
      <i class="material-icons">home</i>
    </RouterLink>
    <RouterView />
  </div>
</template>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap");

.router-link-exact-active {
  display: none;
}
</style>
