import { createStore } from "vuex";
import authModule from "./authModule";
import eventModule from "./eventModule";
import usersModule from "./usersModule";

export default createStore({
  modules: {
    auth: authModule,
    users: usersModule,
    event: eventModule,
  },
});
