import Link from "next/link";
import { Metadata } from "next";
import ContactForm from "./components/ContactForm";
import { getPageFromCMS } from "@/lib/getPageFromCMS";
import { FaFacebook, FaInstagram, FaTiktok, FaLinkedin, FaGithub } from "react-icons/fa";
import { SocialMediaLink } from "../../components/SocialMediaLink";

export default function ContactPage() {
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
        <div className="container mx-auto max-w-4xl px-6 py-12 sm:px-4">
            {/* Header Section */}
            <div className="mb-12 text-center">
                <h1 className="mb-4 bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl dark:from-purple-400 dark:to-blue-300">Contact Us</h1>
                <p className="mx-auto max-w-2xl text-xl font-medium text-cTextOffset">Have questions or feedback? We&apos;re here to listen and help. Your mental health journey matters to us.</p>
            </div>

            {/* Contact Form Section */}
            <div className="mx-auto">
                <ContactForm />
            </div>

            {/* Additional Contact Info */}
            <div className="mt-16 text-center">
                <h2 className="mb-4 text-2xl font-semibold text-cText">Other Ways to Reach Us</h2>
                <p className="mb-5 text-cTextOffset">If you prefer other methods of communication or need immediate assistance:</p>

                {/* SOCIAL MEDIA ICONS */}
                <div className="mb-6 flex items-center justify-center gap-4">
                    {socialLinks.map((link) => (
                        <SocialMediaLink key={link.label} href={link.href} icon={link.icon} label={link.label} className="text-cAccent dark:text-white" size="2rem" />
                    ))}
                </div>

                <div className="mx-auto grid max-w-2xl gap-6 md:grid-cols-2">
                    {/* EMERGENCY SUPPORT */}
                    <div className="rounded-lg bg-cBackgroundOffset p-6">
                        <h3 className="mb-2 text-lg font-semibold text-cText">Emergency Support</h3>
                        <p className="text-cTextOffset">
                            If you&apos;re in crisis, please visit our
                            <Link href="/crisis" className="text-cAccent hover:opacity-80">
                                {" "}
                                emergency resources{" "}
                            </Link>
                            page.
                        </p>
                    </div>

                    {/* GENERAL INQUIRIES */}
                    <div className="rounded-lg bg-cBackgroundOffset p-6">
                        <h3 className="mb-2 text-lg font-semibold text-cText">General Inquiries</h3>
                        <p className="text-cTextOffset">
                            For general questions, email us at{" "}
                            <Link href="mailto:mindvista.mcgill@gmail.com" className="text-cAccent hover:opacity-80">
                                mindvista.mcgill@gmail.com
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageFromCMS("contact");
    return {
        ...(page && {
            title: page.title,
            description: page.seoDescription,
        }),
    };
}
