const SITE_URL = "https://wycliffkimutai.co.ke"

// Person schema — this is what lets Google understand "Wycliff Kimutai" as an
// entity (name search, knowledge panel eligibility) and associates the role
// keywords (jobTitle, knowsAbout) with that entity for role-based search.
const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Wycliff Kimutai",
    url: SITE_URL,
    image: `${SITE_URL}/profile.jpeg`,
    jobTitle: "Software Engineer",
    description:
        "Software engineer building web, mobile and backend systems end to end, specialising in geospatial software for land administration and climate risk.",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Nairobi",
        addressCountry: "KE",
    },
    worksFor: {
        "@type": "Organization",
        name: "Konza Silicon",
    },
    alumniOf: [
        {
            "@type": "CollegeOrUniversity",
            name: "Jomo Kenyatta University of Agriculture and Technology (JKUAT)",
        },
        {
            "@type": "CollegeOrUniversity",
            name: "KCA University",
        },
    ],
    knowsAbout: [
        "Software Engineering",
        "Full-Stack Development",
        "Mobile Development",
        "Backend Development",
        "Geospatial Engineering",
        "GIS Analysis",
        "Web Maps",
        "Geographic Information Systems",
        "Remote Sensing",
        "Spatial Data Science",
        "PostGIS",
        "QGIS",
        "React",
        "Next.js",
        "Land Administration Systems",
    ],
    sameAs: [
        "https://github.com/kimutaiwycliff",
        "https://linkedin.com/in/wycliff-kimutai-698903139/",
    ],
}

export function StructuredData() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
    )
}
