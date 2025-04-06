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
 * Types for the Payload global "about" content.
 * - groupPhoto is now required and expected to be an object with a URL.
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
    groupPhoto: { url: string };
    title?: string;
    introduction?: SerializedEditorState;
    initiativeDetails?: SerializedEditorState;
    teams?: TeamSectionData[];
}

/**
 * Inline TeamSection component – purely presentational.
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

    // If no content or group photo is found, display an error message.
    if (!content || !content.groupPhoto || !content.groupPhoto.url) {
        return <div>Error: Group photo is not set in Payload.</div>;
    }

    return (
        <Fragment>
            <RefreshRouteOnSave />
            <div className={styles.container}>
                <div className={styles.mainContent}>
                    {/* Hero Section */}
                    <section className={`${styles.section} ${styles.heroSection}`}>
                        {/* Add "group" class here so children can use group-hover */}
                        <div className={`${styles.heroImageWrapper} group`}>
                            <Image src={content.groupPhoto.url} alt="MindVista Team" width={1920} height={1280} className={styles.heroImage} />
                            <div className={styles.heroOverlay}></div>
                            <div className={styles.heroCaption}>
                                <h3 className={styles.heroCaptionTitle}>MindVista Team 2024-2025</h3>
                                <p className={styles.heroCaptionSubtitle}>Committed to student wellness and engagement.</p>
                            </div>
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
    const page = await getPayloadClient().then((client) => client.findGlobal({ slug: "about" }));
    return {
        title: page?.title || "About MindVista",
        description: (page as any)?.seoDescription || "Committed to student wellness and engagement.",
    };
}
