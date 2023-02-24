import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "@/components/UI";
const app = createApp(App);
app.use(router);
app.use(store);

components.forEach((component) => {
  app.component(component.name, component);
});

app.mount("#app");
