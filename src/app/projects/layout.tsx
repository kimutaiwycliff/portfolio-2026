import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
    title: "Projects",
    description:
        "GIS tools, web mapping applications, geospatial infrastructure, and full-stack software built by Wycliff Kimutai — Full-Stack Developer & Geospatial Engineer.",
    alternates: {
        canonical: "/projects",
    },
}

export default function ProjectsLayout({ children }: { children: ReactNode }) {
    return children
}
