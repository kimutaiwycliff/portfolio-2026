"use client"

import { ProjectCard } from "@/components/project-card"
import { SectionWrapper } from "@/components/section-wrapper"
import { Category, projects } from "@/data/projects"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

const categories: (Category | "All")[] = ["All", "GIS", "Web", "ML", "Surveying", "DevOps"]

export function Projects() {
    const [filter, setFilter] = useState<Category | "All">("All")

    const filteredProjects = projects.filter(
        (project) => filter === "All" || project.category === filter
    )

    return (
        <SectionWrapper id="projects" className="bg-muted/20">
            <div className="space-y-12">
                {/* Header + filters in one row */}
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
                            Things I&apos;ve
                            <br />
                            <span className="text-primary">Built &amp; Shipped</span>
                        </h2>
                    </motion.div>

                    {/* Filter tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-wrap gap-2"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                                    filter === cat
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground border border-border hover:text-foreground hover:border-primary/40"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.22, delay: index * 0.04 }}
                                className={project.featured ? "md:col-span-2" : ""}
                            >
                                <ProjectCard project={project} featured={project.featured} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </SectionWrapper>
    )
}
