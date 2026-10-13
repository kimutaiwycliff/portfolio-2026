"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { SheetLabel } from "@/components/sheet-frame"
import { Reveal } from "@/components/ui/reveal"
import { skills } from "@/data/skills"

// A compact legend, like the key on a map sheet: one row per group. The
// projects carry the evidence; this is just the index.
export function Skills() {
    return (
        <SectionWrapper id="skills" className="bg-muted/20">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
                <Reveal
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <SheetLabel index="02" title="Toolkit" />
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight font-display">
                        What I
                        <br />
                        <span className="text-primary">Work With</span>
                    </h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed max-w-sm">
                        Each of these shows up in a role or a project further down the page.
                    </p>
                </Reveal>

                <Reveal
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="rounded-lg border border-border bg-card divide-y divide-border"
                >
                    {skills.map((group) => (
                        <div
                            key={group.category}
                            className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-2 sm:gap-6 px-4 sm:px-6 py-4"
                        >
                            <h3 className="font-mono text-[11px] tracking-[0.18em] uppercase text-primary pt-1">
                                {group.category}
                            </h3>
                            <ul className="flex flex-wrap gap-x-2 gap-y-2">
                                {group.items.map((item) => (
                                    <li
                                        key={item}
                                        className="px-2.5 py-1 rounded-full text-xs font-mono bg-muted text-muted-foreground"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </Reveal>
            </div>
        </SectionWrapper>
    )
}
