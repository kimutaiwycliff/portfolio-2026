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
    {
        id: "luxe-pos-web",
        title: "Luxe Collections POS — Web",
        description: "Full-featured Point of Sale and inventory management system for a Kenyan fashion & lifestyle brand. Includes a POS checkout interface, analytics dashboard, multi-location stock tracking, category management, and an e-commerce landing page — all backed by Supabase with row-level security.",
        category: "Web",
        technologies: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "Radix UI", "PostgreSQL"],
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop", // Retail/checkout
        githubUrl: "https://github.com/kimutaiwycliff/luxe_supabase_pos",
        liveUrl: "https://luxe-pos.vercel.app/",
        featured: true,
        date: "2026"
    },
    {
        id: "route-explorer",
        title: "Route Explorer",
        description: "Full-featured ORS-powered mapping app: multi-waypoint directions with 9 travel profiles, avoid-feature toggles, up to 3 alternative routes, isochrone reachability maps, travel-time matrix, POI discovery, multi-stop route optimisation (VRP/TSP), elevation profiles, and GPX/GeoJSON export.",
        category: "GIS",
        technologies: ["React", "MapLibre GL", "OpenRouteService", "Zustand", "TanStack Query", "Recharts", "Tailwind CSS", "Vite"],
        imageUrl: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?q=80&w=2134&auto=format&fit=crop", // Road map / routing
        githubUrl: "https://github.com/kimutaiwycliff/isochrone-map",
        featured: true,
        date: "2026"
    },
    {
        id: "luxe-pos-mobile",
        title: "Luxe Collections POS — Mobile",
        description: "Cross-platform iOS & Android POS and inventory app for the same Luxe Collections platform. Features barcode scanning, Algolia-powered search, layaway orders with partial payments, loyalty points, multi-location stock management, Victory Native charts, and full dark mode — with offline-first MMKV storage.",
        category: "Web",
        technologies: ["Expo", "React Native", "TypeScript", "Supabase", "Algolia", "Zustand", "TanStack Query", "React Native Paper", "MMKV", "Bun"],
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop", // Mobile device
        githubUrl: "https://github.com/kimutaiwycliff/mobile-pos",
        featured: false,
        date: "2026"
    },
];
