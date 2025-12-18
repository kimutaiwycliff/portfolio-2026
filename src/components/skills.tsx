"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { skills } from "@/data/skills"
import { motion } from "framer-motion"

export function Skills() {
    return (
        <SectionWrapper id="skills" className="bg-muted/30">
            <div className="space-y-12">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
                    <div className="h-1 w-20 bg-primary rounded-full mx-auto mb-6" />
                    <p className="text-muted-foreground">
                        A comprehensive toolkit spanning geospatial analysis, full-stack development, and cloud infrastructure.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skillGroup, index) => (
                        <motion.div
                            key={skillGroup.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full hover:shadow-lg transition-shadow border-primary/5">
                                <CardHeader>
                                    <CardTitle className="text-xl text-primary">{skillGroup.category}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {skillGroup.items.map((item) => (
                                            <Badge key={item} variant="secondary" className="text-sm font-normal">
                                                {item}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}
