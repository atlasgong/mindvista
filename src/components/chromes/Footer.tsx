import EmergencyButton from "@components/buttons/EmergencyButton";

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
                            { href: "/", text: "Contact Us" },
                        ]}
                    />
                </div>
            </div>
            {/* END */}

            {/* MIDDLE ROW (DESKTOP) */}
            <div className="flex flex-row items-center text-cText max-md:hidden">
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
                    className="max-w-[33%] text-right"
                    links={[
                        { href: "/", text: "Wellness Resources" },
                        { href: "/", text: "Club List" },
                        { href: "/", text: "Contact Us" },
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

            <EmergencyButton className="mt-2" client:load />
        </div>
    );
}

function LegalBar() {
    const year = new Date().getFullYear();

    return (
        <div className="flex flex-col text-center md:flex-row md:text-right">
            <div className="flex grow flex-row justify-center gap-2 font-semibold md:justify-normal">
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
            <p className="grow">&copy; {year} MindVista. All rights reserved.</p>
        </div>
    );
}
