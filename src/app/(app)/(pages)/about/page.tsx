import TeamSection from "./components/TeamSection";
import Hr from "../../components/Hr";
import Image from "next/image";
import { Metadata } from "next";
import { getPageFromCMS } from "@/lib/getPageFromCMS";

const teams = {
    leadership: [
        { role: "President", name: "Charlotte Rotstein", pronouns: "she/they", image: "/team/charlotte.webp" },
        { role: "Co-President", name: "Kristie Lam", pronouns: "she/her", image: "/team/avatarPlaceholder.png" },
        { role: "Sponsorship Coordinator", name: "Julia Rotiroti", pronouns: "she/her", image: "/team/julia.webp" },
        { role: "Finance Coordinator", name: "Christina Huan", pronouns: "she/her", image: "/team/avatarPlaceholder.png" },
        { role: "Events Coordinator", name: "Catherine McCourt  ", pronouns: "she/her", image: "/team/catherine.webp" },
        { role: "Events Coordinator", name: "Sandrine Huard", pronouns: "she/her", image: "/team/sandrine.webp" },
    ],
    marketing: [
        { role: "Social Media Coordinator", name: "Abbie Carnahan", pronouns: "she/her", image: "/team/abbie.webp" },
        { role: "Social Media Coordinator", name: "Amanda Borja", pronouns: "she/her", image: "/team/avatarPlaceholder.png" },
        { role: "Marketing and Outreach Coordinator", name: "Paige Metcalf", pronouns: "she/her", image: "/team/avatarPlaceholder.png" },
        // { role: "TikTok Video Content Creator", name: "We're hiring!", pronouns: "", image: "/team/avatarPlaceholder.png" },
    ],
    webContent: [
        { role: "Website Content Creator", name: "Julie Burke", pronouns: "she/her", image: "/team/julie.webp" },
        { role: "Website Content Creator", name: "Stephanie Jean Pierre", pronouns: "she/her", image: "/team/avatarPlaceholder.png" },
    ],
    development: [
        { role: "Website Developer", name: "Atlas Gong", pronouns: "he/him", image: "/team/atlas.webp" },
        { role: "Website Developer", name: "Murad Novruzov", pronouns: "he/him", image: "/team/murad.webp" },
    ],
    content: [
        { role: "Newsletter Content Creator", name: "Gianluca Caporicci", pronouns: "he/him", image: "/team/gianluca.webp" },
        { role: "French Coordinator", name: "Nous embauchons!", pronouns: "", image: "/team/avatarPlaceholder.png" },
    ],
    founders: [
        { role: "Founder", name: "Safiia Abdulkadyrova", pronouns: "she/her", image: "/team/safiia-abdulkadyrova.webp" },
        { role: "Founder", name: "Lauren Harrison", pronouns: "she/her", image: "/team/lauren-harrison.webp" },
        { role: "Founder", name: "Hana Jamal", pronouns: "she/her", image: "/team/hana-jamal.webp" },
    ],
};

export default function AboutPage() {
    return (
        <div className="container mx-auto max-w-7xl px-6 pb-12 pt-20">
            {/* Group Photo */}
            <div className="group relative mb-16 aspect-[16/9] w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300">
                <Image src="/team/group-photo.webp" alt="MindVista Team" width={2000} height={1500} className="h-full w-full object-cover brightness-90 transition-transform duration-500 group-hover:scale-105 group-hover:brightness-100" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-4 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <h3 className="text-xl font-semibold">MindVista Team 2024-2025</h3>
                    <p className="text-sm">Committed to student wellness and engagement.</p>
                </div>
            </div>

            {/* About Content */}
            <div className="mx-auto mb-16 max-w-4xl space-y-6">
                <h1 className="mb-4 bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl dark:from-purple-400 dark:to-blue-300">About MindVista&apos;s Initiative</h1>

                <p className="text-base font-medium leading-relaxed text-cTextOffset">Established in 2023, MindVista emerged from the collaborative as part of the Integrated Management Student Fellowship (IMSF) at McGill University. Rooted in a commitment to enhancing mental wellness, our group functions as a student, volunteer-run initiative that envisions a holistic approach to fostering well-being for every McGill student.</p>

                <p className="text-base font-medium leading-relaxed text-cTextOffset">Dedicated to creating a positive impact on campus mental health, MindVista provides a range of initiatives, including:</p>

                <ul className="my-6 list-inside list-disc space-y-1 pl-4 text-base font-semibold text-cText">
                    <li>Comprehensive Mental Wellness Resources</li>
                    <li>Club Directory for Increased Engagement</li>
                    <li>Weekly Wellness Newsletter</li>
                    <li>Host Wellness Events</li>
                    <li>Wellness Challenges and Giveaways with Epic Rewards</li>
                </ul>

                <p className="text-base font-medium leading-relaxed text-cTextOffset">Join MindVista on our mission to cultivate a campus culture that prioritizes mental wellness and fosters a sense of community among McGill students. Together, let&apos;s embark on a journey towards a healthier and more connected student experience.</p>
            </div>

            <Hr className="mb-16" />

            {/* Photos sectioned by Team */}
            <TeamSection title="Leadership & Coordination Team" members={teams.leadership} />
            <TeamSection title="Marketing + Social Media Team" members={teams.marketing} />
            <TeamSection title="Website Content Team" members={teams.webContent} />
            <TeamSection title="Website Development Team" members={teams.development} />
            <TeamSection title="Newsletter Content Creators" members={teams.content} />
            <TeamSection title="Founders" members={teams.founders} />
        </div>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageFromCMS("about");
    return {
        ...(page && {
            title: page.title,
            description: page.seoDescription,
        }),
    };
}
