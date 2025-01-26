import { format } from "date-fns";
import { FiCalendar } from "react-icons/fi";

interface DateRange {
    startDate: string;
    endDate: string;
}

interface DateRangesSectionProps {
    dateRanges: DateRange[];
    isOngoing?: boolean;
}

export default function DateRangesSection({ dateRanges, isOngoing }: DateRangesSectionProps) {
    return (
        <div className="flex h-full flex-col rounded-2xl border border-cBorder bg-cBackgroundOffset p-6 shadow-sm transition-all hover:shadow-md md:p-8">
            <div className="mb-6 flex items-center gap-2">
                <FiCalendar className="h-5 w-5 text-cTextOffset" />
                <h2 className="text-xl font-semibold text-cText">Date & Time</h2>
            </div>
            <div className="space-y-4">
                {dateRanges.map((range, index) => (
                    <div key={index} className="text-lg text-cTextOffset">
                        {format(new Date(range.startDate), "MMM d, yyyy h:mm a")}
                        {" - "}
                        {format(new Date(range.endDate), "MMM d, yyyy h:mm a")}
                    </div>
                ))}
                {isOngoing && <div className="w-fit rounded-full bg-green-500 px-3 py-1 text-sm font-medium text-white">Ongoing</div>}
            </div>
        </div>
    );
}
