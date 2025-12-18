"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Project } from "@/data/projects"
import { Github, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card className="flex flex-col h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                    <Badge className="bg-background/80 hover:bg-background text-foreground backdrop-blur-sm shadow-sm">
                        {project.category}
                    </Badge>
                </div>
            </div>

            <CardHeader>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold line-clamp-1">{project.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-3">{project.description}</p>
            </CardHeader>

            <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                        </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                        <Badge variant="secondary" className="text-xs">+{project.technologies.length - 4}</Badge>
                    )}
                </div>
            </CardContent>

            <CardFooter className="gap-2 pt-0">
                {project.githubUrl && (
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={project.githubUrl} target="_blank">
                            <Github className="w-4 h-4 mr-2" /> Code
                        </Link>
                    </Button>
                )}
                {project.liveUrl && (
                    <Button size="sm" className="flex-1" asChild>
                        <Link href={project.liveUrl} target="_blank">
                            <Globe className="w-4 h-4 mr-2" /> Demo
                        </Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
