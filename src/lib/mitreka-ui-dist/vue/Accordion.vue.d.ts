interface Props {
    modelValue?: string | string[] | null;
    multiple?: boolean;
    variant?: 'default' | 'bordered' | 'ghost';
}
declare function toggleItem(id: string): void;
declare function __VLS_template(): {
    default?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    modelValue: null;
    multiple: boolean;
    variant: string;
}>>, {
    openItems: import('vue').Ref<Set<string> & Omit<Set<string>, keyof Set<any>>, Set<string> | (Set<string> & Omit<Set<string>, keyof Set<any>>)>;
    toggleItem: typeof toggleItem;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: string | string[] | null) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    modelValue: null;
    multiple: boolean;
    variant: string;
}>>> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | string[] | null) => any) | undefined;
}>, {
    modelValue: string | string[] | null;
    multiple: boolean;
    variant: "default" | "bordered" | "ghost";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
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
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
