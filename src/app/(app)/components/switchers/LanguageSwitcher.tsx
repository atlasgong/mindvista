"use client";

import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === "en" ? "fr" : "en";
        i18n.changeLanguage(newLang);
    };

    return (
        <button onClick={toggleLanguage} className="w-4 text-center font-bold text-cText transition-colors">
            {i18n.language === "en" ? "Fr" : "En"}
        </button>
    );
}
