import type {ToasterProps} from "vue-sonner";

export const CONFIG = {
    COMMON_URL: `${import.meta.env.VITE_APP_BASE_URL}/common/api/v1`,
    WEBSITE_URL: import.meta.env.VITE_APP_WEBSITE_URL,
    CALL_CENTER: "+998946187997",
};

export const TOAST_CONFIG = {
    duration: 5000,
    position: "top-right",
    visibleToasts: 5,
} as ToasterProps