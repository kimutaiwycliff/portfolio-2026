"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"

const stats = [
    { label: "Years Experience", value: "3+" },
    { label: "Daily Records", value: "10k+" },
    { label: "Field Teams", value: "20+" },
    { label: "Projects", value: "15+" },
]

export function About() {
    return (
        <SectionWrapper id="about">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Image / Visual Column */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
                        alt="Workspace"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                </motion.div>

                {/* Content Column */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
                        <div className="h-1 w-20 bg-primary rounded-full mb-6" />
                        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                            I am a <span className="text-foreground font-semibold">Geospatial Data Scientist</span> and <span className="text-foreground font-semibold">Full-Stack Developer</span> with a passion for building systems that bridge the gap between physical location and digital intelligence.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                            With a background in Geomatics Engineering and advanced analytics, I specialize in creating high-performance web applications that visualize complex spatial data, automate workflows, and drive decision-making for land administration and urban planning.
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                            <Badge variant="secondary" className="px-3 py-1">Geospatial AI</Badge>
                            <Badge variant="secondary" className="px-3 py-1">Full-Stack Web</Badge>
                            <Badge variant="secondary" className="px-3 py-1">Cloud Infrastructure</Badge>
                            <Badge variant="secondary" className="px-3 py-1">Land Surveying</Badge>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat, index) => (
                            <Card key={index} className="border-none shadow-none bg-muted/50">
                                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                    <span className="text-3xl md:text-4xl font-bold text-primary mb-1">
                                        {stat.value}
                                    </span>
                                    <span className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                                        {stat.label}
                                    </span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
