import Link from "next/link";
import type { AnnouncementBar } from "@/payload-types";

export function AnnouncementBar({ isEnabled = false, message, link }: AnnouncementBar) {
    if (!isEnabled) return null;

    return (
        <div className="absolute inset-x-0 top-0 z-30 bg-gradient-to-r from-mindvista-800 to-mindvista-700 text-white dark:from-mindvista-950 dark:to-mindvista-800">
            <div className="mx-auto flex max-w-7xl items-center justify-center p-3 text-center sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6">
                    {message}
                    {link && (
                        <>
                            <span className="mx-2" aria-hidden="true">
                                &middot;
                            </span>
                            <Link href={link.href} className="whitespace-nowrap font-semibold hover:text-mindvista-50 dark:hover:text-mindvista-400">
                                {link.text} <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}
