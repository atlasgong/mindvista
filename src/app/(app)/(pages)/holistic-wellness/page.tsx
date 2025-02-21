import { getPageFromCMS } from "@/lib/getPageFromCMS";
import { getPayloadClient } from "@/payloadClient";
import { Metadata } from "next";
import { WellnessWheel } from "./components/WellnessWheel";
import styles from "./styles.module.css";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import Hr from "../../components/Hr";

async function getHolisticWellnessContent() {
    const payload = await getPayloadClient();
    const data = await payload.findGlobal({
        slug: "holistic-wellness",
    });
    return data;
}

export default async function HolisticWellnessPage() {
    const content = await getHolisticWellnessContent();

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                {/* Hero Section */}
                <section className={`${styles.section} ${styles.heroSection}`}>
                    <div className={`${styles.textContent} text-lg`}>
                        <RichText data={content?.heroContent as SerializedEditorState} />
                    </div>
                </section>

                <Hr className="mx-auto -mt-6 max-w-[75%] lg:hidden" />

                {/* Wellness Wheel Section */}
                <section className={`${styles.section} ${styles.wheelSection}`}>
                    <div className={`${styles.card} ${styles.wheelCard}`}>
                        <div className={styles.textContent}>
                            <RichText data={content?.wellnessWheelTopContent as SerializedEditorState} />
                        </div>
                        <div className={styles.wheelContainer}>
                            <WellnessWheel
                                wellnessDimensions={(content?.wellnessWheelDimensions || []).map((dim) => ({
                                    title: dim.name,
                                    description: dim.description,
                                    color: dim.color,
                                }))}
                            />
                        </div>
                        <div className={styles.textContent}>
                            <RichText data={content?.wellnessWheelBottomContent as SerializedEditorState} />
                        </div>
                    </div>
                </section>

                <Hr className="mx-auto -mt-10 mb-12 max-w-[75%] lg:hidden" />

                {/* Additional Sections */}
                <section className={styles.section}>
                    <div className="grid gap-8 md:gap-12 lg:gap-16">
                        {content?.sections?.map((section, index) => (
                            <article key={index} className={styles.card}>
                                <div className={styles.textContent}>
                                    <RichText data={section.content as SerializedEditorState} />
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageFromCMS("holistic-wellness");
    return {
        ...(page && {
            title: page.title,
            description: page.seoDescription,
        }),
    };
}
