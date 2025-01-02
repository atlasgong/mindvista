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
    return (
        <section className="mb-16">
            <h2 className="text-cText mb-8 text-center text-3xl font-bold">{props.title}</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {props.members.map((member) => (
                    <div key={member.name} className="bg-cBackgroundOffset flex flex-col items-center rounded-xl p-6 text-center shadow-lg">
                        <div className="mb-4 h-40 w-40 overflow-hidden rounded-full">
                            <Image src={member.image} alt={member.name} width={500} height={500} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-row items-center justify-center">
                            <h3 className="text-cText text-xl font-semibold">{member.name}</h3>
                            {member.pronouns !== "" && <span className="text-cTextOffset ml-1 text-sm italic">({member.pronouns})</span>}
                        </div>
                        <p className="text-cTextOffset font-medium">{member.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
