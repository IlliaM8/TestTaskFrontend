<template lang="">
  <div class="container">
    <form class="reg__form" @submit.prevent="registUser">
      <my-loader v-if="isLoading" />
      <form-input
        :model-value="regUser.lastName"
        @update:model-value="setLastName"
        :label="'Lastname'"
      />
      <form-input
        v-model="regUser.firstName"
        @update:model-value="setFirstName"
        :type="'text'"
        :label="'Firstname'"
      />
      <form-input
        :model-value="regUser.email"
        @update:model-value="setEmail"
        :label="'Email'"
      />
      <form-input
        :model-value="regUser.password"
        @update:model-value="setPassword"
        :label="'Password'"
      />
      <div v-if="error.bool" class="error">
        {{ error ? error.text.join(" , ") : "" }}
      </div>
      <form-submit-btn :label="'Register'" />
      <div className="link">
        <p>If you have accaunt</p>
        <router-link @click="setError({ bool: false, text: '' })" to="/login"
          >Login</router-link
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
      setEmail: "auth/setEmail",
      setPassword: "auth/setPassword",
      setFirstName: "auth/setFirstName",
      setLastName: "auth/setLastName",
      setError: "auth/setError",
    }),
    ...mapActions({
      registUser: "auth/registerUser",
    }),
    async login() {
      this.loginUser();
    },
  },
  computed: {
    ...mapState({
      regUser: (state) => state.auth.regUser,
      error: (state) => state.auth.error,
      isLoading: (state) => state.auth.isLoading,
    }),
  },
};
</script>
<style>
.container {
  display: flex;
}
.reg__form {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  margin: 100px auto 0 auto;
}
.link {
  display: flex;
  margin-top: 10px;
  gap: 5px;
}
</style>
