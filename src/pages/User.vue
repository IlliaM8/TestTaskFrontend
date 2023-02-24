<template>
  <div class="container">
    <div class="buttons">
      <my-button :label="'Back'" @click="$router.go(-1)" />
      <my-button :label="'Create event'" @click="modalVisible" />
      <my-button :label="'Log out'" @click="logout" />
    </div>
    <my-modal v-model:show="isVisible">
      <EventForm />
    </my-modal>
    <Table
      :columns="columns"
      :users="events"
      :type="'events'"
      :method="setEvents"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import EventForm from "@/components/EventForm.vue";
import Table from "@/components/Table.vue";

export default {
  components: {
    EventForm,
    Table,
  },
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    modalVisible() {
      this.isVisible = true;
    },

    ...mapActions({
      getEvents: "event/getEvents",
      createEvent: "event/createEvent",
      logout: "auth/logout",
    }),
    ...mapMutations({
      setId: "event/setId",
      setEvents: "event/setEvents",
      setTitle: "event/setTitle",
      setDescription: "event/setDescription",
      setStartDate: "event/setStartDate",
      setEndDate: "event/setEndDate",
    }),
  },
  computed: {
    ...mapState({
      columns: (state) => state.event.columns,
      events: (state) => state.event.events,
      error: (state) => state.event.error,
    }),
  },
  mounted() {
    this.getEvents();
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
  margin-bottom: 20px;
}
</style>
