"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { SheetLabel } from "@/components/sheet-frame"
import { Reveal } from "@/components/ui/reveal"
import { experience } from "@/data/experience"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

// One column with a single rail: dates on the left, the role on the right.
// Reads top to bottom like a field log instead of zig-zagging across the page.
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
                        Where I&apos;ve
                        <br />
                        <span className="text-primary">Worked</span>
                    </h2>
                </Reveal>

                <div ref={timelineRef} className="relative max-w-4xl">
                    <div className="absolute left-0 md:left-[11rem] top-0 bottom-0 w-px bg-border" />
                    <motion.div
                        className="absolute left-0 md:left-[11rem] top-0 w-px bg-gradient-to-b from-primary via-primary to-primary/30 origin-top"
                        style={{ height: "100%", scaleY: lineScale }}
                    />

                    <div className="space-y-12">
                        {experience.map((job, index) => (
                            <Reveal
                                key={job.id}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                margin="-60px"
                                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                className="relative grid grid-cols-1 md:grid-cols-[11rem_1fr] gap-x-10 gap-y-2 pl-6 md:pl-0"
                            >
                                <span className="absolute left-0 md:left-[11rem] top-2 w-2 h-2 rounded-full bg-primary -translate-x-[3.5px]" />
                                <p className="font-mono text-xs text-muted-foreground tracking-wide md:pt-1.5">
                                    {job.period}
                                </p>
                                <div className="md:pl-10">
                                    <h3 className="text-lg sm:text-xl font-bold font-display leading-snug">
                                        {job.title}
                                    </h3>
                                    <p className="text-primary font-semibold mt-0.5 mb-4">{job.company}</p>
                                    <ul className="space-y-2 mb-4">
                                        {job.description.map((desc, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-muted-foreground">
                                                <span className="mt-2.5 w-1 h-1 rounded-full bg-primary/60 flex-shrink-0" />
                                                {desc}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex flex-wrap gap-2">
                                        {job.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2.5 py-1 rounded-full text-xs font-mono bg-muted text-muted-foreground"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
