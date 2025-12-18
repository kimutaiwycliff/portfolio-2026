"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Award } from "lucide-react"

const education = [
    {
        institution: "KCA University",
        degree: "MSc Data Analytics",
        period: "2022 - 2025",
        description: "Focus on statistical modeling, big data analytics, and machine learning."
    },
    {
        institution: "JKUAT",
        degree: "BSc Geomatics Engineering",
        period: "2015 - 2021",
        description: "First Class Honours. Specialization in GIS, Geodesy, and Land Information Systems."
    },
    {
        institution: "Cisco Networking Academy",
        degree: "CCNA Routing & Switching",
        period: "2017 - 2018",
        description: "Network infrastructure, routing protocols, and WAN technologies."
    }
]

const certifications = [
    "Project Management",
    "Spatial Data Science",
    "Python for Data Science",
    "Digital Cartography",
    "AWS Cloud Practitioner",
    "Deep Learning Specialization"
]

export function Education() {
    return (
        <SectionWrapper id="education">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Education Column */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3 mb-6">
                        <GraduationCap className="w-8 h-8 text-primary" />
                        <h2 className="text-3xl font-bold">Education</h2>
                    </div>

                    <div className="space-y-6">
                        {education.map((edu, index) => (
                            <Card key={index} className="border-l-4 border-l-primary hover:shadow-md transition-all">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg font-bold flex justify-between items-start">
                                        <span>{edu.degree}</span>
                                        <Badge variant="secondary" className="text-xs font-normal whitespace-nowrap ml-2">
                                            {edu.period}
                                        </Badge>
                                    </CardTitle>
                                    <p className="text-primary font-medium">{edu.institution}</p>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{edu.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Certifications Column */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Award className="w-8 h-8 text-primary" />
                        <h2 className="text-3xl font-bold">Certifications</h2>
                    </div>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex flex-wrap gap-3">
                                {certifications.map((cert, index) => (
                                    <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border hover:bg-muted transition-colors w-full sm:w-auto">
                                        <Award className="w-5 h-5 text-accent" />
                                        <span className="font-medium">{cert}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Optional: Add specific certification logos or more details here later */}
                </div>
            </div>
        </SectionWrapper>
    )
}
