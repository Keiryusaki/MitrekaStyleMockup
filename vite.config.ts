import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@keiryusaki/mitreka-ui/vue": path.resolve(
        __dirname,
        "./src/lib/mitreka-ui/vue/index.ts"
      ),
      "@keiryusaki/mitreka-ui/composables": path.resolve(
        __dirname,
        "./src/composables/mitreka-ui.ts"
      ),
    },
    dedupe: ["ag-grid-community", "ag-grid-vue3"],
  },
  base: "/MitrekaStyleMockup/",
});
