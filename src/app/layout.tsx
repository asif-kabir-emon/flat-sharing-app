import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/lib/Providers/Providers";

export const metadata: Metadata = {
    title: "Flat Sharing App",
    description: "Flat Sharing App",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <html lang="en">
                <body>{children}</body>
            </html>
        </Providers>
    );
}
