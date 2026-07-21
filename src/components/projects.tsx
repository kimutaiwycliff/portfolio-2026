"use client"

import { ProjectCard } from "@/components/project-card"
import { SectionWrapper } from "@/components/section-wrapper"
import { SheetLabel } from "@/components/sheet-frame"
import { Reveal } from "@/components/ui/reveal"
import { TiltCard } from "@/components/ui/tilt-card"
import { projects } from "@/data/projects"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const featuredProjects = projects.filter((p) => p.featured)

export function Projects() {
    return (
        <SectionWrapper id="projects" className="bg-muted/20">
            <div className="space-y-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <Reveal
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl"
                    >
                        <SheetLabel index="04" title="Featured Work" />
                        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight font-display">
                            Featured
                            <br />
                            <span className="text-primary">Work</span>
                        </h2>
                    </Reveal>

                    <Reveal
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-sm text-muted-foreground max-w-xs md:text-right"
                    >
                        A selection of projects I&apos;m particularly proud of — GIS tools,
                        dashboards, and full-stack apps, all shipped.
                    </Reveal>
                </div>

                {/* Featured grid — cards shuffle in alternating from left and right */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featuredProjects.map((project, index) => {
                        const fromLeft = index % 2 === 0
                        const isHero = index === 0
                        return (
                            <Reveal
                                key={project.id}
                                initial={{ opacity: 0, x: fromLeft ? -70 : 70, rotate: fromLeft ? -2.5 : 2.5 }}
                                animate={{ opacity: 1, x: 0, rotate: 0 }}
                                margin="-60px"
                                transition={{
                                    duration: 0.65,
                                    delay: (index % 3) * 0.1,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className={isHero ? "md:col-span-2" : ""}
                            >
                                <TiltCard maxTilt={3} className="h-full">
                                    <ProjectCard project={project} featured={isHero} />
                                </TiltCard>
                            </Reveal>
                        )
                    })}
                </div>

                {/* View all CTA */}
                <Reveal
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex justify-center pt-4"
                >
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
                    >
                        View all {projects.length} projects
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </Reveal>
            </div>
        </SectionWrapper>
    )
}
