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
        id: "pharmatrack",
        title: "PharmaTrack",
        description: "Multi-tenant pharmacy management SaaS for Kenya — offline-capable POS with M-Pesa STK push, batch/expiry-aware inventory with FEFO consumption, a PPB controlled-substances register, clinical appointment reminders, and a platform console for billing and tenant operations.",
        longDescription: "A production-grade, self-hosted SaaS that Kenyan pharmacies run their day-to-day on. The POS works offline via Dexie/IndexedDB with an idempotent sale queue that flushes on reconnect, and accepts cash, M-Pesa STK push, card, and split payments. Inventory tracks batches, expiry dates and cost prices with FEFO consumption on every sale, plus a controlled-substances register for PPB compliance. Every table is tenant-scoped with Postgres Row-Level Security enforced at the database level, not just in application code. Appointments for recurring clinical visits (vaccinations, family planning) trigger automatic SMS/email/WhatsApp reminders. The SaaS layer includes a platform console for provisioning pharmacies, gating suspended tenants, and automated billing via Paystack.",
        category: "Web",
        technologies: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "Drizzle ORM", "Better Auth", "Redis", "BullMQ", "MinIO", "Paystack", "Docker"],
        imageUrl: "/projects/pharmatrack.png",
        liveUrl: "https://pharmatrack.co.ke",
        featured: true,
        date: "2026",
    },
    {
        id: "ardhisasa-plugin",
        title: "Ardhisasa QGIS Plugin",
        description: "Automated land parcel management plugin for government surveyors, streamlining data validation and XML generation.",
        category: "GIS",
        technologies: ["Python", "PyQt", "QGIS API", "XML"],
        imageUrl: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1931&auto=format&fit=crop", // Map/Blueprint
        githubUrl: "https://github.com/wycliffkimutai",
        featured: false,
        date: "2023"
    },
    {
        id: "urban-heat-island-explorer",
        title: "Urban Heat Island Explorer",
        description: "Live climate dashboard fetching weather data across 4 geographic zones per city in parallel, computing Urban Heat Island temperature deltas with interactive time-series charts and an hourly heat grid.",
        category: "Web",
        technologies: ["React", "MapLibre GL", "Recharts", "Zustand", "TanStack Query", "Tailwind CSS", "shadcn/ui", "Vite"],
        imageUrl: "/projects/urban-heat-island-explorer.png",
        githubUrl: "https://github.com/kimutaiwycliff/urban-heat-island-explorer",
        liveUrl: "https://urban-heat-island-explorer.vercel.app",
        featured: true,
        date: "2026"
    },
    {
        id: "dadaab-climate-risk-dashboard",
        title: "Dadaab Climate Risk Dashboard",
        description: "Production-grade GIS web app for real-time climate hazard monitoring in the Dadaab refugee complex, Kenya. Integrates 5 live APIs — NASA FIRMS fire detections, USGS seismic data, Open-Meteo weather, UNHCR refugee population, and OpenStreetMap Overpass — with interactive MapLibre layers, QGIS-style attribute tables, and drag-to-reorder layer management.",
        longDescription: "Built for disaster risk reduction (DRR) decision-making in one of the world's largest refugee settlements. Features include: NASA FIRMS VIIRS fire hotspot mapping, USGS earthquake monitoring, UNHCR refugee population trends, OSM health facilities and water points from Overpass API, drought zone (IPC/FEWS NET) and flood-prone area overlays, composite risk grid, dark/light themes with auto-synced basemaps (Dark Matter, OSM, Voyager, Satellite), QGIS-style attribute table with sort/search/zoom-to-feature, and layer drag-to-reorder.",
        category: "GIS",
        technologies: ["SvelteKit", "Svelte 5", "MapLibre GL JS", "TypeScript", "Tailwind CSS v4", "NASA FIRMS", "USGS API", "UNHCR API", "Overpass API", "Open-Meteo"],
        imageUrl: "/projects/dadaab-climate-risk-dashboard.png",
        githubUrl: "https://github.com/kimutaiwycliff/dadaab-climate-risk-dashboard",
        liveUrl: "https://dadaab-climate-risk-dashboard.vercel.app/",
        featured: true,
        date: "2026"
    },
    {
        id: "geojson-studio",
        title: "GeoJSON Studio",
        description: "Browser-based GeoJSON editor and map visualizer with multi-layer support, geometry operations (buffer, simplify, dissolve), and shareable URL links — zero backend, zero API keys.",
        category: "GIS",
        technologies: ["SvelteKit", "MapLibre GL JS", "Turf.js", "LZ-String", "Bun"],
        imageUrl: "/projects/geojson-studio.png",
        liveUrl: "https://geojson-studio-delta.vercel.app",
        githubUrl: "https://github.com/kimutaiwycliff/Geojson-Studio",
        featured: false,
        date: "2026"
    },
    {
        id: "luxe-pos-web",
        title: "Luxe Collections POS — Web",
        description: "Full-featured Point of Sale and inventory management system for a Kenyan fashion & lifestyle brand. Includes a POS checkout interface, analytics dashboard, multi-location stock tracking, category management, and an e-commerce landing page — all backed by Supabase with row-level security.",
        category: "Web",
        technologies: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "Radix UI", "PostgreSQL"],
        imageUrl: "/projects/luxe-pos-web.png",
        githubUrl: "https://github.com/kimutaiwycliff/luxe_supabase_pos",
        liveUrl: "https://luxe-pos.vercel.app/",
        featured: false,
        date: "2026"
    },
    {
        id: "geo-stack",
        title: "geo-stack — Open-Source Geospatial Infrastructure",
        description: "Reusable spatial data platform: PostGIS for writes, DuckDB + GeoParquet for analytics, Martin for live vector tiles, PMTiles for static serving, and TiTiler for raster. One codebase, three deployment modes — local M1, Render+Vercel (free), or production VPS with Caddy.",
        longDescription: "A complete, self-hostable geospatial infrastructure stack built for production GIS workflows. Provides a FastAPI layer that unifies PostGIS spatial queries, DuckDB-powered GeoParquet analytics, and a Martin MVT tile proxy behind a single API. The ingest pipeline accepts any GDAL-readable format (GeoPackage, Shapefile ZIP, GeoJSON, KML) and loads it into PostGIS via ogr2ogr, optionally exporting GeoParquet to Cloudflare R2. A STAC catalog auto-discovers mounted parquet files. The SvelteKit frontend renders live MVT, static PMTiles, GeoJSON, and raster (COG) layers via a single declarative config file — no hardcoded layer IDs anywhere in the UI. Ships with three compose profiles: local dev with hot-reload, a zero-cost cloud deployment on Render + Vercel + Supabase + R2, and a production VPS with PgBouncer, auto-HTTPS Caddy, and nightly pg_dump backups to R2.",
        category: "GIS",
        technologies: ["PostGIS", "DuckDB", "GeoParquet", "FastAPI", "Python", "SvelteKit", "MapLibre GL JS", "Martin", "PMTiles", "TiTiler", "Cloudflare R2", "Caddy", "Docker", "Supabase"],
        imageUrl: "/projects/geo-stack.png",
        githubUrl: "https://github.com/kimutaiwycliff/geo-stack",
        liveUrl: "https://geo-stackk.vercel.app/",
        featured: true,
        date: "2026"
    },
    {
        id: "route-explorer",
        title: "Route Explorer",
        description: "Full-featured ORS-powered mapping app: multi-waypoint directions with 9 travel profiles, avoid-feature toggles, up to 3 alternative routes, isochrone reachability maps, travel-time matrix, POI discovery, multi-stop route optimisation (VRP/TSP), elevation profiles, and GPX/GeoJSON export.",
        category: "GIS",
        technologies: ["React", "MapLibre GL", "OpenRouteService", "Zustand", "TanStack Query", "Recharts", "Tailwind CSS", "Vite"],
        imageUrl: "/projects/route-explorer.png",
        githubUrl: "https://github.com/kimutaiwycliff/isochrone-map",
        liveUrl: "https://routing-ors-chi.vercel.app/",
        featured: true,
        date: "2026"
    },
    {
        id: "job-hunter-ai",
        title: "JobHunter AI",
        description: "AI-powered job tracking and search platform. Parses your CV, uses Claude with web search to find matching open roles, and manages your full application pipeline — Active, Rejected, Accepted, Withdrawn — with a kanban and table view.",
        category: "Web",
        technologies: ["SvelteKit", "Svelte 5", "Supabase", "Anthropic Claude", "TypeScript", "Tailwind CSS", "shadcn-svelte", "PostgreSQL"],
        imageUrl: "/projects/job-hunter-ai.png",
        githubUrl: "https://github.com/kimutaiwycliff/job-hunter",
        liveUrl: "https://job-hunter-nu.vercel.app/",
        featured: false,
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
