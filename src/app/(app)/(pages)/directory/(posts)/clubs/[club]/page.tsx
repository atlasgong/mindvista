import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayloadClient } from "@/payloadClient";

type Props = {
    params: {
        club: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const club = await getClub(params.club);
    if (!club) return { title: "Club Not Found" };

    return {
        title: `${club.title} - MindVista`,
        description: club.description,
    };
}

async function getClub(slug: string) {
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
    const club = await getClub(params.club);
    if (!club) return notFound();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-4 text-4xl font-bold">{club.title}</h1>

                <div className="mb-6">
                    {club.tags?.map((tag: any) => (
                        <span key={tag.id} className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm">
                            {tag.name}
                        </span>
                    ))}
                </div>

                <div className="prose mb-8 max-w-none">
                    <p className="text-lg">{club.description}</p>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {club.website && (
                        <div>
                            <h2 className="mb-2 text-xl font-semibold">Website</h2>
                            <a href={club.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {club.website}
                            </a>
                        </div>
                    )}

                    {club.email && (
                        <div>
                            <h2 className="mb-2 text-xl font-semibold">Contact Email</h2>
                            <a href={`mailto:${club.email}`} className="text-blue-600 hover:underline">
                                {club.email}
                            </a>
                        </div>
                    )}

                    {club.phoneNumber && (
                        <div>
                            <h2 className="mb-2 text-xl font-semibold">Phone Number</h2>
                            <a href={`tel:${club.phoneNumber}`} className="text-blue-600 hover:underline">
                                {club.phoneNumber}
                            </a>
                        </div>
                    )}
                </div>

                {(club.facebook || club.instagram || (club.otherSocials && club.otherSocials?.length > 0)) && (
                    <div className="mb-8">
                        <h2 className="mb-4 text-2xl font-semibold">Social Media</h2>
                        <div className="space-y-2">
                            {club.facebook && (
                                <a href={club.facebook} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline">
                                    Facebook
                                </a>
                            )}
                            {club.instagram && (
                                <a href={club.instagram} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline">
                                    Instagram
                                </a>
                            )}
                            {club.otherSocials?.map((social: any, index: number) => (
                                <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline">
                                    {social.platform}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}