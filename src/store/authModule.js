import axios from "@/axios.js";
import router from "../router";
const authModule = {
  state: {
    regUser: { firstName: "", lastName: "", email: "", password: "" },
    loginUser: { email: "", password: "" },
    error: {
      bool: false,
      text: "",
    },
    isLoading: false,
    isAuth: false,
    token: "",
  },
  mutations: {
    setEmail(state, email) {
      state.regUser.email = email;
    },
    setPassword(state, password) {
      state.regUser.password = password;
    },
    setFirstName(state, firstName) {
      state.regUser.firstName = firstName;
    },
    setLastName(state, lastName) {
      state.regUser.lastName = lastName;
    },
    setLoginEmail(state, email) {
      state.loginUser.email = email;
    },
    setLoginPass(state, password) {
      state.loginUser.password = password;
    },
    setAuth(state, bool) {
      state.isAuth = bool;
    },
    setToken(state, token) {
      state.token = token;
    },
    setError(state, error) {
      state.error = error;
    },
    setLoading(state, bool) {
      state.isLoading = bool;
    },
  },
  actions: {
    async loginUser({ state, commit }) {
      try {
        commit("setLoading", true);
        const data = await axios.post("http://localhost:5000/auth/login", {
          email: state.loginUser.email,
          password: state.loginUser.password,
        });

        commit("setAuth", true);
        commit("setToken", data.data);
        router.push({ path: "/" });
        localStorage.setItem("token", data.data);
        localStorage.setItem("isAuth", state.isAuth);
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        if (error.response) {
          commit("setError", {
            bool: true,
            text: error.response.data,
          });
        }
      }
    },
    async registerUser({ state, commit }) {
      try {
        commit("setLoading", true);

        const data = await axios.post("http://localhost:5000/auth/signIn", {
          firstName: state.regUser.firstName,
          lastName: state.regUser.lastName,
          email: state.regUser.email,
          password: state.regUser.password,
        });
        console.log(data);
        commit("setAuth", true);
        commit("setToken", data.data);
        router.push({ path: "/" });
        localStorage.setItem("token", data.data);
        localStorage.setItem("isAuth", state.isAuth);
        commit("setError", {
          bool: false,
          text: "",
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
    logout({ commit }) {
      commit("setAuth", false);
      commit("setToken", "");
      localStorage.clear();
      router.push({ path: "/login" });
    },
  },

  namespaced: true,
};
export default authModule;
