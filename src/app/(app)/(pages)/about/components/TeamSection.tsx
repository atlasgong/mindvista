import Image from "next/image";

interface TeamMember {
    role: string;
    name: string;
    pronouns: string;
    image: string;
}

interface Props {
    title: string;
    members: TeamMember[];
}

export default function TeamSection(props: Props) {
    const isMarketingTeam = props.title === "Marketing + Social Media Team";

    return (
        <section className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-cText">{props.title}</h2>
            <div
                className={`${
                    isMarketingTeam
                        ? "grid grid-cols-1 gap-8 sm:grid-cols-2" // 2x2 grid for Marketing Team
                        : "flex flex-wrap justify-center gap-8" // Default flex for others
                }`}
            >
                {props.members.map((member) => (
                    <div key={member.name} className={`flex flex-col items-center rounded-xl bg-cBackgroundOffset p-6 text-center shadow-lg dark:bg-mindvista-950 ${isMarketingTeam ? "w-full" : "w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]"}`}>
                        <div className="mb-4 h-40 w-40 overflow-hidden rounded-full">
                            <Image src={member.image} alt={member.name} width={500} height={500} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-row items-center justify-center">
                            <h3 className="text-xl font-semibold text-cText">{member.name}</h3>
                            {member.pronouns !== "" && <span className="ml-1 text-sm italic text-cTextOffset">({member.pronouns})</span>}
                        </div>
                        <p className="font-medium text-cTextOffset">{member.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
