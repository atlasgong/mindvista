import { getPageFromCMS } from "@/lib/getPageFromCMS";
import { Metadata } from "next";
import ResourceDirectoryClient from "./ResourceDirectoryClient";

export default function ResourceDirectory() {
    return <ResourceDirectoryClient />;
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageFromCMS("directory/resources");
    return {
        ...(page && {
            title: page.title,
            description: page.seoDescription,
        }),
    };
}
