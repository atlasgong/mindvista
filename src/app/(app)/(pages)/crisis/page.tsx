import { Metadata } from "next";
// import Hr from "../../components/Hr";
import { getPageFromCMS } from "@/lib/getPageFromCMS";
import Link from "next/link";

export default function CrisisPage() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            {/* Emergency Number Section */}
            <div className="mb-16 text-center">
                <p className="mb-0 text-2xl font-medium text-[var(--text)]">DIAL</p>

                <h1 className="mb-1 animate-emergency-pulse bg-gradient-to-r from-red-400 to-red-700 bg-clip-text text-9xl font-bold leading-none text-transparent dark:from-red-500 dark:to-rose-400">911</h1>

                <p className="text-2xl font-medium text-[var(--text)]">
                    If you or someone else is in <span className="text-red-600 dark:text-red-500">immediate danger</span>.
                </p>
            </div>

            {/* Crisis Resources Grid */}
            <div className="mb-8 grid gap-8 md:grid-cols-2">
                {/* 24/7 Support by Talk Suicide Canada */}
                <div className="rounded-lg border border-cBorder bg-cBackgroundOffset p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 dark:shadow-[0_4px_20px_rgb(15,23,42,0.2)] dark:hover:border-blue-800 dark:hover:shadow-blue-950/50">
                    <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">24/7 Support Line</h2>
                    <p className="mb-4 text-[var(--text-offset)]">Talk to someone anytime, day or night.</p>
                    <div className="mb-2 text-xl font-bold text-[var(--text)]">1-833-456-4566</div>
                    <p className="text-sm text-[var(--text-offset)]">Talk Suicide Canada (Toll Free)</p>
                    <Link href="https://talksuicide.ca/" target="_blank" className="mt-2 inline-block text-[var(--accent)] hover:opacity-80">
                        Learn More →
                    </Link>
                </div>

                {/* Student Support (GuardMe) */}
                <div className="rounded-lg border border-cBorder bg-cBackgroundOffset p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 dark:shadow-[0_4px_20px_rgb(15,23,42,0.2)] dark:hover:border-blue-800 dark:hover:shadow-blue-950/50">
                    <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">Student Support (GuardMe)</h2>
                    <p className="mb-4 text-[var(--text-offset)]">Free, confidential, emotional support for students.</p>
                    <div className="space-y-2 text-[var(--text)]">
                        <div>
                            <strong>North America:</strong> 1-844-451-9700
                        </div>
                        <div>
                            <strong>International:</strong> 001-416-380-6578
                        </div>
                    </div>
                    <Link href="https://gmssp.org/" target="_blank" className="mt-2 inline-block text-[var(--accent)] hover:opacity-80">
                        Access Services →
                    </Link>
                </div>

                {/* SSMU Students' Nightline */}
                <div className="rounded-lg border border-cBorder bg-cBackgroundOffset p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 dark:shadow-[0_4px_20px_rgb(15,23,42,0.2)] dark:hover:border-blue-800 dark:hover:shadow-blue-950/50">
                    <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">SSMU Students&apos; Nightline</h2>
                    <p className="mb-4 text-[var(--text-offset)]">Confidential listening service by students, for students.</p>
                    <div className="mb-2 text-xl font-bold text-[var(--text)]">514-398-6246</div>
                    <p className="text-sm text-[var(--text-offset)]">Available Monday-Sunday, 6PM-3AM</p>
                    <Link href="https://nightline.ssmu.ca/" target="_blank" className="mt-2 inline-block text-[var(--accent)] hover:opacity-80">
                        More Information →
                    </Link>
                </div>

                {/* McGill's Peer Support Center */}
                <div className="rounded-lg border border-cBorder bg-cBackgroundOffset p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 dark:shadow-[0_4px_20px_rgb(15,23,42,0.2)] dark:hover:border-blue-800 dark:hover:shadow-blue-950/50">
                    <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">McGill&apos;s Peer Support Centre</h2>
                    <p className="mb-4 text-[var(--text-offset)]">45-minute sessions with trained student supporters.</p>
                    <ul className="mb-4 list-inside list-disc text-[var(--text-offset)]">
                        <li>Drop-in sessions available</li>
                        <li>Appointment booking</li>
                        <li>Resource navigation assistance</li>
                    </ul>
                    <Link href="https://psc.ssmu.ca/" target="_blank" className="mt-2 inline-block text-[var(--accent)] hover:opacity-80">
                        Book a Session →
                    </Link>
                </div>
            </div>

            {/* <Hr className="mt-12" /> */}

            {/* Additional Resources */}
            {/* <div className="my-12 rounded-lg border border-cBorder bg-cBackgroundOffset p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(15,23,42,0.2)]"> */}
            {/* <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">Additional Resources</h2> */}
            {/* <p className="mb-4 text-[var(--text-offset)]">If you&apos;re here to help you find the right resources.</p> */}
            {/* <button className="rounded px-4 py-2 font-bold text-white [background:var(--color-gradient)] hover:opacity-90"> Find Support </button> */}
            {/* TODO: initalize button to redirect...somewhere */}
            {/* </div> */}
        </div>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageFromCMS("crisis");
    return {
        ...(page && {
            title: page.title,
            description: page.seoDescription,
        }),
    };
}
