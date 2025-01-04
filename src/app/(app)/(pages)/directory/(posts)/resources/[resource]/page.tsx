import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayloadClient } from "@/payloadClient";
import Link from "next/link";

interface Props {
    params: {
        resource: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resource = await getResource(params.resource);
    if (!resource) return { title: "Resource Not Found" };

    return {
        title: `${resource.title} - MindVista`,
        description: resource.description,
    };
}

async function getResource(slug: string) {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
        collection: "resources",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
    });
    return docs[0] || null;
}

export default async function ResourcePage({ params, searchParams }: Props) {
    const resource = await getResource(params.resource);
    if (!resource) return notFound();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-cText">{resource.title}</h1>
                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${resource.currentlyActive ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"}`}>{resource.currentlyActive ? "Active" : "Inactive"}</span>
                </div>
                <p className="mt-4 text-lg text-cTextOffset">{resource.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                    <h2 className="mb-4 text-xl font-semibold text-cText">Contact Information</h2>
                    <div className="space-y-3">
                        {resource.website && (
                            <p>
                                <span className="font-medium">Website:</span>{" "}
                                <Link href={resource.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                    {resource.website}
                                </Link>
                            </p>
                        )}
                        {resource.email && (
                            <p>
                                <span className="font-medium">Email:</span>{" "}
                                <Link href={`mailto:${resource.email}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                    {resource.email}
                                </Link>
                            </p>
                        )}
                        {resource.phoneNumber && (
                            <p>
                                <span className="font-medium">Phone:</span>{" "}
                                <Link href={`tel:${resource.phoneNumber}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                    {resource.phoneNumber}
                                </Link>
                            </p>
                        )}
                        {resource.location && (
                            <p>
                                <span className="font-medium">Location:</span> {resource.location}
                            </p>
                        )}
                        {resource.channel && (
                            <p>
                                <span className="font-medium">Channel:</span> {resource.channel}
                            </p>
                        )}
                        {resource.onCampus && (
                            <p>
                                <span className="font-medium">On Campus:</span> {resource.onCampus}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    {resource.insuranceDetails && (
                        <div className="mb-6">
                            <h2 className="mb-4 text-xl font-semibold text-cText">Insurance Information</h2>
                            <p className="text-cTextOffset">{resource.insuranceDetails}</p>
                        </div>
                    )}
                    {resource.insuranceProviders && resource.insuranceProviders.length > 0 && (
                        <div>
                            <h2 className="mb-4 text-xl font-semibold text-cText">Insurance Providers</h2>
                            <div className="space-y-4">
                                {resource.insuranceProviders.map((provider, index) => (
                                    <div key={provider.id || index} className="rounded-lg border border-cBorder p-4">
                                        {provider.insuranceProvider.map((p, i) => (
                                            <div key={p.id || i} className="mb-2 last:mb-0">
                                                <h3 className="font-medium text-cText">{p.name}</h3>
                                                {p.description && <p className="mt-1 text-sm text-cTextOffset">{p.description}</p>}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {resource.tags && resource.tags.length > 0 && (
                <div className="mt-8">
                    <h2 className="mb-4 text-xl font-semibold text-cText">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                        {resource.tags.map((tag) => (
                            <span key={typeof tag === "number" ? tag : tag.id} className="inline-block rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                {typeof tag === "number" ? tag : tag.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
