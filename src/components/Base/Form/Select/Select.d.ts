export type TSelectOption = number | string | Record<string, string | object | number>;

export interface ISelect {
    modelValue?: TSelectOption;
    options: TSelectOption[];
    labelKey?: string;
    valueKey: string;
    placeholder?: string;
    selectedOptionStyles?: string;
    optionBorder: boolean;
    dark?: boolean;
    error?: boolean;
    disabled?: boolean;
}
