import { notFound } from "next/navigation";
import { getPayloadClient } from "@/payloadClient";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import styles from "./legal.module.css";

async function getLegalPage(legal: string) {
    const payload = await getPayloadClient();

    const legalPages = await payload.find({
        collection: "legal",
        where: {
            "page.slug": {
                equals: legal,
            },
        },
        depth: 1,
    });

    return legalPages.docs[0];
}

interface LegalPageProps {
    params: Promise<{
        legal: string;
    }>;
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
