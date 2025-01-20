import { notFound } from "next/navigation";
import { getPayloadClient } from "@/payloadClient";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import styles from "./legal.module.css";
import { Legal, Page } from "@/payload-types";
import { Metadata } from "next";

interface Props {
    params: Promise<{
        legal: string;
    }>;
    searchParams: Promise<{
        [key: string]: string | string[];
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const legalPage = await getLegalPage((await params).legal);
    if (!legalPage) return { title: "Legal Page Not Found" };
    const page = legalPage.page as Page;

    return {
        title: `${page.title} - MindVista`,
        description: page.seoDescription,
    };
}

async function getLegalPage(slug: string): Promise<Legal | null> {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
        collection: "legal",
        where: {
            'page.slug': {
                equals: slug,
            },
        },
        depth: 1,
        limit: 1,
    });
    return docs[0] || null;
}

export default async function LegalPage({ params }: Props) {
    const page = await getLegalPage((await params).legal);
    if (!page) {
        notFound();
    }

    return (
        <section className="rounded-xl px-[10vw] py-[10vh] md:px-[15vw] lg:px-[20vw]">
            <article className={styles.legalContent}>
                <RichText data={page.content as SerializedEditorState} />
            </article>
        </section>
    );
}
