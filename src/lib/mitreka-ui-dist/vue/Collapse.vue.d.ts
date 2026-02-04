interface Props {
    modelValue?: boolean;
    defaultOpen?: boolean;
    variant?: 'default' | 'borderless' | 'ghost';
    disabled?: boolean;
}
declare function toggle(): void;
declare function __VLS_template(): {
    header?(_: {}): any;
    title?(_: {}): any;
    default?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    modelValue: undefined;
    defaultOpen: boolean;
    variant: string;
    disabled: boolean;
}>>, {
    isOpen: import('vue').Ref<boolean, boolean>;
    toggle: typeof toggle;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => void;
    toggle: (value: boolean) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    modelValue: undefined;
    defaultOpen: boolean;
    variant: string;
    disabled: boolean;
}>>> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onToggle?: ((value: boolean) => any) | undefined;
}>, {
    modelValue: boolean;
    variant: "default" | "borderless" | "ghost";
    disabled: boolean;
    defaultOpen: boolean;
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
