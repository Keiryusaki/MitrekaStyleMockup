import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import { useUi } from "./stores/ui";
import { AgGridVue } from "ag-grid-vue3";

const app = createApp(App);
app.use(createPinia());
app.use(router);

// Register AG Grid globally
app.component("AgGridVue", AgGridVue);

// apply theme once on boot
const ui = useUi();
ui.applyTheme();

app.mount("#app");
