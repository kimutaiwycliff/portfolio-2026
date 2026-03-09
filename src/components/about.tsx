"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const stats = [
    { label: "Years Experience", value: "3+", num: 3 },
    { label: "Daily Records Processed", value: "10k+", num: 10 },
    { label: "Field Teams Led", value: "20+", num: 20 },
    { label: "Projects Shipped", value: "15+", num: 15 },
]

function StatBlock({ label, value, delay }: { label: string; value: string; delay: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: "-60px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay }}
            className="flex flex-col"
        >
            <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary font-display leading-none">
                {value}
            </span>
            <span className="text-sm text-muted-foreground mt-1.5 leading-snug">{label}</span>
        </motion.div>
    )
}

export function About() {
    return (
        <SectionWrapper id="about">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                {/* Left: image + decorative */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="relative"
                >
                    {/* Big decorative section number */}
                    <span className="absolute -top-6 -left-2 text-[5rem] sm:text-[7rem] md:text-[11rem] font-extrabold text-border/40 leading-none select-none font-display pointer-events-none">
                        01
                    </span>

                    {/* Image */}
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mt-12">
                        <Image
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
                            alt="Developer workspace"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                    </div>

                    {/* Floating skill pills */}
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="hidden sm:flex absolute bottom-8 -right-4 md:-right-8 flex-col gap-2"
                    >
                        {["ArcGIS Pro", "React / Next.js", "Python"].map((skill) => (
                            <span
                                key={skill}
                                className="px-4 py-1.5 rounded-full bg-card/90 backdrop-blur border border-border text-sm font-mono text-muted-foreground shadow-xl"
                            >
                                {skill}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right: content */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-[11px] font-mono text-primary tracking-[0.22em] uppercase mb-4 flex items-center gap-3">
                            <span className="h-px w-8 bg-primary" />
                            About Me
                        </p>
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

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 pt-6 border-t border-border">
                        {stats.map((stat, i) => (
                            <StatBlock key={stat.label} {...stat} delay={i * 0.1} />
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
