import axios from "@/axios.js";
import { dateFormator } from "../utils/dateFormator";

const usersModule = {
  state: {
    users: [],
    columns: [
      "UserName",
      "Email",
      "PhoneNumber",
      "EventsCount",
      "NextEventDate",
    ],
    userInf: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
    limit: 10,
    totalPages: 1,
    currentPage: 1,
    isLoading: false,
    error: {
      bool: false,
      text: "",
    },
  },

  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setFirstName(state, firstName) {
      state.userInf.firstName = firstName;
    },
    setLastName(state, lastName) {
      state.userInf.lastName = lastName;
    },
    setEmail(state, email) {
      state.userInf.email = email;
    },
    setPhoneNumber(state, phoneNumber) {
      state.userInf.phoneNumber = phoneNumber;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;
    },
    setLoading(state, bool) {
      state.isLoading = bool;
    },
    setError(state, error) {
      state.error = error;
    },
  },

  actions: {
    async getUsers({ state, commit, rootState }) {
      try {
        commit("setLoading", true);

        const data = await axios.get(
          `/user/${state.currentPage}/${state.limit}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const arr = data.data.users.map((obj) => {
          return [
            `${obj.firstName} ${obj.lastName}`,
            obj.email,
            obj.phoneNumber,
            obj.event.length,
            obj.nextEventDate ? dateFormator(obj.nextEventDate) : "",
            obj._id,
          ];
        });
        commit("setTotalPages", Math.ceil(data.data.numOfUsers / state.limit));
        commit("setUsers", arr);
        commit("setLoading", false);
      } catch (e) {
        commit("setLoading", false);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        }
      }
    },
    async createUser({ state, commit, rootState }) {
      try {
        commit("setLoading", true);

        await axios.post(
          "/user",
          {
            firstName: state.userInf.firstName,
            lastName: state.userInf.lastName,
            email: state.userInf.email,
            phoneNumber: state.userInf.phoneNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        console.log(error);
        if (error.response) {
          console.log(error);

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
export default usersModule;
