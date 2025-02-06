"use client";

import { useEffect } from "react";
import "../../lib/i18n";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

export default function I18nProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // ensure i18next is initialized on the client side
        if (!i18next.isInitialized) {
            i18next.init();
        }
    }, []);

    return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
