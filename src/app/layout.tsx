import "src/global.css";
import { ThemeProvider } from "./context/ThemeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>MindVista</title>
                <meta name="description" content="desctipiton" />
                {/* social media here */}
            </head>
            <body className="text-cText min-h-screen antialiased bg-cBackground">
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
