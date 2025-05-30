import { ContactInfo } from "./ContactSection";
import { Tag } from "./TagsSection";

export interface PostLayoutProps {
    title: string;
    description: string;
    tags?: (Tag | number)[];
    contactInfo: ContactInfo;
    status?: {
        isActive?: boolean;
        label: string;
    };
}

export default function PostHeader({ title, description, status }: Pick<PostLayoutProps, "title" | "description" | "status">) {
    return (
        <div className="mb-6 rounded-2xl border border-cBorder bg-cBackgroundOffset p-6 shadow-sm transition-all hover:shadow-md md:p-8 lg:p-10">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="text-2xl font-bold leading-tight text-cText sm:text-3xl lg:text-4xl">{title}</h1>
                {/* toggle - set to true to show active status */}
                {(() => {
                    const SHOW_STATUS = false;
                    return SHOW_STATUS ? status && <span className={`w-fit whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ${status.isActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300" : "bg-cRed/10 text-cRed dark:bg-red-500/20 dark:text-red-300"}`}>{status.label}</span> : null;
                })()}
            </div>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-cTextOffset sm:text-lg">{description}</p>
        </div>
    );
}
