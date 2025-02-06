import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "../locales/en/common.json";
import frCommon from "../locales/fr/common.json";

const resources = {
    en: {
        common: enCommon,
    },
    fr: {
        common: frCommon,
    },
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        defaultNS: "common",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ["navigator", "htmlTag"],
            caches: ["localStorage"],
        },
    });

export default i18n;
