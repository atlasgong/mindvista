import { getPayloadClient } from "@/payloadClient";
import Link from "next/link";

export default async function DirectoryPage() {
    const payload = await getPayloadClient();

    const [clubCount, resourceCount] = await Promise.all([payload.count({ collection: "clubs" }).then((res) => res.totalDocs), payload.count({ collection: "resources" }).then((res) => res.totalDocs)]);

    return (
        <div className="mx-auto mb-14 max-w-7xl px-4 py-8 sm:px-8 md:px-12 lg:px-20">
            <header className="mb-12 mt-8 text-center">
                <h1 className="mb-4 text-4xl font-bold text-cText">Directory</h1>
                <p className="text-xl text-cTextOffset">Browse through our collection of clubs and resources.</p>
            </header>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Clubs Card */}
                <Link href="/directory/clubs" className="block rounded-lg border border-cBorder bg-cBackgroundOffset p-8 shadow-lg transition-shadow hover:shadow-xl">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-3xl font-bold text-cText">Clubs</h2>
                        <span className="rounded-full bg-cBackgroundOffsetAccent px-4 py-2 font-medium text-cText">
                            {clubCount} {clubCount === 1 ? "Club" : "Clubs"}
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
                <Link href="/directory/resources" className="block rounded-lg border border-cBorder bg-cBackgroundOffset p-8 shadow-lg transition-shadow hover:shadow-xl">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-3xl font-bold text-cText">Resources</h2>
                        <span className="rounded-full bg-cBackgroundOffsetAccent px-4 py-2 font-medium text-cText">
                            {resourceCount} {resourceCount === 1 ? "Resource" : "Resources"}
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
