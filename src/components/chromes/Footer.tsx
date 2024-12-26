import EmergencyButton from "@components/buttons/EmergencyButton";
import { FaFacebook, FaInstagram, FaTiktok, FaLinkedin, FaGithub } from "react-icons/fa";
import { type IconType } from "react-icons";
import Hr from "@components/Hr";

export default function Footer() {
    return (
        <footer className="sticky top-[100vh] flex flex-col gap-8 bg-cBackgroundOffset px-[5vw] py-6 pt-8">
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
                            { href: "/", text: "What is Mental Wellness?" },
                        ]}
                    />
                    <Links
                        className="max-w-[50%] text-right"
                        links={[
                            { href: "/resources", text: "Wellness Resources" },
                            { href: "/clubs", text: "Club List" },
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
                        { href: "/", text: "What is Mental Wellness?" },
                    ]}
                />
                <EmergencySection className="max-w-[33%]" />
                <Links
                    className="max-w-[33%] grow basis-0 text-right"
                    links={[
                        { href: "/resources", text: "Wellness Resources" },
                        { href: "/clubs", text: "Club List" },
                        { href: "/contact", text: "Contact Us" },
                    ]}
                />
            </div>
            {/* END */}

            <Hr />

            <LegalBar />
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

function NewsletterSection() {
    return (
        <div className="rounded-xl bg-cBackgroundOffsetAccent p-6 shadow-lg transition-transform duration-300 hover:scale-[1.01]">
            <div className="flex flex-col gap-6 text-center md:flex-row md:text-left">
                <div className="flex flex-col space-y-2 self-center md:max-w-[50%]">
                    <h3 className="bg-gradient-to-r from-cAccent to-cLightBlue bg-clip-text text-xl font-bold text-transparent">Join Our Wellness Newsletter</h3>
                    <p className="text-cTextOffset">Stay updated with new content, resources and events from MindVista. Unsubscribe anytime — no hard feelings! 🙂</p>
                </div>
                <EmailForm />
            </div>
        </div>
    );
}

function EmailForm() {
    return (
        <form className="flex w-full flex-col items-center gap-3 self-center md:flex-row">
            <input type="email" placeholder="Enter your email" className="w-full rounded-lg border border-cBorder bg-cBackgroundOffset px-4 py-2 text-cText transition-all duration-200 focus:border-cAccent focus:outline-none focus:ring-2 focus:ring-[color:rgb(var(--accent)/0.2)] md:py-4 md:text-lg" required />
            <button type="submit" className="w-full rounded-lg bg-gradient-to-r from-cAccent to-cLightBlue px-6 py-2 font-semibold text-white transition-opacity duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[color:rgb(var(--accent)/0.2)] md:w-auto md:py-3 md:text-lg">
                Subscribe
            </button>
        </form>
    );
}

function EmergencySection(props: ClassNameProps) {
    return (
        <div className={`${props.className} flex grow flex-col items-center gap-1 text-center`}>
            <h3 className="text-xl font-semibold">MINDVISTA</h3>
            <p>Your wellness journey starts here.</p>

            <EmergencyButton className="mt-2" />
        </div>
    );
}

function LegalBar() {
    const year = new Date().getFullYear();

    const socialLinks = [
        {
            href: "https://www.facebook.com/mindvista.mcgill",
            icon: FaFacebook,
            label: "Facebook",
        },
        {
            href: "https://www.instagram.com/mindvista.mcgill/",
            icon: FaInstagram,
            label: "Instagram",
        },
        {
            href: "https://www.tiktok.com/@mindvistamcgill",
            icon: FaTiktok,
            label: "TikTok",
        },
        {
            href: "https://www.linkedin.com/company/mindvista/",
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
                <a href="/privacy-policy" className="">
                    Privacy Policy
                </a>
                <span className="font-normal">|</span>
                <a href="/disclaimers" className="">
                    Disclaimers
                </a>
                <span className="font-normal">|</span>
                <a href="/copyright" className="">
                    Copyright
                </a>
            </div>
            <div className="mt-4 flex grow basis-0 items-center justify-center gap-4 md:mt-0">
                {socialLinks.map((link) => (
                    <SocialMediaLink key={link.label} href={link.href} icon={link.icon} label={link.label} />
                ))}
            </div>
            <p className="mt-4 grow basis-0 font-medium text-cTextOffset md:mt-0">&copy; {year} MindVista. All rights reserved.</p>
        </div>
    );
}

interface SocialMediaLinkProps {
    href: string;
    icon: IconType;
    label: string;
}

function SocialMediaLink({ href, icon: Icon, label }: SocialMediaLinkProps) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 text-gray-600 transition-colors" aria-label={`Visit our ${label} page.`}>
            <Icon className="h-5 w-5" title={label} />
        </a>
    );
}
