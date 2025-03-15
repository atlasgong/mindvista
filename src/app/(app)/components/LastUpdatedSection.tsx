import { formatInTimeZone } from "date-fns-tz";

export default function LastUpdatedSection({ updatedAt }: { updatedAt: Date }) {
    const montrealTz = "America/Toronto";
    const formattedDate = formatInTimeZone(updatedAt, montrealTz, "yyyy-MM-dd");

    return (
        <div className="mt-6 flex justify-center text-cTextOffset">
            <p>Last updated: {formattedDate}</p>
        </div>
    );
}
