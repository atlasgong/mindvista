import { Metadata } from "next";
// import Hr from "../../components/Hr";
import { getPageFromCMS } from "@/lib/getPageFromCMS";
import Link from "next/link";
import { useTranslation } from "@i18n";
import { Language } from "@i18n/settings";

export default async function CrisisPage({ params }: { params: Promise<{ lng: Language }> }) {
    const { lng } = await params;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = await useTranslation(lng, "pages/crisis");

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            {/* Emergency Number Section */}
            <div className="mb-16 text-center">
                <p className="mb-0 text-2xl font-medium text-[var(--text)]">{t("emergency.dial")}</p>

                <h1 className="mb-1 animate-emergency-pulse bg-gradient-to-r from-red-400 to-red-700 bg-clip-text text-9xl font-bold leading-none text-transparent dark:from-red-500 dark:to-rose-400">911</h1>

                <p className="px-8 text-2xl font-medium text-[var(--text)]">
                    {t("emergency.warning")} <span className="text-red-600 dark:text-red-500">{t("emergency.warningHighlight")}</span>.
                </p>
            </div>

            {/* Crisis Resources Grid */}
            <div className="mb-8 grid gap-8 md:grid-cols-2">
                {/* 24/7 Support by Talk Suicide Canada */}
                <div className="rounded-lg border border-cBorder bg-cBackgroundOffset p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(15,23,42,0.2)]">
                    <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">{t("supportLine.title")}</h2>
                    <p className="mb-4 text-[var(--text-offset)]">{t("supportLine.description")}</p>
                    <div className="mb-2 text-xl font-bold text-[var(--text)]">{t("supportLine.phone")}</div>
                    <p className="text-sm text-[var(--text-offset)]">{t("supportLine.provider")}</p>
                    <Link href="https://talksuicide.ca/" target="_blank" className="mt-2 inline-block text-[var(--accent)] hover:opacity-80">
                        {t("supportLine.learnMore")} →
                    </Link>
                </div>

                {/* Student Support (GuardMe) */}
                <div className="rounded-lg border border-cBorder bg-cBackgroundOffset p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(15,23,42,0.2)]">
                    <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">{t("guardMe.title")}</h2>
                    <p className="mb-4 text-[var(--text-offset)]">{t("guardMe.description")}</p>
                    <div className="space-y-2 text-[var(--text)]">
                        <div>
                            <strong>{t("guardMe.phones.northAmerica.label")}:</strong> {t("guardMe.phones.northAmerica.number")}
                        </div>
                        <div>
                            <strong>{t("guardMe.phones.international.label")}:</strong> {t("guardMe.phones.international.number")}
                        </div>
                    </div>
                    <Link href="https://gmssp.org/" target="_blank" className="mt-2 inline-block text-[var(--accent)] hover:opacity-80">
                        {t("guardMe.accessServices")} →
                    </Link>
                </div>

                {/* SSMU Students' Nightline */}
                <div className="rounded-lg border border-cBorder bg-cBackgroundOffset p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(15,23,42,0.2)]">
                    <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">{t("nightline.title")}</h2>
                    <p className="mb-4 text-[var(--text-offset)]">{t("nightline.description")}</p>
                    <div className="mb-2 text-xl font-bold text-[var(--text)]">{t("nightline.phone")}</div>
                    <p className="text-sm text-[var(--text-offset)]">{t("nightline.hours")}</p>
                    <Link href="https://nightline.ssmu.ca/" target="_blank" className="mt-2 inline-block text-[var(--accent)] hover:opacity-80">
                        {t("nightline.moreInfo")} →
                    </Link>
                </div>

                {/* McGill's Peer Support Center */}
                <div className="rounded-lg border border-cBorder bg-cBackgroundOffset p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(15,23,42,0.2)]">
                    <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">{t("peerSupport.title")}</h2>
                    <p className="mb-4 text-[var(--text-offset)]">{t("peerSupport.description")}</p>
                    <ul className="mb-4 list-inside list-disc text-[var(--text-offset)]">
                        <li>{t("peerSupport.services.dropIn")}</li>
                        <li>{t("peerSupport.services.booking")}</li>
                        <li>{t("peerSupport.services.navigation")}</li>
                    </ul>
                    <Link href="https://psc.ssmu.ca/" target="_blank" className="mt-2 inline-block text-[var(--accent)] hover:opacity-80">
                        {t("peerSupport.bookSession")} →
                    </Link>
                </div>
            </div>

            {/* <Hr className="mt-12" /> */}

            {/* Additional Resources */}
            {/* <div className="my-12 rounded-lg border border-cBorder bg-cBackgroundOffset p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(15,23,42,0.2)]"> */}
            {/* <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">Additional Resources</h2> */}
            {/* <p className="mb-4 text-[var(--text-offset)]">If you&apos;re here to help you find the right resources.</p> */}
            {/* <button className="rounded px-4 py-2 font-bold text-white [background:var(--color-gradient)] hover:opacity-90"> Find Support </button> */}
            {/* TODO: initalize button to redirect...somewhere */}
            {/* </div> */}
        </div>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageFromCMS("crisis");
    return {
        ...(page && {
            title: page.title,
            description: page.seoDescription,
        }),
    };
}
