import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Volunteer } from "@/payload-types";
import { formatInTimeZone } from "date-fns-tz/formatInTimeZone";

type Position = Volunteer["positions"][0];

export function VolunteerCard(props: Position) {
    const montrealTz = "America/Toronto";
    const formattedDate = formatInTimeZone(props.datePosted, montrealTz, "yyyy-MM-dd");

    return (
        <div className={`group relative overflow-hidden rounded-lg border border-cBorder bg-cBackgroundOffset p-6 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 md:p-8 dark:hover:border-blue-800 dark:hover:shadow-blue-950/50 ${!props.isOpen && "opacity-75 grayscale"}`}>
            <div className="space-y-4">
                {/* Header section */}
                <div className="flex justify-between">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-cText group-hover:text-blue-600 md:text-3xl dark:group-hover:text-blue-400">{props.title}</h3>
                        <p className="flex items-center gap-2 text-base text-cTextOffset">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Posted {formattedDate}
                        </p>
                    </div>
                    <span className={`h-fit whitespace-nowrap rounded-full px-4 py-1.5 text-base font-medium ${props.isOpen ? "bg-green-500/10 text-green-600 ring-1 ring-green-500/20 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/20" : "bg-red-500/10 text-red-600 ring-1 ring-red-500/20 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20"}`}>{props.isOpen ? "Open" : "Closed"}</span>
                </div>

                {/* Description section */}
                <div className="prose prose-base max-w-none text-cTextOffset dark:prose-invert">
                    <RichText data={props.description} />
                </div>

                {/* Requirements section */}
                <div className="space-y-2">
                    <h4 className="flex items-center gap-2 text-base font-semibold text-cText">
                        <svg className="h-5 w-5 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Requirements
                    </h4>
                    <div className="prose prose-base max-w-none text-cTextOffset dark:prose-invert">
                        <RichText data={props.requirements} />
                    </div>
                </div>

                {/* Time Commitment section */}
                <div className="space-y-2">
                    <h4 className="flex items-center gap-2 text-base font-semibold text-cText">
                        <svg className="h-5 w-5 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Time Commitment
                    </h4>
                    <p className="text-base text-cTextOffset">{props.timeCommitment}</p>
                </div>

                {/* Apply button */}
                {props.isOpen && (
                    <div className="pt-2">
                        <a href={props.formLink} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-lg bg-blue-500 px-5 py-2.5 text-base font-medium text-white transition-colors hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500">
                            Apply Now
                            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
