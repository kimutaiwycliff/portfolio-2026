"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { ReactNode, useEffect, useRef, useState } from "react"

interface MagneticProps {
    children: ReactNode
    strength?: number
    className?: string
}

// Drifts its content toward the cursor within a small radius, spring-returns
// on leave. Fine-pointer only — on touch devices this simply renders static.
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [enabled, setEnabled] = useState(false)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.15 })
    const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.15 })

    useEffect(() => {
        const isFinePointer = window.matchMedia("(pointer: fine)").matches
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        setEnabled(isFinePointer && !reduceMotion)
    }, [])

    if (!enabled) {
        return <div className={className}>{children}</div>
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
