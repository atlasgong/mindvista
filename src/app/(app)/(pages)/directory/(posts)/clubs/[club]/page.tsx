import { RefreshRouteOnSave } from "@/app/(app)/components/RefreshRouteOnSave";
import { Fragment } from "react";
import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayloadClient } from "@/payloadClient";
import Link from "next/link";
import { Club } from "@/payload-types";
import { FiShare2, FiFacebook, FiInstagram, FiLink } from "react-icons/fi";
import { FaImage } from "react-icons/fa";
import TagsSection from "../../components/TagsSection";
import ContactSection from "../../components/ContactSection";
import PostHeader from "../../components/PostHeader";
import LastUpdatedSection from "../../../../../components/LastUpdatedSection";
import Image from "next/image";
import ImageModal from "@/app/(app)/components/ImageModal";

interface Props {
    params: Promise<{
        club: string;
    }>;
    searchParams: Promise<{
        [key: string]: string | string[];
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const club = await getClub((await params).club);
    if (!club) return { title: "404: Page Not Found" };

    return {
        title: `${club.title}`,
        description: club.description,
    };
}

async function getClub(slug: string): Promise<Club | null> {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
        collection: "clubs",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
    });
    return docs[0] || null;
}

export default async function ClubPage({ params }: Props) {
    const club = await getClub((await params).club);
    if (!club) return notFound();

    const tags = club.tags?.map((tag: number | { id: string | number; name?: string }) => (typeof tag === "number" ? { id: tag, name: tag.toString() } : tag)) ?? [];

    const hasSocialMedia = club.facebook || club.instagram || (club.otherSocials && club.otherSocials.length > 0);

    return (
        <Fragment>
            <RefreshRouteOnSave />
            <PostHeader
                title={club.title}
                description={club.description}
                status={{
                    isActive: club.currentlyActive || false,
                    label: club.currentlyActive ? "Active" : "Inactive",
                }}
            />

            <div className="grid auto-rows-fr grid-cols-1 gap-6 md:auto-cols-fr md:grid-flow-col">
                {/* Contact Information */}
                {(club.website || club.email || club.phoneNumber || club.newsletter) && (
                    <div className="h-full md:col-span-1">
                        <ContactSection
                            contactInfo={{
                                website: club.website || undefined,
                                email: club.email || undefined,
                                phoneNumber: club.phoneNumber || undefined,
                                newsletter: club.newsletter || undefined,
                            }}
                        />
                    </div>
                )}
                {/* Social Media */}
                {hasSocialMedia && (
                    <div className={`h-full ${!club.website && !club.email && !club.phoneNumber ? "md:col-span-2" : "md:col-span-1"}`}>
                        <div className="flex h-full flex-col rounded-2xl border border-cBorder bg-cBackgroundOffset p-6 shadow-sm transition-all hover:shadow-md md:p-8">
                            <div className="mb-6 flex items-center gap-2">
                                <FiShare2 className="h-5 w-5 text-cTextOffset" />
                                <h2 className="text-xl font-semibold text-cText">Social Media</h2>
                            </div>
                            <div className="space-y-4">
                                {club.facebook && (
                                    <div className="group">
                                        <Link href={club.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-cAccent transition-colors hover:text-cPurple">
                                            <FiFacebook className="h-5 w-5 flex-shrink-0" />
                                            <span className="font-medium">Facebook</span>
                                        </Link>
                                    </div>
                                )}
                                {club.instagram && (
                                    <div className="group">
                                        <Link href={club.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-cAccent transition-colors hover:text-cPurple">
                                            <FiInstagram className="h-5 w-5 flex-shrink-0" />
                                            <span className="font-medium">Instagram</span>
                                        </Link>
                                    </div>
                                )}
                                {club.otherSocials?.map((social: { id?: string | null; link: string }, index: number) => (
                                    <div key={social.id || index} className="group">
                                        <Link href={social.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-cAccent transition-colors hover:text-cPurple">
                                            <FiLink className="h-5 w-5 flex-shrink-0" />
                                            <span className="font-medium">Others</span>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Club Graphic */}
            {typeof club.graphic === "object" && club.graphic?.url && (
                <div className="mt-6 flex h-full flex-col rounded-2xl border border-cBorder bg-cBackgroundOffset p-6 shadow-sm transition-all hover:shadow-md md:p-8">
                    <div className="flex flex-row items-center gap-2">
                        <FaImage />
                        <h2 className="text-xl font-semibold text-cText">{club.graphicTitle}</h2>
                    </div>
                    <ImageModal className="my-8 md:mt-14" url={club.graphic.url} altText={club.graphic.alt} width={club.graphic.width || 1000} height={club.graphic.height || 1000} />
                </div>
            )}

            {/* Tags */}
            {tags.length > 0 && <TagsSection tags={tags} />}

            {/* Last Updated */}
            <LastUpdatedSection updatedAt={club.updatedAt} />
        </Fragment>
    );
}
