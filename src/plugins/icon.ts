import { App } from "vue";
import { Icon } from "@/composables/Icon";

export default {
  install(app: App) {
    app.component("Icon", Icon);
  },
};
