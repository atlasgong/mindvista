import { getPageFromCMS } from "@/lib/getPageFromCMS";
import { Metadata } from "next";
import ClubDirectoryClient from "./ClubDirectoryClient";

export default function ClubDirectory() {
    return <ClubDirectoryClient />;
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageFromCMS("directory/clubs");
    return {
        ...(page && {
            title: page.title,
            description: page.seoDescription,
        }),
    };
}
