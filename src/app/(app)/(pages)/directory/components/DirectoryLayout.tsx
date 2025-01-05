interface DirectoryLayoutProps {
    children: React.ReactNode;
}

export function DirectoryLayout({ children }: DirectoryLayoutProps) {
    return (
        <div className="mx-auto mb-14 max-w-7xl px-4 py-8 sm:px-8 md:px-12 lg:px-20">
            <header className="mb-12 mt-8 text-center">
                <h1 className="mb-4 text-4xl font-bold text-cText">Directory</h1>
                <p className="text-xl text-cTextOffset">Browse through our collection of clubs and resources.</p>
            </header>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">{children}</div>
        </div>
    );
}
