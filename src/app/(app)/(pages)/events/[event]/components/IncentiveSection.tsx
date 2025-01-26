import { FiGift } from "react-icons/fi";

interface IncentiveSectionProps {
    incentive: string;
    isChance?: boolean;
}

export default function IncentiveSection({ incentive, isChance }: IncentiveSectionProps) {
    return (
        <div className="flex h-full flex-col rounded-2xl border border-cBorder bg-cBackgroundOffset p-6 shadow-sm transition-all hover:shadow-md md:p-8">
            <div className="mb-6 flex items-center gap-2">
                <FiGift className="h-5 w-5 text-cTextOffset" />
                <h2 className="text-xl font-semibold text-cText">Incentive</h2>
            </div>
            <p className={`text-lg font-medium ${isChance ? "text-purple-500 dark:text-purple-400" : "text-blue-500 dark:text-blue-400"}`}>
                {isChance ? "❓" : "🎁"} {incentive}
                {isChance ? "*" : ""}
            </p>
        </div>
    );
}
