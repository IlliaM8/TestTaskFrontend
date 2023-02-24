import axios from "@/axios.js";
import router from "@/router/index.js";
import { dateFormator } from "../utils/dateFormator";

const eventModule = {
  state: {
    columns: ["Title", "Description", "startDate", "endDate"],
    events: [],
    event: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
    },
    id: "",
    error: {
      bool: false,
      text: "",
    },
    isLoading: false,
  },
  mutations: {
    setEvents(state, events) {
      state.events = events;
    },
    setTitle(state, title) {
      state.event.title = title;
    },
    setDescription(state, description) {
      state.event.description = description;
    },
    setStartDate(state, startDate) {
      state.event.startDate = startDate;
    },
    setEndDate(state, endDate) {
      state.event.endDate = endDate;
    },
    setId(state, id) {
      state.id = id;
    },
    setError(state, error) {
      state.error = error;
    },
    setLoading(state, bool) {
      state.isLoading = bool;
    },
  },

  actions: {
    async getEvents({ state, rootState, commit, getters }) {
      try {
        commit("setLoading", true);
        const data = await axios.get(
          `/event/${router.currentRoute._value.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const events = data.data.map((obj) => {
          return [
            obj.title,
            obj.description,
            dateFormator(obj.startDate),
            dateFormator(obj.endDate),
            obj._id,
          ];
        });
        commit("setEvents", events);
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        }
      }
    },
    async createEvent({ state, commit }) {
      try {
        commit("setLoading", true);

        const data = await axios.post(
          `/event/${router.currentRoute._value.params.id}`,
          {
            title: state.event.title,
            description: state.event.description,
            startDate: Date.parse(state.event.startDate),
            endDate: Date.parse(state.event.endDate),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("setTitle", "");
        commit("setDescription", "");
        commit("setStartDate", "");
        commit("setEndDate", "");
        commit("setError", {
          bool: false,
          text: "Event created",
        });
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);

        if (error.response) {
          commit("setError", {
            bool: true,
            text: Object.values(error.response.data.errors).map(
              (obj) => obj.message
            ),
          });
        }
      }
    },
  },
  namespaced: true,
};
export default eventModule;
