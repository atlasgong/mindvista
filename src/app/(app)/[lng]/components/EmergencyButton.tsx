"use client";

import Link from "next/link";
import { useTranslation } from "@i18n/client";
import { Language } from "@i18n/settings";

interface EmergencyButtonProps {
    lng: Language;
    className?: string;
}

export default function EmergencyButton(props: EmergencyButtonProps) {
    const { t } = useTranslation(props.lng, "components/EmergencyButton");
    return (
        <Link href="/crisis" className={`${props.className} w-fit cursor-pointer rounded-lg border-2 border-solid border-cText bg-cRed p-2 font-bold text-cSoftWhite hover:opacity-90`} role="button">
            {t("button")}
        </Link>
    );
}
