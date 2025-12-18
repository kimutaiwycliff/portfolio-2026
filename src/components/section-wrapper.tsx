"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ReactNode } from "react"

interface SectionWrapperProps {
    children: ReactNode
    className?: string
    id?: string
    delay?: number
}

export function SectionWrapper({ children, className, id, delay = 0 }: SectionWrapperProps) {
    return (
        <section id={id} className={cn("py-20 md:py-32 w-full", className)}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
                className="container mx-auto px-4 md:px-6 max-w-7xl"
            >
                {children}
            </motion.div>
        </section>
    )
}
