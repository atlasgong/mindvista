interface EmergencyButtonProps {
    className?: string;
}

export default function EmergencyButton(props: EmergencyButtonProps) {
    return (
        <a href="/crisis" className={`${props.className} border-cText bg-cRed text-cSoftWhite w-fit cursor-pointer rounded-lg border-2 border-solid p-2 font-bold hover:opacity-90`} role="button">
            Need help NOW?
        </a>
    );
}
