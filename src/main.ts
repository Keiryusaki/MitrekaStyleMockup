import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import { useUi } from "./stores/ui";
import { AgGridVue } from "ag-grid-vue3";
import IconPlugin from "@/plugins/icon";
// import faviconUrl from "@/assets/favicon.png?url";

const app = createApp(App);
app.use(createPinia());
app.use(router);

// Register AG Grid globally
app.component("AgGridVue", AgGridVue);

// apply theme once on boot
const ui = useUi();
ui.applyTheme();

// function setFavicon(href: string, type = "image/png") {
//   let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
//   if (!link) {
//     link = document.createElement("link");
//     link.rel = "icon";
//     document.head.appendChild(link);
//   }
//   link.type = type;
//   link.href = href + `?v=${Date.now()}`; // bust cache
// }

// setFavicon(faviconUrl);

app.use(IconPlugin);

app.mount("#app");
