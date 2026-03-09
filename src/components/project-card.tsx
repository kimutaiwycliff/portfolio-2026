"use client"

import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Project } from "@/data/projects"
import { Github, Globe, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
    project: Project
    featured?: boolean
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
    return (
        <SpotlightCard
            className={`group flex flex-col h-full rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 ${
                featured ? "md:flex-row" : ""
            }`}
            spotlightColor="rgba(0, 200, 240, 0.09)"
        >
            {/* Image */}
            <div
                className={`relative flex-shrink-0 overflow-hidden ${
                    featured
                        ? "md:w-[45%] aspect-[4/3] md:aspect-auto"
                        : "aspect-[16/9]"
                }`}
            >
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/70 via-transparent to-transparent" />

                {/* Badges */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono bg-background/75 backdrop-blur-sm border border-border/60 text-muted-foreground">
                    {project.category}
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono bg-primary/15 backdrop-blur-sm border border-primary/25 text-primary">
                    {project.date}
                </span>
            </div>

            {/* Content */}
            <div className={`flex flex-col flex-1 ${featured ? "p-4 sm:p-6 md:p-8" : "p-4 sm:p-6"}`}>
                <div className="flex-1 space-y-3 mb-5">
                    <h3
                        className={`font-bold font-display leading-snug ${
                            featured ? "text-xl sm:text-2xl md:text-3xl" : "text-lg sm:text-xl"
                        }`}
                    >
                        {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {project.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, featured ? 6 : 4).map((tech) => (
                        <span
                            key={tech}
                            className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > (featured ? 6 : 4) && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-muted text-muted-foreground">
                            +{project.technologies.length - (featured ? 6 : 4)}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-1 pt-3 border-t border-border">
                    {project.githubUrl && (
                        <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-muted"
                        >
                            <Github className="w-4 h-4" />
                            Code
                        </Link>
                    )}
                    {project.liveUrl && (
                        <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="group/link flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/10 ml-auto"
                        >
                            <Globe className="w-4 h-4" />
                            Live Demo
                            <ArrowUpRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </Link>
                    )}
                </div>
            </div>
        </SpotlightCard>
    )
}
