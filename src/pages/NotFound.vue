<template>
  <div class="container">
    <div class="content">
      <img src="@/assets/sad_smile.png" alt="" />
      <h1>404</h1>
      <h2>Page not found</h2>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.container {
  widows: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  color: rgb(157, 155, 155);
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  font-size: 30px;
  gap: 10px;
}
img {
  width: 350px;
}
</style>
