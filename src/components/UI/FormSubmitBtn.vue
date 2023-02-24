<template lang="">
  <input class="input__submit" type="submit" :value="label" />
</template>
<script>
export default {
  name: "form-submit-btn",
  props: {
    label: [String],
  },
};
</script>
<style scoped>
.input__submit {
  background-color: rgba(255, 255, 255, 0);
  padding: 5px;
  align-self: center;
  width: 30%;
  font-size: 20px;
  width: 200px;
  color: rgb(125, 125, 125);
}
.input__submit:hover {
  border-bottom: 1px solid rgb(125, 125, 125);
}
</style>
