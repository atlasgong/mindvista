import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Volunteer } from "@/payload-types";
import { formatInTimeZone } from "date-fns-tz/formatInTimeZone";

type Position = Volunteer["positions"][0];

export function VolunteerCard(props: Position) {
    const montrealTz = "America/Toronto";
    const formattedDate = formatInTimeZone(props.datePosted, montrealTz, "yyyy-MM-dd");

    return (
        <div className={`relative overflow-hidden rounded-xl border-2 border-transparent bg-white p-6 shadow-lg transition-all duration-300 hover:border-mindvista-700/20 hover:shadow-xl sm:p-8 md:p-10 lg:p-12 dark:bg-mindvista-950 dark:hover:border-mindvista-400/40 ${!props.isOpen && "opacity-75 grayscale"}`}>
            <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h3 className="mb-2 text-2xl font-bold text-mindvista-950 sm:text-2xl md:text-3xl dark:text-mindvista-400">{props.title}</h3>
                    <p className="text-sm text-cTextOffset">Posted {formattedDate}</p>
                </div>
                <span className={`self-start whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium sm:self-auto sm:px-4 ${props.isOpen ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"}`}>{props.isOpen ? "Open" : "Closed"}</span>
            </div>

            <div className="prose prose-base mb-6 max-w-none text-cTextOffset sm:prose-lg dark:prose-invert sm:mb-8 dark:text-mindvista-400">
                <RichText data={props.description} />
            </div>

            <div className="mb-6 sm:mb-8">
                <h4 className="mb-3 text-lg font-semibold text-mindvista-800 sm:mb-4 sm:text-xl dark:text-mindvista-400">Requirements</h4>
                <div className="prose prose-base max-w-none text-cTextOffset sm:prose-lg dark:prose-invert dark:text-mindvista-400">
                    <RichText data={props.requirements} />
                </div>
            </div>

            <div className="mb-8 sm:mb-10">
                <h4 className="mb-2 text-lg font-semibold text-mindvista-800 sm:text-xl dark:text-mindvista-400">Time Commitment</h4>
                <p className="text-base text-cTextOffset sm:text-lg dark:text-mindvista-400">{props.timeCommitment}</p>
            </div>

            {props.isOpen && (
                <a href={props.formLink} target="_blank" rel="noopener noreferrer" className="group relative inline-block w-full overflow-hidden rounded-lg bg-mindvista-800 p-px font-medium text-white transition-colors hover:bg-mindvista-700 dark:bg-mindvista-400 dark:hover:bg-mindvista-700">
                    <span className="relative block rounded-lg bg-mindvista-800 px-6 py-3 text-center text-base font-semibold transition-colors group-hover:bg-mindvista-700 sm:px-8 sm:py-4 sm:text-lg dark:bg-mindvista-400 dark:group-hover:bg-mindvista-700">Apply Now</span>
                </a>
            )}
        </div>
    );
}
