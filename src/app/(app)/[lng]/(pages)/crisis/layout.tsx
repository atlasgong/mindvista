import { languages } from "@i18n/settings";

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

export default function Layout({ children }: { children: React.ReactNode; params: Promise<{ lng: string }> }) {
    return children;
}
