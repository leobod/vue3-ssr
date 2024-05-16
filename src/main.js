import { /* createApp, */ createSSRApp } from "vue";
import "./style.css";
import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from "element-plus";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";

// createApp(App).mount('#app')

export const createApp = () => {
  const app = createSSRApp(App);
  app.provide(ID_INJECTION_KEY, {
    prefix: 1024,
    current: 0,
  });
  app.provide(ZINDEX_INJECTION_KEY, { current: 0 });
  app.use(ElementPlus);
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  return { app };
};
