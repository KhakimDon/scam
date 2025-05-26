import {createI18n} from "vue-i18n";

import {customRule, customRuRule,} from "@/locales/customRules";
import {getCookie, setCookie} from "@/utils/browser";

import en from "@/locales/en.json";
import ru from "@/locales/ru.json";
import uz from "@/locales/uz.json";

let locale = getCookie("locale");
if (!locale) {
    setCookie("locale", "ru");
    locale = "ru";
}

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    missingWarn: false,
    fallbackWarn: false,
    fallbackLocale: "ru",
    messages: {
        en,
        ru,
        uz,
    },
    locale,
    pluralRules: {
        ru: customRuRule,
        en: customRule,
        uz: customRule,
    },
    runtimeOnly: false,
});

export default i18n;
