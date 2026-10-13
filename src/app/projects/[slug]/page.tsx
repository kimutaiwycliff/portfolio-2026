import { projects } from "@/data/projects"
import { ArrowLeft, Github, Globe, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { ReactNode } from "react"

function SectionLabel({ children }: { children: ReactNode }) {
    return (
        <h2 className="text-[11px] font-mono text-primary tracking-[0.2em] uppercase">{children}</h2>
    )
}

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-2">
            {items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                    <span className="mt-2.5 w-1 h-1 rounded-full bg-primary/60 flex-shrink-0" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    )
}

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const project = projects.find((p) => p.id === slug)
    if (!project) return {}
    return {
        title: project.title,
        description: project.description,
        alternates: {
            canonical: `/projects/${project.id}`,
        },
        openGraph: {
            title: project.title,
            description: project.description,
            url: `/projects/${project.id}`,
            type: "article",
            images: project.imageUrl ? [{ url: project.imageUrl }] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: project.title,
            description: project.description,
            images: project.imageUrl ? [project.imageUrl] : undefined,
        },
    }
}

export default async function ProjectCaseStudyPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const index = projects.findIndex((p) => p.id === slug)
    const project = projects[index]

    if (!project) notFound()

    const cs = project.caseStudy
    const sheetNumber = String(index + 1).padStart(2, "0")
    const sheetTotal = String(projects.length).padStart(2, "0")

    return (
        <div className="min-h-screen w-full">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl py-14 sm:py-20 md:py-28">
                {/* Back link */}
                <Link
                    href="/projects"
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground mb-10"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    Back to all projects
                </Link>

                {/* Header */}
                <div className="mb-8">
                    <p className="text-[11px] font-mono tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
                        <span className="text-primary">
                            SHEET {sheetNumber}/{sheetTotal}
                        </span>
                        <span className="h-px w-8 bg-primary" />
                        <span className="text-muted-foreground">{project.category}</span>
                        <span className="text-muted-foreground/60">· {project.date}</span>
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight font-display mb-4">
                        {project.title}
                    </h1>
                    <p className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
                        {project.description}
                    </p>
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 mb-10">
                    {project.liveUrl && (
                        <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                            <Globe className="w-4 h-4" />
                            Live Demo
                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    )}
                    {project.githubUrl && (
                        <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            Source
                        </Link>
                    )}
                </div>

                {/* Screenshot */}
                {project.imageUrl && (
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-border mb-10">
                        <Image
                            src={project.imageUrl}
                            alt={`${project.title} screenshot`}
                            fill
                            sizes="(min-width: 1024px) 976px, 100vw"
                            className="object-cover object-top"
                            priority
                        />
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-10">
                    {/* Long description */}
                    <div className="space-y-10 text-muted-foreground leading-relaxed">
                        <section className="space-y-3">
                            <SectionLabel>Overview</SectionLabel>
                            <p>{project.longDescription ?? project.description}</p>
                        </section>

                        {cs && (
                            <>
                                <section className="space-y-3">
                                    <SectionLabel>The problem</SectionLabel>
                                    <p className="text-foreground/90 text-lg leading-relaxed">{cs.problem}</p>
                                </section>

                                <section className="space-y-3">
                                    <SectionLabel>Constraints</SectionLabel>
                                    <BulletList items={cs.constraints} />
                                </section>

                                <section className="space-y-5">
                                    <SectionLabel>Key decisions</SectionLabel>
                                    <ol className="space-y-6">
                                        {cs.decisions.map((d, i) => (
                                            <li key={d.title} className="grid grid-cols-[2.5rem_1fr] gap-x-2">
                                                <span className="font-mono text-sm text-primary pt-0.5">
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                <div>
                                                    <h3 className="font-display font-bold text-foreground mb-1">{d.title}</h3>
                                                    <p>{d.body}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </section>

                                <section className="space-y-3">
                                    <SectionLabel>Outcome</SectionLabel>
                                    <BulletList items={cs.outcome} />
                                </section>

                                {cs.next && (
                                    <section className="space-y-3">
                                        <SectionLabel>What I&apos;d do next</SectionLabel>
                                        <BulletList items={cs.next} />
                                    </section>
                                )}
                            </>
                        )}
                    </div>

                    {/* Tech stack */}
                    <div className="md:sticky md:top-28 self-start">
                        <p className="text-[11px] font-mono text-primary tracking-[0.2em] uppercase mb-3">
                            Stack
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-muted text-muted-foreground"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Prev / next sheet */}
                <div className="flex items-center justify-between mt-16 pt-8 border-t border-border">
                    {index > 0 ? (
                        <Link
                            href={`/projects/${projects[index - 1].id}`}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            ← {projects[index - 1].title}
                        </Link>
                    ) : (
                        <span />
                    )}
                    {index < projects.length - 1 && (
                        <Link
                            href={`/projects/${projects[index + 1].id}`}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {projects[index + 1].title} →
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}
