import { Language } from "../../i18n/settings";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "MindVista",
    description: "MindVista - Mental Health Resources",
};

interface Props {
    children: React.ReactNode;
    params: Promise<{ lng: Language }>;
}

export default async function PageLayout({ children, params }: Props) {
    const { lng } = await params;
    return (
        <>
            <NavBar lng={lng} />
            <main className="pt-[10vh]">{children}</main>
            <Footer lng={lng} />
        </>
    );
}
