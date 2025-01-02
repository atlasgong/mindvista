import TeamSection from "./components/TeamSection";
import Hr from "../../components/Hr";

const teams = {
    leadership: [
        { role: "President", name: "Charlotte Rotstein", pronouns: "", image: "/team/avatarPlaceholder.png" },
        { role: "Internal Relations Coordinator", name: "Kristie Lam", pronouns: "", image: "/team/avatarPlaceholder.png" },
        { role: "Sponsorship Coordinator", name: "Julia Rotiroti", pronouns: "", image: "/team/avatarPlaceholder.png" },
        { role: "Finance Coordinator", name: "Christina Huan", pronouns: "", image: "/team/avatarPlaceholder.png" },
        { role: "Events Coordinator", name: "Catherine McCourt  ", pronouns: "", image: "/team/avatarPlaceholder.png" },
        { role: "Events Coordinator", name: "Sandrine Huard", pronouns: "", image: "/team/avatarPlaceholder.png" },
    ],
    marketing: [
        { role: "Social Media Coordinator", name: "Abbie Carnahan", pronouns: "", image: "/team/avatarPlaceholder.png" },
        { role: "Marketing and Outreach Coordinator", name: "Paige Metcalf", pronouns: "", image: "/team/avatarPlaceholder.png" },
        { role: "TikTok Video Content Creator", name: "Dina Asadi", pronouns: "", image: "/team/avatarPlaceholder.png" },
    ],
    development: [
        { role: "Website Content Creator", name: "Julie Burke", pronouns: "", image: "/team/avatarPlaceholder.png" },
        { role: "Website Developer", name: "Atlas Gong", pronouns: "he/him", image: "/team/avatarPlaceholder.png" },
        { role: "Website Developer", name: "Murad Novruzov", pronouns: "", image: "/team/avatarPlaceholder.png" },
    ],
    content: [
        { role: "Newsletter Content Creator", name: "Angélique Gouws", pronouns: "", image: "/team/avatarPlaceholder.png" },
        { role: "Newsletter Content Creator", name: "Gianluca Caporicci", pronouns: "", image: "/team/avatarPlaceholder.png" },
        { role: "French Coordinator", name: "Nous Embauchons!", pronouns: "", image: "/team/avatarPlaceholder.png" },
    ],
};

export default function AboutPage() {
    return (
        <div className="container mx-auto max-w-7xl px-6 pb-12 pt-20">
            {/* Group Photo */}
            <div className="group relative mb-16 aspect-[16/9] w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300">
                <img src="/team/group-photo.webp" alt="MindVista Team" className="h-full w-full object-cover brightness-90 transition-transform duration-500 group-hover:scale-105 group-hover:brightness-100" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-4 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <h3 className="text-xl font-semibold">MindVista Team 2024-2025</h3>
                    <p className="text-sm">Committed to student mental wellness.</p>
                </div>
            </div>

            {/* About Content */}
            <div className="mx-auto mb-16 max-w-4xl space-y-6">
                <h1 className="mb-4 bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl dark:from-purple-400 dark:to-blue-300">About MindVista&apos;s Initiative</h1>

                <p className="text-cTextOffset text-base font-medium leading-relaxed">Established in 2023, MindVista emerged from the collaborative as part of the Integrated Management Student Fellowship (IMSF) at McGill University. Rooted in a commitment to enhancing mental wellness, our group functions as a student, volunteer-run initiative that envisions a holistic approach to fostering well-being for every McGill student.</p>

                <p className="text-cTextOffset text-base font-medium leading-relaxed">Dedicated to creating a positive impact on campus mental health, MindVista provides a range of initiatives, including:</p>

                <ul className="text-cText my-6 list-inside list-disc space-y-1 pl-4 text-base font-semibold">
                    <li>Comprehensive Mental Wellness Resources</li>
                    <li>Club Directory for Increased Engagement</li>
                    <li>Weekly Wellness Newsletter</li>
                    <li>Host Wellness Events</li>
                    <li>Wellness Challenges and Giveaways with Epic Rewards</li>
                </ul>

                <p className="text-cTextOffset text-base font-medium leading-relaxed">Join MindVista on our mission to cultivate a campus culture that prioritizes mental wellness and fosters a sense of community among McGill students. Together, let&apos;s embark on a journey towards a healthier and more connected student experience.</p>
            </div>

            <Hr className="mb-16" />

            {/* Photos sectioned by Team */}
            <TeamSection title="Leadership & Coordination Team" members={teams.leadership} />
            <TeamSection title="Marketing + Social Media Team" members={teams.marketing} />
            <TeamSection title="Website Development Team" members={teams.development} />
            <TeamSection title="Newsletter Content Creators" members={teams.content} />
        </div>
    );
}
