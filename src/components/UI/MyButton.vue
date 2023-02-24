<template>
  <bytton class="button">{{ label }}</bytton>
</template>
<script>
export default {
  name: "my-button",
  props: {
    label: [String],
  },
};
</script>
<style scoped>
.button {
  text-align: center;
  background-color: rgb(183, 172, 172);
  padding-top: 5px;
  width: 150px;
  height: 30px;
  border-radius: 5px;
  transition: all 0.5s ease;
  cursor: pointer;
  color: black;
}
.button:hover {
  background-color: rgb(144, 135, 135);
}
.button:active {
  background-color: rgb(85, 79, 79);
}
</style>
