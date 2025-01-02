import type { IconType } from "react-icons";

interface Props {
    icon: IconType;
    iconName: string;
    title: string;
    description: string;
}

export default function MentalWellnessFact({ icon: Icon, iconName, title, description }: Props) {
    return (
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-start">
            <Icon title={iconName} className="text-cBackground bg-cAccent h-12 w-12 rounded-full p-2" />

            <div className="flex flex-col">
                <h3 className="mb-1 text-xl font-bold tracking-tight">{title}</h3>
                <p className="text-md text-cTextOffset font-medium sm:max-w-[95%]">{description}</p>
            </div>
        </div>
    );
}
