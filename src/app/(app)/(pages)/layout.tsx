import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function PageLayout({ children }: { children: React.ReactNode }) {
    // CHANGES MADE TO THIS COMPONENT MUST BE MIRRORED IN src/app/not-found.tsx.
    // See CONTRIBUTING.md#note-about-not-foundtsx
    return (
        <>
            <NavBar />
            <main className="pt-[10vh]">{children}</main>
            <Footer />
        </>
    );
}
