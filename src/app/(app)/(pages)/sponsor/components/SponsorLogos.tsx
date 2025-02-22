import Image from "next/image";
import { Media, Sponsor } from "@/payload-types";

interface SponsorLogosProps {
    sponsors: Sponsor["sponsors"];
}

export function SponsorLogos({ sponsors }: SponsorLogosProps) {
    return (
        <>
            {sponsors.map((sponsor) => {
                const logo = sponsor.logo as Media;
                return (
                    <a key={sponsor.id} href={sponsor.url || undefined} target="_blank" className="w-full transition-all duration-200 hover:scale-110">
                        <Image src={logo.url || "/404.jpg"} alt={logo.alt} width={1000} height={1000} style={{ objectFit: "contain" }} className={`mx-auto max-w-48`} />
                    </a>
                );
            })}
        </>
    );
}
