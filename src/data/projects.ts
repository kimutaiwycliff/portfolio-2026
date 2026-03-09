export type Category = 'GIS' | 'Web' | 'ML' | 'Surveying' | 'DevOps';

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    category: Category;
    technologies: string[];
    imageUrl: string;
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
    date: string;
}

export const projects: Project[] = [
    {
        id: "ardhisasa-plugin",
        title: "Ardhisasa QGIS Plugin",
        description: "Automated land parcel management plugin for government surveyors, streamlining data validation and XML generation.",
        category: "GIS",
        technologies: ["Python", "PyQt", "QGIS API", "XML"],
        imageUrl: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1931&auto=format&fit=crop", // Map/Blueprint
        githubUrl: "https://github.com/wycliffkimutai",
        featured: true,
        date: "2023"
    },
    {
        id: "urban-heat-island-explorer",
        title: "Urban Heat Island Explorer",
        description: "Live climate dashboard fetching weather data across 4 geographic zones per city in parallel, computing Urban Heat Island temperature deltas with interactive time-series charts and an hourly heat grid.",
        category: "Web",
        technologies: ["React", "MapLibre GL", "Recharts", "Zustand", "TanStack Query", "Tailwind CSS", "shadcn/ui", "Vite"],
        imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop", // City skyline
        githubUrl: "https://github.com/kimutaiwycliff/urban-heat-island-explorer",
        liveUrl: "https://urban-heat-island-explorer.vercel.app",
        featured: true,
        date: "2026"
    },
    {
        id: "geojson-studio",
        title: "GeoJSON Studio",
        description: "Browser-based GeoJSON editor and map visualizer with multi-layer support, geometry operations (buffer, simplify, dissolve), and shareable URL links — zero backend, zero API keys.",
        category: "GIS",
        technologies: ["SvelteKit", "MapLibre GL JS", "Turf.js", "LZ-String", "Bun"],
        imageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop", // Map/GIS
        liveUrl: "https://geojson-studio-delta.vercel.app",
        githubUrl: "https://github.com/kimutaiwycliff/Geojson-Studio",
        featured: true,
        date: "2026"
    },
];
