// plugins/loading-plugin.ts
import type { App } from "vue";
import type { Router } from "vue-router";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { useLoadingStore } from "@/stores/loading";
import { watch } from "vue"; // <-- ini yang benar

declare module "axios" {
  export interface AxiosRequestConfig {
    meta?: { skipLoading?: boolean; loadingMessage?: string };
  }
}

export function createLoadingPlugin(
  opts: {
    router?: Router;
    axios?: AxiosInstance;
    appRootSelector?: string;
  } = {}
) {
  const ax = opts.axios ?? axios;
  const appRootSel = opts.appRootSelector ?? "#app";

  return {
    install(_app: App) {
      const store = useLoadingStore();

      const toggleUiLock = (active: boolean) => {
        if (typeof window === "undefined") return;
        const root = document.querySelector(appRootSel) as HTMLElement | null;
        if (root) (root as any).inert = active;
        document.documentElement.classList.toggle("overflow-hidden", active);
      };

      // ⬇️ pakai watch dari 'vue'
      watch(
        () => store.visible,
        (val) => toggleUiLock(val),
        { immediate: true }
      );

      if (opts.router) {
        opts.router.beforeEach((_to, _from, next) => {
          store.startNav();
          next();
        });
        opts.router.afterEach(() => {
          setTimeout(() => store.stopNav(), 1500);
        });
      }

      ax.interceptors.request.use((config: AxiosRequestConfig) => {
        if (!config.meta?.skipLoading) store.start(config.meta?.loadingMessage);
        return config;
      });
      ax.interceptors.response.use(
        (resp) => {
          if (!resp.config.meta?.skipLoading) store.stop();
          return resp;
        },
        (error) => {
          const cfg: AxiosRequestConfig | undefined = error.config;
          if (!cfg?.meta?.skipLoading) store.stop();
          return Promise.reject(error);
        }
      );
    },
  };
}
