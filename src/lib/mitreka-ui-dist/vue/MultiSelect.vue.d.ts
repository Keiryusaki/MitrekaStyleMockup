import { SelectOption } from '../composables/useSelect';

type Size = "xs" | "sm" | "md" | "lg" | "xl";
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    modelValue: Array<string | number>;
    options?: SelectOption[];
    fetchOptions?: (q: string) => Promise<SelectOption[]>;
    debounceMs?: number;
    placeholder?: string;
    disabled?: boolean;
    size?: Size;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    change: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    modelValue: Array<string | number>;
    options?: SelectOption[];
    fetchOptions?: (q: string) => Promise<SelectOption[]>;
    debounceMs?: number;
    placeholder?: string;
    disabled?: boolean;
    size?: Size;
}>>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
