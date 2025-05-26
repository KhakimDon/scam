import type {TClassName} from "@/types/common";

export interface ITableHead {
    title: string;
    key: string;
}

export interface ITableAction {
    label?: string | number;
    icon?: string;
    role?: boolean;
    class?: TClassName;
    event: string;
}
