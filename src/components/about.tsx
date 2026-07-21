"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { SheetLabel, TickCorners } from "@/components/sheet-frame"
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const stats = [
    { label: "Years Experience", value: "3+", num: 3, suffix: "+" },
    { label: "Daily Records Processed", value: "10k+", num: 10, suffix: "k+" },
    { label: "Field Teams Led", value: "20+", num: 20, suffix: "+" },
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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <SheetLabel index="01" title="About Me" coordinate="-1.2921°S, 36.8219°E" />
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight mb-6 font-display">
                        Where Maps Meet
                        <br />
                        <span className="text-primary">Modern Software</span>
                    </h2>

                    <p className="text-muted-foreground leading-relaxed mb-4">
                        I&apos;m a{" "}
                        <span className="text-foreground font-semibold">
                            Geospatial Data Scientist
                        </span>{" "}
                        and{" "}
                        <span className="text-foreground font-semibold">
                            Full-Stack Developer
                        </span>{" "}
                        with a passion for building systems that bridge the gap between
                        physical location and digital intelligence.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        With a background in Geomatics Engineering and advanced analytics, I
                        specialize in creating high-performance web applications that visualize
                        complex spatial data, automate workflows, and drive decision-making for
                        land administration and urban planning.
                    </p>
                </motion.div>

                {/* Right: field data plate — stats + core tools, no stock photo */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
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
                                {["ArcGIS Pro", "React / Next.js", "Python"].map((skill) => (
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
                </motion.div>
            </div>
        </SectionWrapper>
    )
}
