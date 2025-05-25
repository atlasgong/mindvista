import { RefreshRouteOnSave } from "@/app/(app)/components/RefreshRouteOnSave";
import { Fragment } from "react";
import { getPayloadClient } from "@/payloadClient";
import { getPageFromCMS } from "@/lib/getPageFromCMS";
import { Metadata } from "next";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import Image from "next/image";
import Hr from "../../components/Hr";
import styles from "./styles.module.css";
import { About, Media } from "@/payload-types";

type TeamMember = About["teams"][number]["members"][number];
type TeamSection = About["teams"][number];

/**
 * Inline TeamSection component – purely presentational.
 */
function TeamSection({ title, members }: TeamSection) {
    return (
        <section className={styles.teamSection}>
            <h2 className={styles.teamTitle}>{title}</h2>
            <div className={styles.teamGrid}>
                {members.map((member: TeamMember) => (
                    <div key={member.name} className={styles.teamCard}>
                        <div className={styles.teamImageWrapper}>
                            <Image src={(member.image as Media)?.url || "/team/avatarPlaceholder.png"} alt={(member.image as Media)?.url || member.name} width={500} height={500} className={styles.teamImage} />
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
    const content = await (await getPayloadClient()).findGlobal({ slug: "about" });

    const groupPhotoUrl = (content?.groupPhoto as Media)?.url;

    return (
        <Fragment>
            <RefreshRouteOnSave />
            <div className={styles.container}>
                <div className={styles.mainContent}>
                    {/* Hero Section */}
                    <section className={`${styles.section} ${styles.heroSection}`}>
                        {/* Add "group" class here so children can use group-hover */}
                        <div className={`${styles.heroImageWrapper} group`}>
                            {groupPhotoUrl ? <Image src={(content.groupPhoto as Media).url as string} alt="MindVista Team" width={1920} height={1280} className={styles.heroImage} /> : <div>Error: Group photo is not set in Payload.</div>}
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
    const page = await getPageFromCMS("about");
    return {
        ...(page && {
            title: page.title,
            description: page.seoDescription,
        }),
    };
}
