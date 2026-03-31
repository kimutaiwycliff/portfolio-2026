"use client"

import { ProjectCard } from "@/components/project-card"
import { Category, projects } from "@/data/projects"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const categories: (Category | "All")[] = ["All", "GIS", "Web", "ML", "Surveying", "DevOps"]

export default function ProjectsPage() {
    const [filter, setFilter] = useState<Category | "All">("All")

    const filtered = projects.filter(
        (p) => filter === "All" || p.category === filter
    )

    return (
        <div className="min-h-screen w-full">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl py-14 sm:py-20 md:py-28">

                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-10"
                >
                    <Link
                        href="/#projects"
                        className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                        Back to home
                    </Link>
                </motion.div>

                {/* Page header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-[11px] font-mono text-primary tracking-[0.22em] uppercase mb-4 flex items-center gap-3">
                            <span className="h-px w-8 bg-primary" />
                            All Projects
                        </p>
                        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight font-display">
                            Things I&apos;ve
                            <br />
                            <span className="text-primary">Built &amp; Shipped</span>
                        </h1>
                        <p className="mt-4 text-muted-foreground text-sm max-w-lg">
                            {projects.length} projects across GIS, full-stack web, machine learning, and geospatial tooling.
                        </p>
                    </motion.div>

                    {/* Filter tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
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
                                {cat !== "All" && (
                                    <span className="ml-1.5 text-[10px] opacity-60">
                                        {projects.filter((p) => p.category === cat).length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Results count */}
                <motion.p
                    key={filter}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs font-mono text-muted-foreground mb-6"
                >
                    {filtered.length} {filtered.length === 1 ? "project" : "projects"}
                    {filter !== "All" ? ` in ${filter}` : ""}
                </motion.p>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.22, delay: index * 0.04 }}
                            >
                                <ProjectCard project={project} featured={false} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filtered.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-24 text-center"
                    >
                        <p className="text-muted-foreground text-sm">No projects in this category yet.</p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
