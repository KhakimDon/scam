import {createPinia} from "pinia";
import type {App} from "vue";
import router from "@/router";
import i18n from "@/plugins/i18n";

const pinia = createPinia();

export default function definePlugins(app: App) {
    app.use(pinia);
    app.use(router)
    app.use(i18n)
}
