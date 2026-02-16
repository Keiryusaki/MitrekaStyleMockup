import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
// Mitreka UI Library (local copy, load first so tailwind.css can override)
import "./lib/mitreka-ui/index.css";
import "./assets/tailwind.css";
import { useUi } from "./stores/ui";
import { AgGridVue } from "ag-grid-vue3";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import IconPlugin from "@/plugins/icon";
import { createLoadingPlugin } from "@/plugins/loading-plugin";
import { initThemeOverrideFromStorage } from "@/composables/themeBuilder";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(createLoadingPlugin({ router }));

app.component("AgGridVue", AgGridVue);
ModuleRegistry.registerModules([AllCommunityModule]);

const ui = useUi();
ui.applyTheme();
initThemeOverrideFromStorage();

app.use(IconPlugin);

app.mount("#app");
