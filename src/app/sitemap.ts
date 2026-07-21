import { projects } from "@/data/projects"
import type { MetadataRoute } from "next"

const SITE_URL = "https://wycliffkimutai.co.ke"

export default function sitemap(): MetadataRoute.Sitemap {
    const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
        url: `${SITE_URL}/projects/${project.id}`,
        changeFrequency: "monthly",
        priority: 0.7,
    }))

    return [
        {
            url: SITE_URL,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${SITE_URL}/projects`,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        ...projectRoutes,
    ]
}
