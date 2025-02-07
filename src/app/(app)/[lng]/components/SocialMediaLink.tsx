import Link from "next/link";
import type { IconType } from "react-icons";

interface SocialMediaLinkProps {
    href: string;
    icon: IconType;
    label: string;
    className?: string;
    size?: string;
}

export function SocialMediaLink({ href, icon: Icon, label, className = "", size = "1.5rem" }: SocialMediaLinkProps) {
    return (
        <Link href={href} target="_blank" rel="noopener noreferrer" className={`${className} hover:text-primary-600 transition-colors`} aria-label={`Visit our ${label} page.`}>
            <Icon style={{ height: `${size}`, width: `${size}` }} title={label} />
        </Link>
    );
}
