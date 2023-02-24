<template lang="">
  <div class="container">
    <form class="login__form" @submit.prevent="loginUser">
      <my-loader v-if="isLoading" />

      <form-input
        :model-value="user.email"
        @update:model-value="setLoginEmail"
        :label="'Email'"
      />
      <form-input
        :model-value="user.password"
        @update:model-value="setLoginPass"
        :label="'Password'"
      />
      <div v-if="error.bool" class="error">
        {{ error.text }}
      </div>
      <form-submit-btn :label="'Login'" />
      <div className="link">
        <p>If you don't have accaunt</p>
        <router-link @click="setError({ bool: false, text: '' })" to="/register"
          >Register</router-link
        >
      </div>
    </form>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations({
      setLoginEmail: "auth/setLoginEmail",
      setLoginPass: "auth/setLoginPass",
      setError: "auth/setError",
    }),
    ...mapActions({
      loginUser: "auth/loginUser",
    }),
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.loginUser,
      error: (state) => state.auth.error,
      isLoading: (state) => state.auth.isLoading,
    }),
  },
};
</script>
<style scoped>
.container {
  display: flex;
}
.login__form {
  display: flex;
  position: relative;

  flex-direction: column;
  justify-content: center;
  width: 400px;
  margin: 100px auto 0 auto;
}
.link {
  display: flex;
  gap: 5px;
  margin-top: 10px;
}
.error {
  color: red;
}
</style>
