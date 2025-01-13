import Link from "next/link";
import { Metadata } from "next";
import ContactForm from "./components/ContactForm";
import { getPageFromCMS } from "@/lib/getPageFromCMS";

export default function ContactPage() {
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
                <p className="mb-6 text-cTextOffset">If you prefer other methods of communication or need immediate assistance:</p>
                <div className="mx-auto grid max-w-2xl gap-6 md:grid-cols-2">
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
                    <div className="rounded-lg bg-cBackgroundOffset p-6">
                        <h3 className="mb-2 text-lg font-semibold text-cText">General Inquiries</h3>
                        <p className="text-cTextOffset">
                            For general questions, email us at{" "}
                            <Link href="mailto:info@mindvista.ca" className="text-cAccent hover:opacity-80">
                                info@mindvista.ca
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
