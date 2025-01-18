import { notFound } from "next/navigation";
import { getPayloadClient } from "@/payloadClient";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import styles from "./legal.module.css";
import { Legal, Page } from "@/payload-types";
import { Metadata } from "next";

async function getLegalPage(slug: string): Promise<Legal | null> {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
        collection: "legal",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1, // should only exist one since slugs are unique
    });
    return docs[0] || null;
}

interface LegalPageProps {
    params: Promise<{
        legal: string;
    }>;
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
    const legalPage = await getLegalPage((await params).legal);
    if (!legalPage) return { title: "Legal Page Not Found" };
    const page = legalPage.page as Page;

    return {
        title: `${page.title} - MindVista`,
        description: page.seoDescription,
    };
}

export default async function LegalPage(props: LegalPageProps) {
    const page = await getLegalPage((await props.params).legal);

    if (!page) {
        return notFound();
    }

    return (
        <section className="rounded-xl px-[10vw] py-[10vh] md:px-[15vw] lg:px-[20vw]">
            <article className={styles.legalContent}>
                <RichText data={page.content as SerializedEditorState} />
            </article>
        </section>
    );
}
