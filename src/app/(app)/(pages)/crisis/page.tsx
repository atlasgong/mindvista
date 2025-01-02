"use client";

import Hr from "../../components/Hr";

export default function CrisisPage() {
    return (
        <>
            <style jsx>{`
                @keyframes emergency-pulse {
                    0%,
                    100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.9;
                    }
                }
                .emergency-pulse {
                    animation: emergency-pulse 2s ease-in-out infinite;
                }
            `}</style>

            <div className="container mx-auto max-w-4xl px-4 py-8">
                {/* Emergency Number Section */}
                <div className="mb-16 text-center">
                    <p className="mb-0 text-2xl font-medium text-[var(--text)]">DIAL</p>

                    <h1 className="emergency-pulse mb-1 bg-gradient-to-r from-red-400 to-red-700 bg-clip-text text-9xl font-bold leading-none text-transparent dark:from-red-500 dark:to-rose-400">911</h1>

                    <p className="text-2xl font-medium text-[var(--text)]">
                        If you or someone else is in <span className="text-red-600 dark:text-red-500">immediate danger</span>.
                    </p>
                </div>

                {/* Crisis Resources Grid */}
                <div className="grid gap-8 md:grid-cols-2">
                    {/* 24/7 Support by Talk Suicide Canada */}
                    <div className="border-cBorder bg-cBackgroundOffset rounded-lg border p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(15,23,42,0.2)]">
                        <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">24/7 Support Line</h2>
                        <p className="mb-4 text-[var(--text-offset)]">Talk to someone anytime, day or night.</p>
                        <div className="mb-2 text-xl font-bold text-[var(--text)]">1-833-456-4566</div>
                        <p className="text-sm text-[var(--text-offset)]">Talk Suicide Canada (Toll Free)</p>
                        <a href="https://talksuicide.ca/" className="mt-2 inline-block text-[var(--accent)] hover:opacity-80">
                            Learn More →
                        </a>
                    </div>

                    {/* Student Support (Keep.meSAFE) */}
                    <div className="border-cBorder bg-cBackgroundOffset rounded-lg border p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(15,23,42,0.2)]">
                        <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">Student Support (Keep.meSAFE)</h2>
                        <p className="mb-4 text-[var(--text-offset)]">Free, confidential, emotional support for students.</p>
                        <div className="space-y-2 text-[var(--text)]">
                            <div>
                                <strong>North America:</strong> 1-844-451-9700
                            </div>
                            <div>
                                <strong>International:</strong> 001-416-380-6578
                            </div>
                        </div>
                        <a href="https://myssp.app/ca/home" className="mt-2 inline-block text-[var(--accent)] hover:opacity-80">
                            Access Services →
                        </a>
                    </div>

                    {/* SSMU Students' Nightline */}
                    <div className="border-cBorder bg-cBackgroundOffset rounded-lg border p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(15,23,42,0.2)]">
                        <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">SSMU Students&apos; Nightline</h2>
                        <p className="mb-4 text-[var(--text-offset)]">Confidential listening service by students, for students.</p>
                        <div className="mb-2 text-xl font-bold text-[var(--text)]">514-398-6246</div>
                        <p className="text-sm text-[var(--text-offset)]">Available Monday-Sunday, 6PM-3AM</p>
                        <a href="https://nightline.ssmu.ca/" className="mt-2 inline-block text-[var(--accent)] hover:opacity-80">
                            More Information →
                        </a>
                    </div>

                    {/* McGill's Peer Support Center */}
                    <div className="border-cBorder bg-cBackgroundOffset rounded-lg border p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(15,23,42,0.2)]">
                        <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">McGill&apos;s Peer Support Centre</h2>
                        <p className="mb-4 text-[var(--text-offset)]">45-minute sessions with trained student supporters.</p>
                        <ul className="mb-4 list-inside list-disc text-[var(--text-offset)]">
                            <li>Drop-in sessions available</li>
                            <li>Appointment booking</li>
                            <li>Resource navigation assistance</li>
                        </ul>
                        <a href="https://psc.ssmu.ca/" className="mt-2 inline-block text-[var(--accent)] hover:opacity-80">
                            Book a Session →
                        </a>
                    </div>
                </div>

                <Hr />

                {/* Additional Resources */}
                <div className="border-cBorder bg-cBackgroundOffset my-12 rounded-lg border p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(15,23,42,0.2)]">
                    <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">Additional Resources</h2>
                    <p className="mb-4 text-[var(--text-offset)]">If you&apos;re here to help you find the right resources.</p>
                    <button className="rounded px-4 py-2 font-bold text-white [background:var(--color-gradient)] hover:opacity-90"> Find Support </button>
                    {/* TODO: initalize button to redirect...somewhere */}
                </div>
            </div>
        </>
    );
}
