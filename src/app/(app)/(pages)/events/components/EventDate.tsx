import { formatInTimeZone } from "date-fns-tz";

interface EventDateProps {
    startDate: string | Date;
    endDate: string | Date;
    className?: string;
    compact?: boolean;
}

export function EventDate({ startDate, endDate, className = "", compact = false }: EventDateProps) {
    // convert dates to mtl timezone (America/Toronto)
    const montrealTz = "America/Toronto";
    const start = new Date(startDate);
    const end = new Date(endDate);

    // check if dates are on the same day
    const isSameDay = start.toDateString() === end.toDateString();

    // format dates based on compact prop
    const dateFormat = compact ? "MMM d" : "MMM d, yyyy";
    const timeFormat = "h:mm a";

    return (
        <p className={className}>
            {formatInTimeZone(start, montrealTz, dateFormat)} | {formatInTimeZone(start, montrealTz, timeFormat)}
            {" - "}
            {isSameDay ? formatInTimeZone(end, montrealTz, timeFormat) : `${formatInTimeZone(end, montrealTz, dateFormat)} | ${formatInTimeZone(end, montrealTz, timeFormat)}`}
        </p>
    );
}
