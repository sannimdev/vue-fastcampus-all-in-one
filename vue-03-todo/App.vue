<template>
  <h1 class="red">{{ msg }}</h1>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello Vue.',
    };
  },
};
</script>

<style scoped>
h1 {
  color: blue;
}
</style>
