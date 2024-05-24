import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/lib/Providers/Providers";
import { Toaster } from "sonner";

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
                <body>
                    <Toaster position="top-center" />
                    {children}
                </body>
            </html>
        </Providers>
    );
}
