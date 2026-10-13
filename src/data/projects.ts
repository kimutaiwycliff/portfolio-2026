export type Category = 'Full-stack' | 'Mobile' | 'Backend' | 'Geospatial';

export const categories: Category[] = ['Full-stack', 'Geospatial', 'Mobile', 'Backend'];

export interface CaseStudy {
    problem: string;
    constraints: string[];
    decisions: { title: string; body: string }[];
    outcome: string[];
    next?: string[];
}

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    category: Category;
    technologies: string[];
    // Optional: cards without a real screenshot get a drawn placeholder, never a stock photo.
    imageUrl?: string;
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
    date: string;
    caseStudy?: CaseStudy;
}

export const projects: Project[] = [
    {
        id: "fundi-pos",
        title: "Fundi POS",
        description: "Multi-tenant, offline-first point of sale for Kenyan shops: an Android till, a Windows/macOS desktop till and a web dashboard on one API, with M-Pesa, multi-store stock and an audit trail.",
        longDescription: "Fundi runs the till, stock and reporting for small retailers, from hardware stores to pharmacies and boutiques. The Android (Expo) and desktop (Tauri) tills keep a local SQLite database synced against Postgres through self-hosted PowerSync, so selling never stops when the connection does. Owners get sales, margin and stock reports per store and per shift from the web dashboard.",
        category: "Full-stack",
        technologies: ["TypeScript", "Expo / React Native", "Tauri", "Next.js", "Payload CMS", "PostgreSQL", "PowerSync", "SQLite", "M-Pesa Daraja", "Docker", "GitHub Actions", "Nx"],
        imageUrl: "/projects/fundi-pos.jpg",
        githubUrl: "https://github.com/kimutaiwycliff/fundi-pos",
        liveUrl: "https://app.fundipos.co.ke",
        featured: true,
        date: "2026",
        caseStudy: {
            problem: "Small shops in Kenya lose connectivity often, and a till that stops working when the internet drops is worse than a notebook. Owners with more than one branch also have no reliable way to see what they actually keep after cost, per store and per shift.",
            constraints: [
                "Selling must work with no connection for days, on low-cost Android phones and on Windows PCs wired to receipt printers and cash drawers.",
                "M-Pesa is the main payment rail, alongside cash, card and store credit.",
                "Many tenants on one deployment, each with several stores and staff roles.",
                "Cashier fraud is a real risk: voids, refunds and cash counts must be trustworthy.",
            ],
            decisions: [
                {
                    title: "A local database on every till",
                    body: "Both tills keep a SQLite copy of the data they need, synced to Postgres through a self-hosted PowerSync instance. Sync rules are scoped per tenant and store and prioritised, so a new till can start selling once the catalogue and staff have synced, without waiting for the full order history.",
                },
                {
                    title: "Stock as an append-only ledger",
                    body: "Stock levels are never stored as a counter. Every sale, adjustment, transfer and delivery is a movement, and current stock is the sum. Offline sales from several tills therefore merge without lost updates, and movements that drive stock negative show up in an exceptions feed instead of being silently overwritten.",
                },
                {
                    title: "The server decides anything involving money",
                    body: "A void or refund checks the manager PIN locally for instant feedback, but the server re-verifies it before anything commits. Expected cash at shift close is computed on the server from the order ledger, never accepted from the device.",
                },
                {
                    title: "One pricing engine for every client",
                    body: "Pricing, tax and discount rules live in a shared package used by the API, both tills and the dashboard, so a total computed offline on a phone matches the one the server computes later.",
                },
                {
                    title: "Boring, repeatable operations",
                    body: "The same Docker Compose files run local development, a full-container smoke test and production. CI deploys on merge, signed Android and desktop builds are released from tags, and a daily Postgres backup goes to Cloudflare R2 with a one-command restore.",
                },
            ],
            outcome: [
                "Three clients (Android, desktop, web) running against one API and one data model.",
                "A till keeps selling, printing receipts and switching cashiers with no connection, and reconciles automatically when it comes back.",
                "Live at app.fundipos.co.ke.",
            ],
            next: [
                "Certified KRA eTIMS integration (the schema is ready; submission is still a stub).",
                "Verify the M-Pesa and Pesapal integrations against live sandboxes.",
                "Bring the desktop till to parity with mobile for product variants and offline stock adjustments.",
            ],
        },
    },
    {
        id: "dadaab-climate-risk-dashboard",
        title: "Dadaab Climate Risk Dashboard",
        description: "Hazard and displacement dashboard for the Dadaab refugee complex in Garissa County, Kenya. Combines UNHCR population figures, NASA FIRMS fires, Open-Meteo rainfall and drought indicators, USGS earthquakes and OpenStreetMap facilities on one map.",
        longDescription: "A browser-only web map that puts the people in the Dadaab camps next to the hazards around them, with per-source status, an attribute table, layer reordering and a simple composite risk index.",
        category: "Geospatial",
        technologies: ["SvelteKit", "Svelte 5", "MapLibre GL JS", "TypeScript", "Tailwind CSS v4", "NASA FIRMS", "UNHCR API", "USGS API", "Overpass API", "Open-Meteo"],
        imageUrl: "/projects/dadaab-climate-risk-dashboard.png",
        githubUrl: "https://github.com/kimutaiwycliff/dadaab-climate-risk-dashboard",
        liveUrl: "https://dadaab-climate-risk-dashboard.vercel.app/",
        featured: true,
        date: "2026",
        caseStudy: {
            problem: "Information about hazards around Dadaab sits in separate places: fire detections in NASA FIRMS, rainfall in weather models, refugee figures with UNHCR, facilities in OpenStreetMap. I wanted one view that shows how exposed the camps are at a glance.",
            constraints: [
                "No backend and no budget: everything had to come from free public APIs, fetched in the browser.",
                "Sources update at very different rates (hourly weather, daily fires, annual population) and some are unreliable.",
                "The data describes a vulnerable population, so the map must be honest about what is measured and what is indicative.",
            ],
            decisions: [
                {
                    title: "Each source fails on its own",
                    body: "Every API sits behind its own client with its own error state and a status dot in the header. A failing source empties one layer instead of breaking the page, and results are cached for the session so panning does not re-query.",
                },
                {
                    title: "Fallbacks for flaky infrastructure",
                    body: "Public Overpass servers frequently refuse or time out. The OSM layers try three instances with a timeout each and fall back to an extract bundled with the app, so health facilities and water points always render.",
                },
                {
                    title: "Label what is indicative",
                    body: "Drought and flood polygons are drawn as indicative outlines, and the composite risk index is a stated, simple weighting (drought 40%, fire 30%, proximity to camps 30%), presented as a visual summary rather than a model.",
                },
            ],
            outcome: [
                "Five live sources and three static layers in one map, usable on desktop and mobile.",
                "A self-audit found the camp coordinates and every query bounding box about 1.6° too far north, near Wajir. Fixing it changed which fires, earthquakes and facilities appeared at all. I now check every layer against a known reference point before trusting a map.",
            ],
            next: [
                "Replace the indicative drought outlines with current FEWS NET IPC data and CHIRPS rainfall anomalies.",
                "Add IOM DTM displacement figures for the Kenya–Somalia border area.",
                "Move fetching to a small FastAPI + PostGIS service on a schedule so the history of each indicator is kept.",
            ],
        },
    },
    {
        id: "pharmatrack",
        title: "PharmaTrack",
        description: "Multi-tenant pharmacy management SaaS for Kenya: offline-capable POS with M-Pesa, batch- and expiry-aware inventory, a controlled-substances register, appointment reminders and Paystack billing.",
        longDescription: "Pharmacies run their day on PharmaTrack. The POS works offline through an idempotent sale queue in IndexedDB and accepts cash, M-Pesa, card and split payments. Inventory tracks batches, expiry dates and cost prices and consumes stock first-expiry-first-out. Every table is tenant-scoped with Postgres row-level security enforced in the database, not only in application code. Recurring clinical visits trigger SMS, email and WhatsApp reminders, and a platform console handles provisioning, suspension and billing.",
        category: "Full-stack",
        technologies: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "Row-level security", "Drizzle ORM", "Better Auth", "Redis", "BullMQ", "MinIO", "Paystack", "Docker"],
        imageUrl: "/projects/pharmatrack.jpg",
        githubUrl: "https://github.com/kimutaiwycliff/pharmatrack",
        liveUrl: "https://pharmatrack.co.ke",
        featured: true,
        date: "2026",
    },
    {
        id: "geospatial-stack",
        title: "geospatial-stack",
        description: "Docker-first platform for publishing geographic data: uploads are validated, run through a Celery ETL into PostGIS and GeoParquet, and served as vector tiles behind a FastAPI, with dataset governance and an audit trail.",
        longDescription: "A reusable platform that takes a dataset from an uploaded file to a published, styled layer on a public map without an engineer in the loop, while keeping track of where every dataset came from and who is allowed to see it.",
        category: "Geospatial",
        technologies: ["PostGIS", "DuckDB", "GeoParquet", "FastAPI", "Celery", "Redis", "Martin", "PMTiles", "MapLibre GL JS", "React", "MinIO / R2", "Docker", "Prometheus", "Grafana"],
        githubUrl: "https://github.com/kimutaiwycliff/geospatial-stack",
        featured: true,
        date: "2026",
        caseStudy: {
            problem: "Every mapping project I worked on rebuilt the same plumbing: ingest files, check them, reproject, tile, publish, and remember where the data came from. Land and community boundary data adds a harder requirement: some layers must never be published at full precision, or at all.",
            constraints: [
                "Uploads arrive in every format (Shapefile, GeoPackage, GeoJSON, KML, GeoParquet) and in any CRS, often with invalid geometry.",
                "Non-engineers must be able to publish and restyle layers safely.",
                "Must run on a single VPS, with storage portable between MinIO and Cloudflare R2.",
            ],
            decisions: [
                {
                    title: "Raw, curated and published tiers",
                    body: "Data moves through three tiers, enforced both as PostGIS schemas and as storage prefixes. Raw uploads are immutable GeoParquet; DuckDB validates, repairs and normalises them into the curated tier; only the published tier is visible to the map and the tile server.",
                },
                {
                    title: "Validation as a promotion gate",
                    body: "A background job checks geometry validity, CRS, row counts and schema before a dataset can be published, and reports exactly what is wrong instead of a bare failure. Storage and interchange use EPSG:4326, tiles EPSG:3857, and areas are computed in an equal-area projection, never in degrees.",
                },
                {
                    title: "Governance in the data model",
                    body: "Every dataset is a registry row with source, licence, attribution and a sensitivity level (public, restricted, withheld) that defaults to the most protective option. Changes are written to an audit trail, and there is no public sign-up: admin accounts are created from the command line.",
                },
                {
                    title: "Two ways to serve tiles",
                    body: "Stable layers are pre-built into PMTiles in object storage; layers that change are served live from PostGIS by Martin. Styling is stored separately from the tiles, so an admin can restyle and publish a layer without re-tiling or redeploying.",
                },
            ],
            outcome: [
                "Upload to published map layer without engineering involvement, with every step visible in the admin UI.",
                "Curated maps with their own public URLs, a self-hosted OSM basemap and no third-party API keys.",
                "Prometheus, Grafana and Loki for metrics and logs, plus tested backup and restore procedures.",
            ],
        },
    },
    {
        id: "geo-stack",
        title: "geo-stack",
        description: "Reusable spatial data stack: PostGIS for writes, DuckDB + GeoParquet for analytics, Martin and PMTiles for vector tiles, TiTiler for cloud-optimised rasters, and a STAC catalogue behind one FastAPI. Runs locally, on free cloud tiers or on a VPS.",
        longDescription: "The FastAPI layer unifies PostGIS spatial queries, DuckDB analytics over GeoParquet and a Martin tile proxy. The ingest pipeline accepts any GDAL-readable format and loads it into PostGIS with ogr2ogr, optionally exporting GeoParquet to Cloudflare R2. The SvelteKit frontend renders vector tiles, PMTiles, GeoJSON and COG rasters from a single declarative layer config. Three Compose profiles cover local development, a zero-cost cloud deployment and a production VPS with PgBouncer, Caddy and nightly backups.",
        category: "Geospatial",
        technologies: ["PostGIS", "DuckDB", "GeoParquet", "FastAPI", "Python", "SvelteKit", "MapLibre GL JS", "Martin", "PMTiles", "TiTiler", "STAC", "Docker"],
        imageUrl: "/projects/geo-stack.jpg",
        githubUrl: "https://github.com/kimutaiwycliff/geo-stack",
        liveUrl: "https://geo-stackk.vercel.app/",
        featured: true,
        date: "2026",
    },
    {
        id: "insurance-quotation",
        title: "BrokerOS",
        description: "Quotes, policies, renewals and commissions for Kenyan insurance agents, plus a standalone quotation and invoicing product. Typed FastAPI backend with a generated client for the Next.js frontend.",
        longDescription: "An async FastAPI and SQLAlchemy API with OpenAPI-generated TypeScript clients, a separate Better Auth service issuing JWTs, a Next.js web app, and Docker Compose services for Postgres, object storage and local email. Built in milestones with a changelog and implementation plan in the repository.",
        category: "Backend",
        technologies: ["Python", "FastAPI", "SQLAlchemy (async)", "Pydantic", "PostgreSQL", "Better Auth", "Next.js", "TypeScript", "Docker"],
        githubUrl: "https://github.com/kimutaiwycliff/insurance-quotation",
        featured: false,
        date: "2026",
    },
    {
        id: "golang-grpc-microservices",
        title: "Go gRPC Microservices",
        description: "Account and order services in Go behind a Fiber API gateway, communicating over gRPC with Protocol Buffers, each with its own repository layer and database.",
        category: "Backend",
        technologies: ["Go", "gRPC", "Protocol Buffers", "Fiber", "Docker"],
        githubUrl: "https://github.com/kimutaiwycliff/golang-fiber-grpc-microservices",
        featured: false,
        date: "2025",
    },
    {
        id: "luxe-pos-mobile",
        title: "Luxe Collections POS: Mobile",
        description: "iOS and Android POS and inventory app for a Kenyan fashion retailer: barcode scanning, search, layaway with partial payments, loyalty points, multi-location stock and offline storage.",
        category: "Mobile",
        technologies: ["Expo", "React Native", "TypeScript", "Supabase", "Algolia", "Zustand", "TanStack Query", "MMKV"],
        githubUrl: "https://github.com/kimutaiwycliff/mobile-pos",
        featured: false,
        date: "2026",
    },
    {
        id: "luxe-pos-web",
        title: "Luxe Collections POS: Web",
        description: "Point of sale and inventory system for the same retailer, with a checkout interface, analytics dashboard, multi-location stock and an e-commerce landing page, backed by Supabase with row-level security.",
        category: "Full-stack",
        technologies: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "Radix UI", "PostgreSQL"],
        imageUrl: "/projects/luxe-pos-web.jpg",
        githubUrl: "https://github.com/kimutaiwycliff/luxe_supabase_pos",
        liveUrl: "https://luxe-pos.vercel.app/",
        featured: false,
        date: "2026",
    },
    {
        id: "ardhisasa-plugin",
        title: "Ardhisasa QGIS Plugin",
        description: "The QGIS plugin State Department of Lands surveyors use to check and certify parcel jobs: overlap and gap detection, centroid checks against gazetted boundaries, Cassini-to-UTM transformation, survey plans and compliance reports. Government code, not public.",
        category: "Geospatial",
        technologies: ["Python", "PyQGIS", "PyQt", "PostGIS", "GeoServer"],
        featured: false,
        date: "2022–now",
    },
    {
        id: "gis-stack-backend",
        title: "GIS Backend Stack",
        description: "Self-hosted spatial backend: PostGIS, GeoServer for OGC WMS/WFS/WCS/WMTS, Martin vector tiles and a Rust + GDAL ingest service with a browser upload UI, all behind one Nginx entry point.",
        category: "Geospatial",
        technologies: ["PostGIS", "GeoServer", "OGC WMS/WFS", "Martin", "Rust", "GDAL", "Nginx", "Docker"],
        githubUrl: "https://github.com/kimutaiwycliff/gis-stack-backend",
        featured: false,
        date: "2026",
    },
    {
        id: "route-explorer",
        title: "Route Explorer",
        description: "Routing app on OpenRouteService: multi-waypoint directions with nine travel profiles, alternative routes, isochrones, travel-time matrices, POI search, multi-stop route optimisation, elevation profiles and GPX/GeoJSON export.",
        category: "Geospatial",
        technologies: ["React", "MapLibre GL", "OpenRouteService", "Zustand", "TanStack Query", "Recharts", "Vite"],
        imageUrl: "/projects/route-explorer.jpg",
        githubUrl: "https://github.com/kimutaiwycliff/isochrone-map",
        liveUrl: "https://routing-ors-chi.vercel.app/",
        featured: false,
        date: "2026",
    },
    {
        id: "urban-heat-island-explorer",
        title: "Urban Heat Island Explorer",
        description: "Compares live temperature in a city centre with points progressively further out to show the urban heat island effect for 25 cities, with a 7-day history and an hour-by-day heat grid.",
        category: "Geospatial",
        technologies: ["React", "MapLibre GL", "Recharts", "Zustand", "TanStack Query", "Tailwind CSS", "Vite"],
        imageUrl: "/projects/urban-heat-island-explorer.jpg",
        githubUrl: "https://github.com/kimutaiwycliff/urban-heat-island-explorer",
        liveUrl: "https://urban-heat-island-explorer.vercel.app",
        featured: false,
        date: "2026",
    },
    {
        id: "geojson-studio",
        title: "GeoJSON Studio",
        description: "Browser-based GeoJSON editor with multi-layer support, Turf.js geometry operations (buffer, simplify, dissolve), styling and shareable URLs. No backend, no API keys.",
        category: "Geospatial",
        technologies: ["SvelteKit", "MapLibre GL JS", "Turf.js", "LZ-String"],
        imageUrl: "/projects/geojson-studio.jpg",
        liveUrl: "https://geojson-studio-delta.vercel.app",
        githubUrl: "https://github.com/kimutaiwycliff/Geojson-Studio",
        featured: false,
        date: "2026",
    },
    {
        id: "job-hunter-ai",
        title: "JobHunter AI",
        description: "Job search and application tracker: parses a CV, uses Claude with web search to find matching roles, and manages the application pipeline in kanban and table views.",
        category: "Full-stack",
        technologies: ["SvelteKit", "Svelte 5", "Supabase", "Anthropic Claude", "TypeScript", "PostgreSQL"],
        imageUrl: "/projects/job-hunter-ai.jpg",
        liveUrl: "https://job-hunter-nu.vercel.app/",
        featured: false,
        date: "2026",
    },
];
