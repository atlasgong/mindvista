"use client";

interface LocationButtonProps {
    location: string;
    locationLink?: string;
}

export default function LocationButton({ location, locationLink }: LocationButtonProps) {
    const handleLocationClick = () => {
        if (locationLink) {
            window.open(locationLink, "_blank", "noopener,noreferrer");
        }
    };

    if (!locationLink) {
        return <p className="font-medium text-cTextOffset">📍 {location}</p>;
    }

    return (
        <button onClick={handleLocationClick} className="text-left font-medium text-cTextOffset hover:text-cAccent">
            📍 <p className="inline underline">{location}</p>
        </button>
    );
}
