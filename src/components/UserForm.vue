<template>
  <div class="container">
    <form class="user__form" @submit.prevent="handeForm">
      <form-input
        :model-value="userInf.firstName"
        @update:model-value="setFirstName"
        :type="'text'"
        :label="'Firstname'"
        :error="{ bool: true, text: 'awdawdawd' }"
      />
      <form-input
        :model-value="userInf.lastName"
        @update:model-value="setLastName"
        :type="'text'"
        :label="'LastName'"
        :error="{ bool: true, text: 'awdawdawd' }"
      />
      <form-input
        :model-value="userInf.email"
        @update:model-value="setEamil"
        :type="'email'"
        :label="'Email'"
        :error="{ bool: true, text: 'awdawdawd' }"
      />
      <form-input
        :model-value="userInf.phoneNumber"
        @update:model-value="setPhoneNumber"
        :type="'text'"
        :label="'Phone number'"
        :error="{ bool: true, text: 'awdawdawd' }"
      />
      <div v-if="error.bool" class="error">
        {{ error ? error.text.join(" , ") : "" }}
      </div>
      <form-submit-btn :label="'Create user'" />
    </form>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  methods: {
    ...mapMutations({
      setFirstName: "users/setFirstName",
      setLastName: "users/setLastName",
      setEamil: "users/setEmail",
      setPhoneNumber: "users/setPhoneNumber",
    }),
    ...mapActions({
      createUser: "users/createUser",
      getUsers: "users/getUsers",
    }),
    handeForm() {
      this.createUser().then(() => this.getUsers());
    },
  },
  computed: {
    ...mapState({
      userInf: (state) => state.users.userInf,
      error: (state) => state.users.error,
    }),
  },
};
</script>
<style>
.container {
  display: flex;
}
.user__form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
}
</style>
