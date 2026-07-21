"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { SheetLabel } from "@/components/sheet-frame"
import { Reveal } from "@/components/ui/reveal"
import { experience } from "@/data/experience"
import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform } from "framer-motion"
import { Briefcase } from "lucide-react"
import { useRef } from "react"

export function Experience() {
    const timelineRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 85%", "end 60%"],
    })
    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

    return (
        <SectionWrapper id="experience">
            <div className="space-y-12">
                <Reveal
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl"
                >
                    <SheetLabel index="03" title="Experience" />
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight font-display">
                        Where I&apos;ve Built
                        <br />
                        <span className="text-primary">Real Solutions</span>
                    </h2>
                </Reveal>

                {/* Timeline — zig-zags left/right of a center line on md+, a single
                    left-rail traverse on mobile, tracing the traverse the CareerMap
                    already showed: field surveyor → software engineer → today. */}
                <div ref={timelineRef} className="relative">
                    {/* Mobile rail */}
                    <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-border" />
                    <motion.div
                        className="md:hidden absolute left-0 top-0 w-px bg-gradient-to-b from-primary via-primary to-primary/30 origin-top"
                        style={{ height: "100%", scaleY: lineScale }}
                    />
                    {/* Desktop center line */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border" />
                    <motion.div
                        className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-px bg-gradient-to-b from-primary via-primary to-primary/30 origin-top"
                        style={{ height: "100%", scaleY: lineScale }}
                    />

                    <div className="space-y-8 md:space-y-6 pl-5 md:pl-0">
                        {experience.map((job, index) => {
                            const fromLeft = index % 2 === 0
                            return (
                                <Reveal
                                    key={job.id}
                                    initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    margin="-60px"
                                    transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className={cn(
                                        "relative group md:flex",
                                        fromLeft ? "md:justify-start" : "md:justify-end"
                                    )}
                                >
                                    {/* Timeline dot — mobile rail, desktop center */}
                                    <div className="absolute -left-5 md:left-1/2 top-7 w-2 h-2 rounded-full bg-primary -translate-x-[3px] md:-translate-x-1/2 group-hover:scale-150 transition-transform duration-200 z-10" />

                                    <div className="md:w-[calc(50%-2rem)] rounded-lg bg-card border border-border hover:border-primary/30 p-4 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
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
                                </Reveal>
                            )
                        })}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
