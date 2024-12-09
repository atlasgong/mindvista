interface EmergencyButtonProps {
    className?: string;
}

export default function EmergencyButton(props: EmergencyButtonProps) {
    return (
        <a
            href="/im-in-crisis"
            className={`${props.className} w-fit rounded-lg border-2 border-solid border-cText bg-cRed p-2 font-bold text-cSoftWhite hover:opacity-90 cursor-pointer`}
            role="button"
        >
            Is this an emergency?
        </a>
    );
}
