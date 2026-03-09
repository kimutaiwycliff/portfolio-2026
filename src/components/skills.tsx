"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { skills } from "@/data/skills"
import { motion } from "framer-motion"

const categoryMeta: Record<string, { icon: string; color: string }> = {
    "Geospatial & GIS": { icon: "🌍", color: "rgba(0, 200, 240, 0.10)" },
    "Programming": { icon: "⚡", color: "rgba(0, 217, 122, 0.10)" },
    "Web Development": { icon: "🌐", color: "rgba(0, 200, 240, 0.10)" },
    "Cloud & DevOps": { icon: "☁️", color: "rgba(155, 126, 255, 0.10)" },
    "Data & ML": { icon: "🧠", color: "rgba(240, 165, 0, 0.10)" },
    "Surveying": { icon: "📐", color: "rgba(0, 217, 122, 0.10)" },
}

export function Skills() {
    return (
        <SectionWrapper id="skills" className="bg-muted/20">
            <div className="space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl"
                >
                    <p className="text-[11px] font-mono text-primary tracking-[0.22em] uppercase mb-4 flex items-center gap-3">
                        <span className="h-px w-8 bg-primary" />
                        Technical Skills
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight font-display">
                        A Toolkit Built for
                        <br />
                        <span className="text-primary">Complex Problems</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skills.map((skillGroup, index) => {
                        const meta = categoryMeta[skillGroup.category] ?? {
                            icon: "⚙️",
                            color: "rgba(0,200,240,0.10)",
                        }
                        return (
                            <motion.div
                                key={skillGroup.category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.07 }}
                                className="h-full"
                            >
                                <SpotlightCard
                                    className="h-full rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors duration-300"
                                    spotlightColor={meta.color}
                                >
                                    <div className="p-4 sm:p-6 h-full flex flex-col">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-2xl">{meta.icon}</span>
                                            <h3 className="font-bold text-base font-display">
                                                {skillGroup.category}
                                            </h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {skillGroup.items.map((item) => (
                                                <span
                                                    key={item}
                                                    className="px-2.5 py-1 rounded-full text-xs font-mono bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200 cursor-default"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </SectionWrapper>
    )
}
