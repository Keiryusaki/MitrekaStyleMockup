import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";

// Mitreka UI Library
import "@keiryusaki/mitreka-ui/css";
import { useUi } from "./stores/ui";
import { AgGridVue } from "ag-grid-vue3";
import IconPlugin from "@/plugins/icon";
import { createLoadingPlugin } from "@/plugins/loading-plugin";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(createLoadingPlugin({ router }));

app.component("AgGridVue", AgGridVue);

const ui = useUi();
ui.applyTheme();

app.use(IconPlugin);

app.mount("#app");
