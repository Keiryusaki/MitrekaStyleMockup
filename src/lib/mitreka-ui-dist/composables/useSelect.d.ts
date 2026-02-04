import { Ref } from 'vue';

export type SelectOption = {
    value: string | number;
    label: string;
    disabled?: boolean;
};
export type UseSelectCommon = {
    options?: Ref<SelectOption[]> | SelectOption[];
    fetchOptions?: (query: string) => Promise<SelectOption[]>;
    debounceMs?: number;
    filterFn?: (opt: SelectOption, query: string) => boolean;
};
export declare function useClickOutside(root: Ref<HTMLElement | null>, cb: () => void): void;
/**
 * Single select with search
 */
export declare function useSelectSingle(model: Ref<string | number | null>, common?: UseSelectCommon): {
    root: Ref<HTMLElement | null, HTMLElement | null>;
    inputEl: Ref<HTMLInputElement | null, HTMLInputElement | null>;
    menu: Ref<HTMLElement | null, HTMLElement | null>;
    open: Ref<boolean, boolean>;
    query: Ref<string, string>;
    hoverIdx: Ref<number, number>;
    loading: Ref<boolean, boolean>;
    localOptions: Ref<{
        value: string | number;
        label: string;
        disabled?: boolean | undefined;
    }[], SelectOption[] | {
        value: string | number;
        label: string;
        disabled?: boolean | undefined;
    }[]>;
    filtered: import('vue').ComputedRef<SelectOption[]>;
    selected: import('vue').ComputedRef<SelectOption | null>;
    openMenu: () => void;
    closeMenu: () => void;
    choose: (o: SelectOption) => void;
    clear: () => void;
    onKey: (e: KeyboardEvent) => void;
};
/**
 * Multi select with search (chips)
 */
export declare function useSelectMulti(model: Ref<Array<string | number>>, common?: UseSelectCommon): {
    selectedList: import('vue').ComputedRef<SelectOption[]>;
    toggle: (v: string | number) => void;
    clearAll: () => void;
    root: Ref<HTMLElement | null, HTMLElement | null>;
    inputEl: Ref<HTMLInputElement | null, HTMLInputElement | null>;
    menu: Ref<HTMLElement | null, HTMLElement | null>;
    open: Ref<boolean, boolean>;
    query: Ref<string, string>;
    hoverIdx: Ref<number, number>;
    loading: Ref<boolean, boolean>;
    localOptions: Ref<{
        value: string | number;
        label: string;
        disabled?: boolean | undefined;
    }[], SelectOption[] | {
        value: string | number;
        label: string;
        disabled?: boolean | undefined;
    }[]>;
    filtered: import('vue').ComputedRef<SelectOption[]>;
    selected: import('vue').ComputedRef<SelectOption | null>;
    openMenu: () => void;
    closeMenu: () => void;
    choose: (o: SelectOption) => void;
    clear: () => void;
    onKey: (e: KeyboardEvent) => void;
};
