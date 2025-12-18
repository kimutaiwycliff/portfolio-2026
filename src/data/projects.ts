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
        id: "geoserver-cluster",
        title: "GeoServer Cluster Deployment",
        description: "High-performance spatial data infrastructure deployment handling significant concurrent request loads.",
        category: "DevOps",
        technologies: ["Docker", "Kubernetes", "GeoServer", "Nginx"],
        imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2051&auto=format&fit=crop", // Servers
        githubUrl: "https://github.com/wycliffkimutai",
        featured: true,
        date: "2023"
    }
];
