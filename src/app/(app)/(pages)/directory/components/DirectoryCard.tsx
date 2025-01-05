interface DirectoryCardProps {
    title: "Clubs" | "Resources";
    count?: number;
    isLoading?: boolean;
    description: string;
}

export function DirectoryCard({ title, count, isLoading, description }: DirectoryCardProps) {
    const displayText = isLoading ? `... ${title}` : `${count} ${count === 1 ? title.slice(0, -1) : title}`;

    const Component = isLoading ? "div" : "a";
    const componentProps = isLoading ? {} : { href: `/directory/${title.toLowerCase()}` };

    return (
        <Component {...componentProps} className="block rounded-lg border border-cBorder bg-cBackgroundOffset p-8 shadow-lg transition-shadow hover:shadow-xl">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-cText">{title}</h2>
                <span className="rounded-full bg-cBackgroundOffsetAccent px-4 py-2 font-medium text-cText">{displayText}</span>
            </div>
            <p className="mb-6 text-cTextOffset">{description}</p>
            <span className="inline-flex items-center font-medium text-cAccent">
                Browse {title}
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
            </span>
        </Component>
    );
}
