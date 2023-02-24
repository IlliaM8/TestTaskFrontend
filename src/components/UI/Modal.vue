<template>
  <div class="modal" v-if="show" @click="closeModal">
    <div @click.stop class="modal__content"><slot></slot></div>
  </div>
</template>
<script>
export default {
  name: "my-modal",
  props: {
    show: {
      type: Boolean,
      default: false,
      requred: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("update:show", false);
    },
  },
};
</script>
<style>
.modal {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.226);
  position: fixed;
  display: flex;
  z-index: 1000000;
}
.modal__content {
  margin: auto;
  background-color: rgb(255, 255, 255);
  border-radius: 12px;
  padding: 20px;
}
</style>
