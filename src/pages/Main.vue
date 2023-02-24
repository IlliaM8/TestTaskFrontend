<template>
  <div class="container">
    <div class="buttons">
      <my-button :label="'Back'" @click="$router.go(-1)" />
      <my-button :label="'Create user'" @click="modalVisible" />
      <my-button :label="'Log out'" @click="logout" />
    </div>

    <my-modal v-model:show="isVisible"><UserForm /></my-modal>
    <Table
      :columns="columns"
      :users="users"
      :type="'users'"
      :method="setUsers"
    />
    <page-row
      @update:model-value="setCurrentPage"
      :updatePage="getUsers"
      :model-value="currentPage"
      :totalPages="totalPages"
    />
  </div>
</template>
<script>
import UserForm from "@/components/UserForm.vue";
import Table from "@/components/Table.vue";

import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: { UserForm, Table },
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setUsers: "users/setUsers",
      setCurrentPage: "users/setCurrentPage",
    }),
    ...mapActions({
      getUsers: "users/getUsers",
      logout: "auth/logout",
    }),
    modalVisible() {
      this.isVisible = true;
      this.setFirstName = "";
      this.setLastName = "";
      this.setEamil = "";
      this.setPhoneNumber = "";
    },
    updateTable() {
      this.setCurrentPage();
    },
  },
  computed: {
    ...mapState({
      users: (state) => state.users.users,
      columns: (state) => state.users.columns,
      totalPages: (state) => state.users.totalPages,
      currentPage: (state) => state.users.currentPage,
    }),
  },
  mounted() {
    this.getUsers();
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  padding: 30px;
}
.buttons {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}
</style>
