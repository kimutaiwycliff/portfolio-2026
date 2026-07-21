import type { Metadata } from "next";
import { Big_Shoulders, Inter, Geist_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Cursor } from "@/components/cursor";
import { PageTransition } from "@/components/page-transition";
import { StructuredData } from "@/components/structured-data";

const SITE_URL = "https://wycliffkimutai.co.ke";

const bigShoulders = Big_Shoulders({
    variable: "--font-display",
    subsets: ["latin"],
    weight: ["500", "600", "700", "800", "900"],
    display: "swap",
});

const inter = Inter({
    variable: "--font-sans",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

const geistMono = Geist_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    display: "swap",
});

const title = "Wycliff Kimutai | Full-Stack Developer & GIS / Geospatial Engineer";
const description =
    "Wycliff Kimutai — Full-Stack Developer, GIS Analyst, and Geospatial Engineer based in Nairobi, Kenya. Building web maps, spatial data systems, and production GIS software with React, Next.js, PostGIS, and QGIS.";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: title,
        template: "%s | Wycliff Kimutai",
    },
    description,
    keywords: [
        "Wycliff Kimutai",
        "Full-Stack Developer",
        "GIS Analyst",
        "GIS Developer",
        "Geospatial Engineer",
        "Geospatial Developer",
        "Web Maps",
        "Web Mapping Developer",
        "PostGIS",
        "QGIS Developer",
        "Remote Sensing",
        "Spatial Data Science",
        "Next.js Developer Nairobi",
        "Nairobi Kenya",
    ],
    authors: [{ name: "Wycliff Kimutai", url: SITE_URL }],
    creator: "Wycliff Kimutai",
    publisher: "Wycliff Kimutai",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title,
        description,
        url: SITE_URL,
        siteName: "Wycliff Kimutai",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "/profile.jpeg",
                width: 800,
                height: 800,
                alt: "Wycliff Kimutai",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/profile.jpeg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${bigShoulders.variable} ${inter.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col overflow-x-hidden`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <MotionConfig reducedMotion="user">
                        <StructuredData />
                        <div className="grain-overlay" aria-hidden />
                        <Cursor />
                        <ScrollProgress />
                        <Navigation />
                        <main className="flex-1 w-full">
                            <PageTransition>{children}</PageTransition>
                        </main>
                        <Footer />
                        <Toaster />
                    </MotionConfig>
                </ThemeProvider>
            </body>
        </html>
    );
}
