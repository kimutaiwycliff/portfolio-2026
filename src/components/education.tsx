"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { SheetLabel } from "@/components/sheet-frame"
import { Reveal } from "@/components/ui/reveal"
import { education, certifications } from "@/data/education"
import { Award } from "lucide-react"

export function Education() {
    return (
        <SectionWrapper id="education">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-20">
                {/* Education — 3 cols */}
                <div className="lg:col-span-3 space-y-8">
                    <Reveal
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <SheetLabel index="05" title="Education" />
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight font-display">
                            Academic
                            <br />
                            <span className="text-primary">Foundation</span>
                        </h2>
                    </Reveal>

                    <div className="space-y-4">
                        {education.map((edu, index) => (
                            <Reveal
                                key={index}
                                initial={{ opacity: 0, x: -50, rotate: -1.5 }}
                                animate={{ opacity: 1, x: 0, rotate: 0 }}
                                margin="-40px"
                                transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="flex gap-3 sm:gap-4 p-4 sm:p-6 rounded-lg bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
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
                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* Certifications — 2 cols */}
                <div className="lg:col-span-2 space-y-8">
                    <Reveal
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        <p className="text-[11px] font-mono text-muted-foreground tracking-[0.2em] uppercase mb-4">
                            Certifications
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight font-display">
                            Always
                            <br />
                            <span className="text-primary">Learning</span>
                        </h2>
                    </Reveal>

                    <div className="space-y-2.5">
                        {certifications.map((cert, index) => (
                            <Reveal
                                key={index}
                                initial={{ opacity: 0, x: 50, rotate: 1.5 }}
                                animate={{ opacity: 1, x: 0, rotate: 0 }}
                                margin="-40px"
                                transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-default"
                            >
                                <Award className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="text-sm font-medium">{cert}</span>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
