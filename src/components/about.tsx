"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { SheetLabel, TickCorners } from "@/components/sheet-frame"
import { Reveal } from "@/components/ui/reveal"
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const stats = [
    { label: "Years Experience", value: "4+", num: 4, suffix: "+" },
    { label: "Parcel Records Checked Daily", value: "10k+", num: 10, suffix: "k+" },
    { label: "Kenyan Counties Served", value: "47", num: 47, suffix: "" },
    { label: "Projects Shipped", value: "15+", num: 15, suffix: "+" },
]

function StatBlock({
    label,
    num,
    suffix,
    delay,
}: {
    label: string
    num: number
    suffix: string
    delay: number
}) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: "-60px" })
    const count = useMotionValue(0)
    const rounded = useTransform(count, (v) => Math.round(v))
    const [display, setDisplay] = useState(0)

    useEffect(() => {
        if (!inView) return
        const controls = animate(count, num, {
            duration: 1.1,
            delay,
            ease: [0.16, 1, 0.3, 1],
        })
        const unsubscribe = rounded.on("change", setDisplay)
        return () => {
            controls.stop()
            unsubscribe()
        }
    }, [inView, num, delay, count, rounded])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay }}
            className="flex flex-col"
        >
            <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary font-display leading-none tabular-nums">
                {display}
                {suffix}
            </span>
            <span className="text-sm text-muted-foreground mt-1.5 leading-snug">{label}</span>
        </motion.div>
    )
}

export function About() {
    return (
        <SectionWrapper id="about">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 lg:gap-20 items-start">
                {/* Left: content */}
                <Reveal
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <SheetLabel index="01" title="About Me" coordinate="-1.2921°S, 36.8219°E" />
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight mb-6 font-display">
                        From Field Surveys
                        <br />
                        <span className="text-primary">to Production Software</span>
                    </h2>

                    <p className="text-muted-foreground leading-relaxed mb-4">
                        I&apos;m a{" "}
                        <span className="text-foreground font-semibold">software engineer</span>{" "}
                        who started out as a surveyor on a 309 km highway in Somalia. Since 2022
                        I&apos;ve worked on Ardhisasa, Kenya&apos;s national land information system,
                        where I lead the QGIS plugin government surveyors use every day and run the
                        GeoServer and PostGIS services behind it.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        Outside that I build products end to end: offline-first point-of-sale
                        systems with Android, desktop and web clients, multi-tenant SaaS for
                        pharmacies and insurance agents, and open geospatial data platforms.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        I care most about the unglamorous parts: data that stays correct when the
                        network doesn&apos;t, systems that can be audited, and deployments someone
                        else can restore from a single command.
                    </p>
                </Reveal>

                {/* Right: field data plate — stats + core tools, no stock photo */}
                <Reveal
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <TickCorners>
                        <div className="relative rounded-lg border border-border overflow-hidden p-6">
                            <div className="absolute inset-0 graticule opacity-50 pointer-events-none" />
                            <p className="relative text-[10px] font-mono text-muted-foreground tracking-[0.2em] uppercase mb-6">
                                Field Data
                            </p>

                            <div className="relative grid grid-cols-2 gap-6">
                                {stats.map((stat, i) => (
                                    <StatBlock key={stat.label} {...stat} delay={i * 0.1} />
                                ))}
                            </div>

                            <div className="relative mt-8 pt-6 border-t border-border flex flex-wrap gap-2">
                                {["TypeScript", "Python", "PostgreSQL / PostGIS", "React / React Native"].map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 rounded-full bg-background/60 border border-border text-xs font-mono text-muted-foreground"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </TickCorners>
                </Reveal>
            </div>
        </SectionWrapper>
    )
}
