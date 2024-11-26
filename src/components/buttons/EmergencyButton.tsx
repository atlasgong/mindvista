interface EmergencyButtonProps {
    className?: string;
}

export default function EmergencyButton(props: EmergencyButtonProps) {
    return (
        <button
            className={`${props.className} w-fit rounded-lg border-2 border-solid border-cText bg-cRed p-2 font-bold text-cSoftWhite`}
            type="button"
        >
            Is this an emergency?
        </button>
    );
}
