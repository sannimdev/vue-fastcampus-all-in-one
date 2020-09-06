<template>
  <h1>{{ msg }}</h1>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello Vue.',
    };
  },
};
</script>

<style scoped lang="scss">
$color: red;
$size: 30px;
h1 {
  color: $color;
  size: $size;
  display: flex;
}
</style>
