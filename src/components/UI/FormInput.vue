<template>
  <div class="form-input">
    <label for="">{{ label }}</label>
    <input type="text" :value="modelValue" @input="updateInput" class="input" />
  </div>
</template>
<script>
export default {
  name: "form-input",
  props: {
    modelValue: [String],
    label: { type: String, requred: true },
    error: { type: Object, requred: true },
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
<style scoped>
label {
  margin-bottom: 5px;
}
.form-input {
  color: rgb(125, 125, 125);
  display: flex;
  flex-direction: column;
}
.input {
  padding: 5px 5px 5px 0;
  color: rgb(125, 125, 125);
  border-bottom: 2px solid rgb(157, 155, 155);
}
.input:focus {
  border-bottom: 2px solid rgb(56, 56, 56);
}
.form-input__message {
  opacity: 0;
}
</style>
