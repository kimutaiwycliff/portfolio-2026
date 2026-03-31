"use client"

import { ProjectCard } from "@/components/project-card"
import { SectionWrapper } from "@/components/section-wrapper"
import { projects } from "@/data/projects"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const featuredProjects = projects.filter((p) => p.featured)

export function Projects() {
    return (
        <SectionWrapper id="projects" className="bg-muted/20">
            <div className="space-y-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl"
                    >
                        <p className="text-[11px] font-mono text-primary tracking-[0.22em] uppercase mb-4 flex items-center gap-3">
                            <span className="h-px w-8 bg-primary" />
                            Projects
                        </p>
                        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight font-display">
                            Featured
                            <br />
                            <span className="text-primary">Work</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-sm text-muted-foreground max-w-xs md:text-right"
                    >
                        A selection of projects I&apos;m particularly proud of — GIS tools,
                        dashboards, and full-stack apps, all shipped.
                    </motion.p>
                </div>

                {/* Featured grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                            className={project.featured ? "md:col-span-2" : ""}
                        >
                            <ProjectCard project={project} featured={project.featured} />
                        </motion.div>
                    ))}
                </div>

                {/* View all CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
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
                </motion.div>
            </div>
        </SectionWrapper>
    )
}
