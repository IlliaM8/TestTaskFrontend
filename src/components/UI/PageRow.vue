<template>
  <div class="page__box-row">
    <div
      class="page__box"
      :class="{ 'current-page': page === modelValue }"
      @click="update(page)"
      v-for="page in totalPages"
      :key="page"
    >
      {{ page }}
    </div>
  </div>
</template>
<script>
export default {
  name: "page-row",
  props: {
    modelValue: { type: Number },
    totalPages: { type: Number },
    updatePage: { type: Function },
  },
  methods: {
    update(page) {
      this.$emit("update:modelValue", page);
      this.updatePage();
    },
  },
};
</script>
<style>
.page__box-row {
  display: flex;
  gap: 10px;
}
.page__box {
  display: flex;
  justify-content: center;
  font-size: 16px;
  text-align: center;
  width: 23px;
  height: 23px;
  border: 1px solid rgb(180, 180, 180);
  cursor: pointer;
}
.current-page {
  border: 2px solid rgb(0, 0, 0);

  background-color: rgb(180, 180, 180);
}
</style>
