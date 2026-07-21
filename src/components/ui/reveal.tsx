"use client"

import { motion, useInView } from "framer-motion"
import type { ReactNode } from "react"
import { useRef } from "react"

interface RevealProps {
    children: ReactNode
    initial: Record<string, number | string>
    animate: Record<string, number | string>
    transition?: Record<string, unknown>
    margin?: string
    className?: string
}

// Scroll reveal via the `useInView` hook + an explicit `animate` toggle,
// instead of the `whileInView` shorthand. On a statically-prerendered page,
// `whileInView` renders elements already in their final state at build time;
// since they're then already "in view" the moment the observer attaches,
// the enter animation never fires on a real first load. `useInView` starts
// as false on the client regardless of prerendered markup, so the toggle
// to `animate` is a real, visible transition.
export function Reveal({
    children,
    initial,
    animate: target,
    transition,
    margin = "0px",
    className,
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, {
        once: true,
        margin: margin as `${number}px ${number}px ${number}px ${number}px`,
    })

    return (
        <motion.div
            ref={ref}
            initial={initial}
            animate={inView ? target : {}}
            transition={transition}
            className={className}
        >
            {children}
        </motion.div>
    )
}
