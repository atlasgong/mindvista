import EmergencyButton from "./EmergencyButton";
import { FaFacebook, FaInstagram, FaTiktok, FaLinkedin, FaGithub } from "react-icons/fa";
import Hr from "./Hr";
import Link from "next/link";
import { SocialMediaLink } from "./SocialMediaLink";
import NewsletterEmailForm from "./NewsletterEmailForm";

export default function Footer() {
    return (
        <footer className="sticky top-[100vh] flex flex-col gap-8 bg-cBackgroundOffset px-[5vw] pb-24 pt-8">
            <NewsletterSection />

            <Hr />

            {/* MIDDLE ROW (MOBILE) */}
            <div className="flex flex-col items-center text-cText md:hidden">
                <EmergencySection />

                <div className="mt-4 flex flex-row">
                    <Links
                        className="max-w-[50%] text-left"
                        links={[
                            { href: "/", text: "Home" },
                            { href: "/about", text: "About" },
                            { href: "/holistic-wellness", text: "What is Holistic Wellness?" },
                        ]}
                    />
                    <Links
                        className="max-w-[50%] text-right"
                        links={[
                            { href: "/directory/resources", text: "Resource Directory" },
                            { href: "/directory/clubs", text: "Club Directory" },
                            { href: "/contact", text: "Contact Us" },
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
                        { href: "/", text: "Home" },
                        { href: "/about", text: "About" },
                        { href: "/holistic-wellness", text: "What is Holistic Wellness?" },
                    ]}
                />
                <EmergencySection className="max-w-[33%]" />
                <Links
                    className="max-w-[33%] grow basis-0 text-right"
                    links={[
                        { href: "/directory/resources", text: "Resource Directory" },
                        { href: "/directory/clubs", text: "Club Directory" },
                        { href: "/contact", text: "Contact Us" },
                    ]}
                />
            </div>

            {/* END */}

            <Hr />

            <LegalBar />

            <section className="absolute bottom-0 left-0 flex min-h-16 min-w-full items-center justify-center gap-4 bg-black p-1 text-lg font-medium text-white">
                <p>
                    <span className="hidden md:inline">Want to make a difference in mental wellness?</span>
                    <span className="inline md:hidden">Make a difference today.</span>
                </p>
                <Link href="/sponsor-us" className="rounded-lg border border-white px-2 py-[0.15rem] transition-all duration-200 hover:border-blue-400 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-50 dark:hover:border-blue-500 dark:hover:text-blue-400 dark:hover:shadow-blue-950/50">
                    Sponsor Us!
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
                <a
                    key={index}
                    href={link.href}
                    className={`transition-transform duration-200 hover:scale-110 transform ${
                        props.className?.includes("text-right") ? "origin-right" : "origin-left"
                    }`}
                >
                    {link.text}
                </a>
            ))}
        </div>
    );
}



function NewsletterSection() {
    return (
        <div className="rounded-xl bg-cBackgroundOffsetAccent p-6 shadow-lg transition-transform duration-300 hover:scale-[1.01]">
            <div className="flex flex-col gap-6 text-center md:flex-row md:text-left">
                <div className="flex flex-col space-y-2 self-center md:max-w-[50%]">
                    <h3 className="bg-gradient-to-r from-cAccent to-cLightBlue bg-clip-text text-xl font-bold text-transparent">Join Our Wellness Newsletter</h3>
                    <p className="text-cTextOffset">Stay updated with new content, resources and events from MindVista. Unsubscribe anytime — no hard feelings! 🙂</p>
                </div>
                <NewsletterEmailForm />
            </div>
        </div>
    );
}

function EmergencySection(props: ClassNameProps) {
    return (
        <div className={`${props.className} flex grow flex-col items-center gap-1 text-center`}>
            <h3 className="font-serif text-xl font-semibold">MINDVISTA</h3>
            <p>Your wellness journey starts here.</p>

            <EmergencyButton className="mt-2" />
        </div>
    );
}

function LegalBar() {
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
        <div className="flex flex-col justify-between text-center md:flex-row md:text-right">
            <div className="flex grow basis-0 flex-row justify-center gap-2 font-semibold text-cTextOffset md:justify-start">
                <Link href="/privacy-policy" className="transition-transform duration-200 hover:scale-105">
                    Privacy Policy
                </Link>
                <span className="font-normal">|</span>
                <Link href="/terms-and-conditions" className="transition-transform duration-200 hover:scale-105">
                    Terms &amp; Conditions
                </Link>
            </div>
            <div className="mt-4 flex grow basis-0 items-center justify-center gap-4 md:mt-0">
                {socialLinks.map((link) => (
                    <SocialMediaLink key={link.label} href={link.href} icon={link.icon} label={link.label} className="text-gray-600 transition-transform duration-200 hover:scale-110" />
                ))}
            </div>
            <p className="mt-4 grow basis-0 font-medium text-cTextOffset md:mt-0">&copy; {year} MindVista. All rights reserved.</p>
        </div>
    );
}
