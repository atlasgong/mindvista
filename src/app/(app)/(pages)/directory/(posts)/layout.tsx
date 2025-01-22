import React from "react";

export default function PostsLayout({ children }: { children: React.ReactNode }) {
    return <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-10 md:px-[7.5vw] lg:px-[15vw]">{children}</div>;
}
