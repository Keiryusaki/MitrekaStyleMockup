export type ToastType = "info" | "success" | "warning" | "error" | "primary";
export type ToastVariant = "soft" | "solid" | "outline";
export type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
export type ToastItem = {
    id: number;
    type: ToastType;
    variant?: ToastVariant;
    title?: string;
    message: string;
    timeout?: number;
};
export declare function useToast(): {
    toasts: import('vue').Ref<{
        id: number;
        type: ToastType;
        variant?: ToastVariant | undefined;
        title?: string | undefined;
        message: string;
        timeout?: number | undefined;
    }[], ToastItem[] | {
        id: number;
        type: ToastType;
        variant?: ToastVariant | undefined;
        title?: string | undefined;
        message: string;
        timeout?: number | undefined;
    }[]>;
    toastPosition: import('vue').Ref<ToastPosition, ToastPosition>;
    notify: (partial: Omit<ToastItem, "id">) => number;
    dismiss: (id: number) => void;
    clearToasts: () => void;
    setToastPosition: (position: ToastPosition) => void;
};
