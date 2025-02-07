import { DirectoryProvider } from "./DirectoryProvider";

export default function DirectoryLayout({ children }: { children: React.ReactNode }) {
    return <DirectoryProvider>{children}</DirectoryProvider>;
}
