import { Metadata } from "next";
import ContactForm from "../contact/components/ContactForm";
import { getPageFromCMS } from "@/lib/getPageFromCMS";
import Image from "next/image";
import Hr from "../../components/Hr";

export default function SponsorPage() {
    return (
        <div className="container mx-auto flex flex-col justify-between gap-[10vw] px-6 py-12 sm:px-4 lg:flex-row">
            <section>
                {/* Header Section */}
                <div className="mb-20 text-center">
                    <h1 className="mb-4 text-4xl font-bold tracking-tighter text-black md:text-5xl dark:text-white">Our Sponsors!</h1>
                    <p className="mx-auto max-w-2xl text-xl font-medium leading-tight text-black dark:text-white">We are incredibly grateful for the support and dedication of our sponsors. Your belief in our mission and your generous contributions are making a real difference in the mental wellness journey. Thanks to you, we are able to continue our work, reach more people, and create lasting positive change.</p>
                    <p className="mx-auto mt-6 max-w-2xl rounded-xl border border-cBorder bg-mindvista-700 px-2 py-4 text-xl font-medium leading-tight tracking-tight text-cSoftWhite shadow-md dark:text-white">Your partnership is invaluable, and we are proud to have you as part of the MindVista family.</p>
                </div>

                {/* Sponsor Logos */}
                <div className="grid grid-cols-2 grid-rows-1 items-center">
                    <Image src="/sponsors/caffettiera.png" alt="Caffettiera Logo" width={2029} height={1291} className="mx-auto max-w-40 md:max-w-56" />
                    <p className="mx-auto flex aspect-square h-24 w-24 items-center rounded-3xl bg-mindvista-800 p-2 text-center text-sm font-black text-white md:h-40 md:w-40 md:p-6 md:text-xl">YOUR LOGO COULD BE HERE</p>{" "}
                </div>
            </section>

            <Hr className="lg:hidden" />

            {/* CONTACT SECTION */}
            <section>
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold tracking-tighter text-black md:text-5xl dark:text-white">Sponsor Us!</h1>
                    <p className="mx-auto max-w-2xl text-xl font-medium leading-tight tracking-tight text-black dark:text-white">We&apos;d love to partner with like-minded organizations and individuals to help spread mental wellness. If you&apos;re passionate about making a positive impact and would like to support MindVista, shoot us a message!</p>
                </div>

                {/* Contact Form Section */}
                <div className="mx-auto">
                    <ContactForm />
                </div>
            </section>
        </div>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageFromCMS("sponsor-us");
    return {
        ...(page && {
            title: page.title,
            description: page.seoDescription,
        }),
    };
}
