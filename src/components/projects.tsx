"use client"

import { ProjectCard } from "@/components/project-card"
import { SectionWrapper } from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Category, projects } from "@/data/projects"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const categories: (Category | 'All')[] = ['All', 'GIS', 'Web', 'ML', 'Surveying', 'DevOps']

export function Projects() {
    const [filter, setFilter] = useState<Category | 'All'>('All')

    const filteredProjects = projects.filter(
        project => filter === 'All' || project.category === filter
    )

    return (
        <SectionWrapper id="projects" className="bg-muted/30">
            <div className="space-y-12">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                    <div className="h-1 w-20 bg-primary rounded-full mx-auto mb-6" />
                    <p className="text-muted-foreground">
                        A selection of my work in geospatial analysis, software development, and research.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            variant={filter === cat ? "default" : "outline"}
                            onClick={() => setFilter(cat)}
                            className="rounded-full"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </SectionWrapper>
    )
}
