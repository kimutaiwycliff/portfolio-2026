"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { motion } from "framer-motion"
import { Award } from "lucide-react"

const education = [
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
]

const certifications = [
    "Project Management",
    "Spatial Data Science",
    "Python for Data Science",
    "Digital Cartography",
    "AWS Cloud Practitioner",
    "Deep Learning Specialization",
]

export function Education() {
    return (
        <SectionWrapper id="education">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-20">
                {/* Education — 3 cols */}
                <div className="lg:col-span-3 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-[11px] font-mono text-primary tracking-[0.22em] uppercase mb-4 flex items-center gap-3">
                            <span className="h-px w-8 bg-primary" />
                            Education
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight font-display">
                            Academic
                            <br />
                            <span className="text-primary">Foundation</span>
                        </h2>
                    </motion.div>

                    <div className="space-y-4">
                        {education.map((edu, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
                            >
                                {/* Accent bar */}
                                <div
                                    className={`w-1 rounded-full bg-gradient-to-b ${edu.accent} flex-shrink-0 group-hover:w-1.5 transition-all duration-300`}
                                />
                                <div className="space-y-1 min-w-0">
                                    <div className="flex items-start justify-between flex-wrap gap-2">
                                        <span className="font-bold font-display">{edu.degree}</span>
                                        <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full flex-shrink-0">
                                            {edu.period}
                                        </span>
                                    </div>
                                    <p className="text-primary text-sm font-semibold">
                                        {edu.institution}
                                    </p>
                                    <p className="text-sm text-muted-foreground">{edu.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Certifications — 2 cols */}
                <div className="lg:col-span-2 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        <p className="text-[11px] font-mono text-primary tracking-[0.22em] uppercase mb-4 flex items-center gap-3">
                            <span className="h-px w-8 bg-primary" />
                            Certifications
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight font-display">
                            Always
                            <br />
                            <span className="text-primary">Learning</span>
                        </h2>
                    </motion.div>

                    <div className="space-y-2.5">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.07 }}
                                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-default"
                            >
                                <Award className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="text-sm font-medium">{cert}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
