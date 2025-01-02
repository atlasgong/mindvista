interface Props {
    className?: string;
}

export default function Hr({ className }: Props) {
    return <hr className={`${className} border-cBorder border-t`} />;
}
