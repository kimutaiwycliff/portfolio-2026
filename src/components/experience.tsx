"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { experience } from "@/data/experience"
import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

export function Experience() {
    return (
        <SectionWrapper id="experience">
            <div className="space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl"
                >
                    <p className="text-[11px] font-mono text-primary tracking-[0.22em] uppercase mb-4 flex items-center gap-3">
                        <span className="h-px w-8 bg-primary" />
                        Experience
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight font-display">
                        Where I&apos;ve Built
                        <br />
                        <span className="text-primary">Real Solutions</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative pl-5 md:pl-8">
                    {/* Gradient vertical line */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />

                    <div className="space-y-8">
                        {experience.map((job, index) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative group"
                            >
                                {/* Timeline dot */}
                                <div className="absolute -left-5 md:-left-8 top-7 w-2 h-2 rounded-full bg-primary -translate-x-[3px] group-hover:scale-150 transition-transform duration-200" />

                                <div className="rounded-2xl bg-card border border-border hover:border-primary/30 p-4 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                        <div>
                                            <span className="text-[11px] font-mono text-primary/60 mb-1 block tracking-wide">
                                                {job.period}
                                            </span>
                                            <h3 className="text-lg sm:text-xl font-bold font-display leading-snug">
                                                {job.title}
                                            </h3>
                                            <p className="text-primary font-semibold mt-0.5">
                                                {job.company}
                                            </p>
                                        </div>
                                        <span className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                                            <Briefcase className="w-5 h-5" />
                                        </span>
                                    </div>

                                    <ul className="space-y-2 mb-5">
                                        {job.description.map((desc, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-2.5 text-sm text-muted-foreground"
                                            >
                                                <span className="mt-2 w-1 h-1 rounded-full bg-primary/50 flex-shrink-0" />
                                                {desc}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap gap-2">
                                        {job.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2.5 py-1 rounded-full text-xs font-mono bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
