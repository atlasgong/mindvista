import { Suspense } from "react";
import Link from "next/link";
import EntityCount from "./components/EntityCount";
import { getPageFromCMS } from "@/lib/getPageFromCMS";
import { Metadata } from "next";

export default function DirectoryPage() {
    return (
        <div className="mx-auto mb-14 max-w-7xl px-4 py-8 sm:px-8 md:px-12 lg:px-20">
            <header className="mb-12 mt-8 text-center">
                <h1 className="mb-4 text-4xl font-bold text-cText">Directory</h1>
                <p className="text-xl text-cTextOffset">Browse through our collection of clubs and resources.</p>
            </header>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Clubs Card */}
                <Link href="/directory/clubs" className="block rounded-lg border border-cBorder bg-cBackgroundOffset p-8 shadow-lg transition-all duration-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 dark:hover:border-blue-800 dark:hover:shadow-blue-950/50">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-cText md:text-3xl">Clubs</h2>
                        <span className="rounded-full bg-cBackgroundOffsetAccent px-3 py-1 text-sm font-medium text-cText md:px-4 md:py-2 md:text-base">
                            <Suspense fallback="... clubs">
                                <EntityCount collection="clubs" />
                            </Suspense>
                        </span>
                    </div>
                    <p className="mb-6 text-cTextOffset">Browse and discover student clubs and organizations. Filter by categories, status, and more.</p>
                    <span className="inline-flex items-center font-medium text-cAccent">
                        Browse Clubs
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </span>
                </Link>

                {/* Resources Card */}
                <Link href="/directory/resources" className="block rounded-lg border border-cBorder bg-cBackgroundOffset p-8 shadow-lg transition-all duration-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 dark:hover:border-blue-800 dark:hover:shadow-blue-950/50">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-cText md:text-3xl">Resources</h2>
                        <span className="rounded-full bg-cBackgroundOffsetAccent px-3 py-1 text-sm font-medium text-cText md:px-4 md:py-2 md:text-base">
                            <Suspense fallback="... resources">
                                <EntityCount collection="resources" />
                            </Suspense>
                        </span>
                    </div>
                    <p className="mb-6 text-cTextOffset">Find helpful resources and services. Filter by availability, insurance coverage, and categories.</p>
                    <span className="inline-flex items-center font-medium text-cAccent">
                        Browse Resources
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </span>
                </Link>
            </div>
        </div>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageFromCMS("directory");
    return {
        ...(page && {
            title: page.title,
            description: page.seoDescription,
        }),
    };
}
