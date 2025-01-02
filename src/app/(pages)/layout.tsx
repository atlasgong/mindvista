import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function PageLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavBar />

            <main className="pt-[10vh]">{children}</main>

            <Footer />
        </>
    );
}
