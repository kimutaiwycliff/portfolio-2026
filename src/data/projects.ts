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
        id: "water-forecasting-ann",
        title: "Water Demand Forecasting ANN",
        description: "Machine learning framework predicting urban water demand using Artificial Neural Networks and climatic data.",
        category: "ML",
        technologies: ["Python", "TensorFlow", "Pandas", "Matplotlib"],
        imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2074&auto=format&fit=crop", // Data/AI
        githubUrl: "https://github.com/wycliffkimutai",
        featured: true,
        date: "2024"
    },
    {
        id: "renewable-dashboard",
        title: "Renewable Energy Dashboard",
        description: "Interactive Next.js dashboard for analyzing solar and wind potential across varying terrains.",
        category: "Web",
        technologies: ["Next.js", "Leaflet", "D3.js", "Tailwind CSS"],
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop", // Solar/Energy
        liveUrl: "https://demo.com",
        featured: false,
        date: "2022"
    },
    {
        id: "vrs-research",
        title: "VRS Kenya Research",
        description: "Research on GPS positioning accuracy using Virtual Reference Stations in dynamic environments.",
        category: "Surveying",
        technologies: ["GPS RTK", "Python", "Statistical Analysis"],
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", // Data Visualization/Charts
        featured: false,
        date: "2021"
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
