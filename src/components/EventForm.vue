<template>
  <div class="container">
    <form class="user__form" @submit.prevent="handeForm">
      <form-input
        :model-value="event.title"
        @update:model-value="setTitle"
        :label="'Title'"
      />
      <form-input
        :model-value="event.description"
        @update:model-value="setDescription"
        :label="'Description'"
      />
      <div class="input__cont">
        <label>Start date</label>
        <input
          :value="event.startDate"
          @input="startDateF"
          type="datetime-local"
        />
      </div>
      <div class="input__cont">
        <label>End date</label>
        <input :value="event.endDate" @input="endDateF" type="datetime-local" />
      </div>
      <div v-if="error.bool" class="error">
        {{ error ? error.text.join(" , ") : "" }}
      </div>
      <form-submit-btn :label="'Create event'" />
    </form>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  methods: {
    ...mapMutations({
      setTitle: "event/setTitle",
      setDescription: "event/setDescription",
      setStartDate: "event/setStartDate",
      setEndDate: "event/setEndDate",
    }),
    ...mapActions({
      getEvents: "event/getEvents",
      createEvent: "event/createEvent",
    }),
    handeForm() {
      this.createEvent().then(() => this.getEvents());
    },
    endDateF(e) {
      this.setEndDate(e.target.value);
    },
    startDateF(e) {
      this.setStartDate(e.target.value);
    },
  },
  computed: {
    ...mapState({
      event: (state) => state.event.event,
      error: (state) => state.event.error,
    }),
  },
  mounted() {
    this.getEvents();
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
.input__cont {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: 5px;
  color: rgb(125, 125, 125);
  border-bottom: 2px solid rgb(157, 155, 155);
}
.error {
  color: red;
}
</style>
