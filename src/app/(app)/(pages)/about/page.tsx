import { RefreshRouteOnSave } from "@/app/(app)/components/RefreshRouteOnSave";
import { Fragment } from "react";
import { getPayloadClient } from "@/payloadClient";
import { Metadata } from "next";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import Image from "next/image";
import Hr from "../../components/Hr";
import styles from "./styles.module.css";

/**
 * Types for Payload global data.
 * - groupPhoto can be either a number (ID) or an object with a URL.
 */
interface TeamMember {
    role: string;
    name: string;
    pronouns?: string;
    image?: string;
}

interface TeamSectionData {
    title: string;
    members: TeamMember[];
}

interface AboutContent {
    groupPhoto?: { url: string } | number;
    title?: string;
    introduction?: SerializedEditorState;
    initiativeDetails?: SerializedEditorState;
    teams?: TeamSectionData[];
    // Note: seoDescription is not defined on the global schema, so we use a fallback.
}

/**
 * Inline TeamSection component.
 */
function TeamSection({ title, members }: TeamSectionData) {
    return (
        <section className={styles.teamSection}>
            <h2 className={styles.teamTitle}>{title}</h2>
            <div className={styles.teamGrid}>
                {members.map((member) => (
                    <div key={member.name} className={styles.teamCard}>
                        <div className={styles.teamImageWrapper}>
                            <Image src={member.image || "/team/avatarPlaceholder.png"} alt={member.name} width={500} height={500} className={styles.teamImage} />
                        </div>
                        <div className={styles.memberInfo}>
                            <h3 className={styles.memberName}>{member.name}</h3>
                            {member.pronouns && <span className={styles.memberPronouns}>({member.pronouns})</span>}
                            <p className={styles.memberRole}>{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default async function AboutPage() {
    // Fetch the global "about" content from Payload
    const content = (await (await getPayloadClient()).findGlobal({ slug: "about" })) as AboutContent | null;

    return (
        <Fragment>
            <RefreshRouteOnSave />
            <div className={styles.container}>
                <div className={styles.mainContent}>
                    {/* Hero Section */}
                    <section className={`${styles.section} ${styles.heroSection}`}>
                        <div className={styles.heroImageWrapper}>
                            <Image src={typeof content?.groupPhoto === "object" && content?.groupPhoto?.url ? content.groupPhoto.url : "/team/group-photo.webp"} alt="MindVista Team" width={1920} height={1280} className={styles.heroImage} />
                        </div>
                        <div className={styles.textContent}>
                            <h1 className={styles.title}>{content?.title}</h1>
                        </div>
                    </section>

                    <Hr className="mx-auto" />

                    {/* Introduction Section */}
                    <section className={styles.section}>
                        <div className={styles.textContent}>
                            <RichText data={content?.introduction as SerializedEditorState} />
                        </div>
                    </section>

                    <Hr className="mx-auto" />

                    {/* Initiative Details Section */}
                    <section className={styles.section}>
                        <div className={styles.textContent}>
                            <RichText data={content?.initiativeDetails as SerializedEditorState} />
                        </div>
                    </section>

                    <Hr className="mx-auto" />

                    {/* Team Sections */}
                    {content?.teams?.map((team, index) => <TeamSection key={index} title={team.title} members={team.members} />)}
                </div>
            </div>
        </Fragment>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    // Here we cast page as any to allow for seoDescription fallback,
    // since the global might not include that property.
    const page = await getPayloadClient().then((client) => client.findGlobal({ slug: "about" }));
    return {
        title: page?.title || "About MindVista",
        description: (page as any)?.seoDescription || "Committed to student wellness and engagement.",
    };
}
