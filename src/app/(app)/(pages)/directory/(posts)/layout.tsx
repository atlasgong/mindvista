import React from "react";
import Link from "next/link";
import { FiGlobe, FiMail, FiPhone, FiTag } from "react-icons/fi";

interface ContactInfo {
    website?: string;
    email?: string;
    phoneNumber?: string;
}

interface Tag {
    id: string | number;
    name?: string;
}

export interface PostLayoutProps {
    title: string;
    description: string;
    tags?: (Tag | number)[];
    contactInfo: ContactInfo;
    status?: {
        isActive?: boolean;
        label: string;
    };
}

export default function PostsLayout({ children }: { children: React.ReactNode }) {
    return <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-10 md:px-[7.5vw] lg:px-[15vw]">{children}</div>;
}

export function PostHeader({ title, description, status }: Pick<PostLayoutProps, "title" | "description" | "status">) {
    return (
        <div className="mb-6 rounded-2xl border border-cBorder bg-cBackgroundOffset p-6 shadow-sm transition-all hover:shadow-md md:p-8 lg:p-10">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="text-2xl font-bold leading-tight text-cText sm:text-3xl lg:text-4xl">{title}</h1>
                {/* toggle - set to true to show active status */}
                {(() => {
                    const SHOW_STATUS = false;
                    return SHOW_STATUS ? status && <span className={`w-fit whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ${status.isActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300" : "bg-cRed/10 text-cRed dark:bg-red-500/20 dark:text-red-300"}`}>{status.label}</span> : null;
                })()}
            </div>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-cTextOffset sm:text-lg">{description}</p>
        </div>
    );
}

export function ContactSection({ contactInfo }: { contactInfo: ContactInfo }) {
    if (!contactInfo.website && !contactInfo.email && !contactInfo.phoneNumber) return null;

    return (
        <div className="flex h-full flex-col rounded-2xl border border-cBorder bg-cBackgroundOffset p-6 shadow-sm transition-all hover:shadow-md md:p-8">
            <h2 className="mb-6 text-xl font-semibold text-cText">Contact Information</h2>
            <div className="space-y-4">
                {contactInfo.website && (
                    <div className="group">
                        <Link href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-cAccent transition-colors hover:text-cPurple">
                            <FiGlobe className="mt-0.5 h-5 w-5 flex-shrink-0" />
                            <span className="break-all group-hover:underline">{contactInfo.website}</span>
                        </Link>
                    </div>
                )}
                {contactInfo.email && (
                    <div className="group">
                        <Link href={`mailto:${contactInfo.email}`} className="flex items-start gap-3 text-cAccent transition-colors hover:text-cPurple">
                            <FiMail className="mt-0.5 h-5 w-5 flex-shrink-0" />
                            <span className="break-all group-hover:underline">{contactInfo.email}</span>
                        </Link>
                    </div>
                )}
                {contactInfo.phoneNumber && (
                    <div className="group">
                        <Link href={`tel:${contactInfo.phoneNumber}`} className="flex items-start gap-3 text-cAccent transition-colors hover:text-cPurple">
                            <FiPhone className="mt-0.5 h-5 w-5 flex-shrink-0" />
                            <span className="group-hover:underline">{contactInfo.phoneNumber}</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export function TagsSection({ tags }: { tags: (Tag | number)[] }) {
    if (!tags || tags.length === 0) return null;

    return (
        <div className="mx-[5vw] mt-10 flex justify-center">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <FiTag className="h-5 w-5 text-cTextOffset" />
                    <span className="text-base font-semibold text-cText">Tags:</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {tags.map((tag) => (
                        <span key={typeof tag === "number" ? tag : tag.id} className="inline-block rounded-full bg-cBackgroundOffsetAccent px-3 py-1 text-sm text-cAccent transition-colors hover:bg-cBackgroundOffset">
                            {typeof tag === "number" ? tag : tag.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
