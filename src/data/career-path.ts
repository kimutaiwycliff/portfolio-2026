export interface CareerStop {
    id: string;
    sheet: string;
    place: string;
    coordinates: [number, number]; // [lng, lat]
    period: string;
    role: string;
}

// Real coordinates for the actual arc of Wycliff's fieldwork and engineering career.
export const careerPath: CareerStop[] = [
    {
        id: "somalia",
        sheet: "01",
        place: "Southern Somalia",
        coordinates: [42.5454, -0.3582],
        period: "2021",
        role: "Lead Surveyor — 309km highway topographic survey, KAAD Somalia",
    },
    {
        id: "nairobi",
        sheet: "02",
        place: "Nairobi, Kenya",
        coordinates: [36.8219, -1.2921],
        period: "2022 — Present",
        role: "Geospatial Engineer → Senior GIS Developer, Bell Power International / Konza Silicon",
    },
    {
        id: "dadaab",
        sheet: "03",
        place: "Dadaab, Kenya",
        coordinates: [40.3149, 0.0917],
        period: "2026",
        role: "Climate Risk Dashboard — disaster risk reduction for refugee complex",
    },
];
