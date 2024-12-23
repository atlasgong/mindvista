import EmergencyButton from "@components/buttons/EmergencyButton";
import { FaFacebook, FaInstagram, FaTiktok, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="sticky top-[100vh] flex flex-col gap-4 bg-cBackgroundOffset px-[5vw] py-6">
            <NewsletterSection />

            <HorizontalBar className="mt-4" />

            {/* MIDDLE ROW (MOBILE) */}
            <div className="flex flex-col items-center text-cText md:hidden">
                <EmergencySection />

                <div className="flex flex-row">
                    <Links
                        className="max-w-[50%] text-left"
                        links={[
                            { href: "/", text: "Home" },
                            { href: "/", text: "About" },
                            { href: "/", text: "What is Mental Wellness?" },
                        ]}
                    />
                    <Links
                        className="max-w-[50%] text-right"
                        links={[
                            { href: "/", text: "Wellness Resources" },
                            { href: "/", text: "Club List" },
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
                        { href: "/", text: "About" },
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

            <HorizontalBar />

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

function HorizontalBar(props: ClassNameProps) {
    return <hr className={`${props.className} border-cBorder bg-cBorder text-cBorder`}></hr>;
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
        <div className="flex flex-col gap-6 text-center md:flex-row md:text-left">
            <div className="flex flex-col self-center md:max-w-[50%]">
                <p className="text-lg font-semibold">Join Our Wellness Newsletter.</p>
                <p>
                    Don’t miss new content, resources and events from MindVista. Unsubscribe anytime. Seriously! No hard
                    feelings 🙂
                </p>
                {/* put social media icons here */}
            </div>

            <EmailForm />
        </div>
    );
}

function EmailForm() {
    return (
        <div className="grow pl-4 max-md:pr-4">
            <form className="flex flex-col text-lg">
                <label className="font-semibold" htmlFor="email">
                    Email
                </label>
                <input
                    className="mb-2 min-h-12 rounded-lg border-4 border-cText bg-cBackground"
                    id="email"
                    type="email"
                ></input>
                <button className="Background rounded-lg border-2 border-solid border-cText bg-cAccent font-semibold text-cSoftWhite dark:text-cBackgroundOffset">
                    Sign up!
                </button>
            </form>
        </div>
    );
}

function EmergencySection(props: ClassNameProps) {
    return (
        <div className={`${props.className} mb-4 flex grow flex-col items-center gap-1 text-center`}>
            <h3 className="text-xl font-semibold">MINDVISTA</h3>
            <p>Your wellness journey starts here.</p>

            <EmergencyButton className="mt-2" />
        </div>
    );
}

function LegalBar() {
    const year = new Date().getFullYear();

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
                <a
                    href="https://www.facebook.com/mindvista.mcgill"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 text-gray-600 transition-colors"
                >
                    <FaFacebook className="h-5 w-5" />
                </a>
                <a
                    href="https://www.instagram.com/mindvista.mcgill/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 text-gray-600 transition-colors"
                >
                    <FaInstagram className="h-5 w-5" />
                </a>
                <a
                    href="https://www.tiktok.com/@mindvistamcgill"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 text-gray-600 transition-colors"
                >
                    <FaTiktok className="h-5 w-5" />
                </a>
                <a
                    href="https://www.linkedin.com/company/mindvista/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 text-gray-600 transition-colors"
                >
                    <FaLinkedin className="h-5 w-5" />
                </a>
                <a
                    href="https://github.com/atlasgong/mindvista"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 text-gray-600 transition-colors"
                >
                    <FaGithub className="h-5 w-5" />
                </a>
            </div>
            <p className="mt-4 grow basis-0 font-medium text-cTextOffset md:mt-0">
                &copy; {year} MindVista. All rights reserved.
            </p>
        </div>
    );
}
