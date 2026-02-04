import { ref } from "vue";

export type ToastType = "info" | "success" | "warning" | "error" | "primary";
export type ToastVariant = "soft" | "solid" | "outline";
export type ToastItem = {
  id: number;
  type: ToastType;
  variant?: ToastVariant;
  title?: string;
  message: string;
  timeout?: number;
};

const toasts = ref<ToastItem[]>([]);
const position = ref("bottom-right");
let counter = 1;

const dismiss = (id: number) => {
  toasts.value = toasts.value.filter((t) => t.id !== id);
};

const notify = (toast: Omit<ToastItem, "id">) => {
  const item: ToastItem = {
    id: counter++,
    variant: "soft",
    timeout: 3000,
    ...toast,
  };
  toasts.value.push(item);
  if (item.timeout && item.timeout > 0) {
    setTimeout(() => dismiss(item.id), item.timeout);
  }
  return item.id;
};

const clearToasts = () => {
  toasts.value = [];
};

const setToastPosition = (pos: string) => {
  position.value = pos;
};

export const useToast = () => ({
  toasts,
  position,
  notify,
  dismiss,
  clearToasts,
  setToastPosition,
});
