import type { Metadata } from "next";
import { Syne, DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const syne = Syne({
    variable: "--font-syne",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
});

const dmSans = DM_Sans({
    variable: "--font-dm-sans",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Wycliff Kimutai | Geospatial Data Scientist & Full-Stack Developer",
    description:
        "Portfolio of Wycliff Kimutai — GIS expert, ML engineer, and full-stack developer specializing in geospatial AI and land administration systems.",
    keywords: ["GIS", "Geospatial", "Data Science", "Full-Stack", "Next.js", "Nairobi"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${syne.variable} ${dmSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col overflow-x-hidden`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ScrollProgress />
                    <Navigation />
                    <main className="flex-1 w-full">{children}</main>
                    <Footer />
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
