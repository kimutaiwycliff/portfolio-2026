export interface Education {
    institution: string;
    degree: string;
    period: string;
    description: string;
    accent: string;
}

export const education: Education[] = [
    {
        institution: "KCA University",
        degree: "MSc Data Analytics",
        period: "2022 – 2025",
        description:
            "Focus on statistical modeling, big data analytics, and machine learning.",
        accent: "from-primary to-secondary",
    },
    {
        institution: "JKUAT",
        degree: "BSc Geomatics Engineering",
        period: "2015 – 2021",
        description:
            "First Class Honours. Specialization in GIS, Geodesy, and Land Information Systems.",
        accent: "from-secondary to-primary",
    },
    {
        institution: "Cisco Networking Academy",
        degree: "CCNA Routing & Switching",
        period: "2017 – 2018",
        description:
            "Network infrastructure, routing protocols, and WAN technologies.",
        accent: "from-primary/60 to-secondary/60",
    },
];

// Matches the certificates listed on the CV.
export const certifications: { name: string; issuer: string }[] = [
    { name: "Spatial Data Science: The New Frontier in Analytics", issuer: "Esri" },
    { name: "Going Places with Spatial Analysis", issuer: "Esri" },
    { name: "Cartography", issuer: "Esri" },
    { name: "Introduction to Data Science in Python", issuer: "University of Michigan · Coursera" },
    { name: "Python for Data Science, AI & Development", issuer: "IBM · Coursera" },
    { name: "Tools for Data Science", issuer: "IBM · Coursera" },
    { name: "Foundations of Project Management", issuer: "Google · Coursera" },
    { name: "Project Initiation: Starting a Successful Project", issuer: "Google · Coursera" },
];
