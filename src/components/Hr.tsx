interface Props {
    className?: string;
}

export default function Hr({ className }: Props) {
    return <hr className={`${className} border-t border-cBorder`} />;
}
