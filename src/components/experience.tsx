"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { experience } from "@/data/experience"
import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

export function Experience() {
    return (
        <SectionWrapper id="experience">
            <div className="space-y-12">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
                    <div className="h-1 w-20 bg-primary rounded-full mx-auto mb-6" />
                </div>

                <div className="relative border-l border-primary/30 ml-4 md:ml-1/2 space-y-12 md:space-y-0 text-left">
                    {experience.map((job, index) => (
                        <div key={job.id} className={`relative flex items-center justify-between md:justify-normal w-full mb-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>

                            {/* Timeline Dot */}
                            <div className="absolute -left-[11px] md:left-1/2 md:-ml-[11px] w-6 h-6 rounded-full bg-background border-4 border-primary z-10" />

                            {/* Spacer for center alignment on desktop */}
                            <div className="hidden md:block w-1/2" />

                            {/* Content Card */}
                            <motion.div
                                className={`w-full md:w-5/12 ml-8 md:ml-0 ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <Card className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge variant="outline" className="text-xs font-mono">{job.period}</Badge>
                                            <Briefcase className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                        <CardTitle className="text-lg md:text-xl font-bold">{job.title}</CardTitle>
                                        <p className="text-primary font-medium">{job.company}</p>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mb-4">
                                            {job.description.map((desc, i) => (
                                                <li key={i}>{desc}</li>
                                            ))}
                                        </ul>
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {job.technologies.map((tech) => (
                                                <Badge key={tech} variant="secondary" className="text-xs bg-muted text-muted-foreground hover:bg-muted-foreground/10">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}
