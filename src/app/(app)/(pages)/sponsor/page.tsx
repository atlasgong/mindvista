import { RefreshRouteOnSave } from "@/app/(app)/components/RefreshRouteOnSave";
import { Fragment } from "react";
import { Metadata } from "next";
import ContactForm from "../contact/components/ContactForm/ContactForm";
import { getPageFromCMS } from "@/lib/getPageFromCMS";
import Hr from "../../components/Hr";
import { getPayloadClient } from "@/payloadClient";
import { SponsorLogos } from "./components/SponsorLogos";

export default async function SponsorPage() {
    // fetch sponsor pg content
    const data = await (await getPayloadClient()).findGlobal({ slug: "sponsor" });

    return (
        <Fragment>
            <RefreshRouteOnSave />
            <div className="container mx-auto flex flex-col justify-between gap-[10vw] px-6 py-12 sm:px-4 lg:flex-row">
                <section>
                    {/* Header Section */}
                    <div className="mb-20 text-center">
                        <h1 className="mb-4 text-4xl font-bold tracking-tighter text-black md:text-5xl dark:text-white">Our Sponsors!</h1>
                        <p className="mx-auto max-w-2xl text-xl font-medium leading-tight text-black dark:text-white">{data.ourSponsorsSection}</p>
                        <p className="mx-auto mt-6 max-w-2xl rounded-xl border border-cBorder bg-mindvista-700 px-2 py-4 text-xl font-medium leading-tight tracking-tight text-cSoftWhite shadow-md dark:text-white">{data.callout}</p>
                    </div>

                    {/* Sponsor Logos */}
                    <div className="grid grid-cols-1 items-center justify-items-center gap-8 md:grid-cols-2 md:gap-0">
                        <SponsorLogos sponsors={data.sponsors} />
                    </div>
                </section>

                <Hr className="lg:hidden" />

                {/* CONTACT SECTION */}
                <section>
                    {/* Header Section */}
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-4xl font-bold tracking-tighter text-black md:text-5xl dark:text-white">Sponsor Us!</h1>
                        <p className="mx-auto max-w-2xl text-xl font-medium leading-tight tracking-tight text-black dark:text-white">{data.sponsorUsSection}</p>
                    </div>

                    {/* Contact Form Section */}
                    <div className="mx-auto">
                        <ContactForm />
                    </div>
                </section>
            </div>
        </Fragment>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageFromCMS("sponsor");
    return {
        ...(page && {
            title: page.title,
            description: page.seoDescription,
        }),
    };
}
