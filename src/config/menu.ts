import type {RouteLocationRaw} from "vue-router";

import i18n from "@/plugins/i18n";

const t = i18n.global.t;

type MetaItem = string | boolean | number

export interface IMenu {
    heading: string;
    route: RouteLocationRaw;
    svgIcon?: string;
    meta?: Record<string, MetaItem | MetaItem[]>;
    withCount?: boolean;
    countName?: string;
    sub?: IMenu[];
    space?: boolean;
}

export const menu: IMenu[] = [
    {
        heading: t("menu.sidebar.main"),
        route: "/dashboard",
        svgIcon: "icon-home",
    },
];
