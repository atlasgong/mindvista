import EmergencyButton from "../EmergencyButton";
import { FaFacebook, FaInstagram, FaTiktok, FaLinkedin, FaGithub } from "react-icons/fa";
import Hr from "../Hr";
import Link from "next/link";
import { SocialMediaLink } from "../SocialMediaLink";
import NewsletterEmailForm from "./NewsletterEmailForm";
import { useTranslation } from "@i18n";
import type { Language } from "@/app/(app)/i18n/settings";

export default async function Footer({ lng }: { lng: Language }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = await useTranslation(lng, "components/footer/Footer");

    return (
        <footer className="sticky top-[100vh] flex flex-col gap-8 bg-cBackgroundOffset px-[5vw] pb-24 pt-8 max-sm:fr:pb-32">
            <NewsletterSection lng={lng} />

            <Hr />

            {/* MIDDLE ROW (MOBILE) */}
            <div className="flex flex-col items-center text-cText md:hidden">
                <EmergencySection lng={lng} />

                <div className="mt-4 flex flex-row">
                    <Links
                        className="max-w-[50%] text-left"
                        links={[
                            { href: "/", text: t("links.home") },
                            { href: "/about", text: t("links.about") },
                            { href: "/holistic-wellness", text: t("links.holisticWellness") },
                        ]}
                    />
                    <Links
                        className="max-w-[50%] text-right"
                        links={[
                            { href: "/directory/resources", text: t("links.resourceDirectory") },
                            { href: "/directory/clubs", text: t("links.clubDirectory") },
                            { href: "/contact", text: t("links.contactUs") },
                        ]}
                    />
                </div>
            </div>
            {/* END */}

            {/* MIDDLE ROW (DESKTOP) */}
            <div className="flex grow basis-0 flex-row items-center justify-between text-cText max-md:hidden">
                <Links
                    className="max-w-[33%] text-left"
                    links={[
                        { href: "/", text: t("links.home") },
                        { href: "/about", text: t("links.about") },
                        { href: "/holistic-wellness", text: t("links.holisticWellness") },
                    ]}
                />
                <EmergencySection className="max-w-[33%]" lng={lng} />
                <Links
                    className="max-w-[33%] grow basis-0 text-right"
                    links={[
                        { href: "/directory/resources", text: t("links.resourceDirectory") },
                        { href: "/directory/clubs", text: t("links.clubDirectory") },
                        { href: "/contact", text: t("links.contactUs") },
                    ]}
                />
            </div>
            {/* END */}

            <Hr />

            <LegalBar lng={lng} />

            <section className="absolute bottom-0 left-0 flex min-h-16 min-w-full items-center justify-center gap-4 bg-black p-1 text-lg font-medium text-white max-sm:fr:flex-col max-sm:fr:gap-2 max-sm:fr:pb-5 max-sm:fr:pt-4">
                <p>
                    <span className="hidden md:inline">{t("sponsorship.desktop")}</span>
                    <span className="inline md:hidden">{t("sponsorship.mobile")}</span>
                </p>
                <Link href="/sponsor-us" className="rounded-lg border border-white px-2 py-[0.15rem]">
                    {t("sponsorship.cta")}
                </Link>
            </section>
        </footer>
    );
}

interface ClassNameProps {
    className?: string;
}

interface LinkProps extends ClassNameProps {
    links: Array<{
        href: string;
        text: string;
    }>;
}

function Links(props: LinkProps) {
    return (
        <div className={`${props.className} flex grow flex-col justify-center gap-[0.5vh] font-semibold`}>
            {props.links.map((link, index) => (
                <a key={index} href={link.href} className="">
                    {link.text}
                </a>
            ))}
        </div>
    );
}

async function NewsletterSection({ lng }: { lng: Language }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = await useTranslation(lng, "components/footer/Footer");
    return (
        <div className="rounded-xl bg-cBackgroundOffsetAccent p-6 shadow-lg transition-transform duration-300 hover:scale-[1.01]">
            <div className="flex flex-col gap-6 text-center md:flex-row md:text-left">
                <div className="flex flex-col space-y-2 self-center md:max-w-[50%]">
                    <h3 className="bg-gradient-to-r from-cAccent to-cLightBlue bg-clip-text text-xl font-bold text-transparent">{t("newsletter.title")}</h3>
                    <p className="text-cTextOffset">{t("newsletter.description")}</p>
                </div>
                <NewsletterEmailForm lng={lng} />
            </div>
        </div>
    );
}

async function EmergencySection({ className, lng }: ClassNameProps & { lng: Language }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = await useTranslation(lng, "components/footer/Footer");
    return (
        <div className={`${className} flex grow flex-col items-center gap-1 text-center`}>
            <h3 className="font-serif text-xl font-semibold">{t("mindvista.title")}</h3>
            <p>{t("mindvista.tagline")}</p>

            <EmergencyButton className="mt-2" lng={lng} />
        </div>
    );
}

async function LegalBar({ lng }: { lng: Language }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = await useTranslation(lng, "components/footer/Footer");
    const year = new Date().getFullYear();

    const socialLinks = [
        {
            href: "https://facebook.com/mindvista.mcgill",
            icon: FaFacebook,
            label: "Facebook",
        },
        {
            href: "https://instagram.com/mindvista.mcgill/",
            icon: FaInstagram,
            label: "Instagram",
        },
        {
            href: "https://tiktok.com/@mindvistamcgill",
            icon: FaTiktok,
            label: "TikTok",
        },
        {
            href: "https://linkedin.com/company/mindvista/",
            icon: FaLinkedin,
            label: "LinkedIn",
        },
        {
            href: "https://github.com/atlasgong/mindvista",
            icon: FaGithub,
            label: "GitHub",
        },
    ];

    return (
        <div className="flex flex-col items-center justify-between text-center md:flex-row md:text-right">
            <div className="flex grow basis-0 flex-row flex-wrap justify-center gap-x-3 gap-y-1 font-semibold text-cTextOffset max-sm:fr:flex-col max-sm:fr:text-sm md:justify-start md:gap-x-4">
                <Link href="/privacy-policy">{t("legal.privacyPolicy")}</Link>
                <span className="self-center font-normal text-cTextOffset max-sm:fr:hidden">|</span>
                <Link href="/terms-and-conditions">{t("legal.termsConditions")}</Link>
            </div>
            <div className="mt-4 flex grow basis-0 items-center justify-center gap-4 md:mt-0">
                {socialLinks.map((link) => (
                    <SocialMediaLink key={link.label} href={link.href} icon={link.icon} label={t(`social.${link.label.toLowerCase()}`)} className="text-gray-600" />
                ))}
            </div>
            <p className="mt-4 grow basis-0 font-medium text-cTextOffset md:mt-0">{t("legal.copyright", { year })}</p>
        </div>
    );
}
