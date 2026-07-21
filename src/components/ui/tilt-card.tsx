"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ReactNode, useEffect, useRef, useState } from "react"

interface TiltCardProps {
    children: ReactNode
    className?: string
    maxTilt?: number
}

// Subtle cursor-parallax 3D tilt on hover. Fine-pointer only — touch devices
// get the plain, untilted card with no listeners attached.
export function TiltCard({ children, className, maxTilt = 5 }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [enabled, setEnabled] = useState(false)
    const px = useMotionValue(0)
    const py = useMotionValue(0)
    const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [maxTilt, -maxTilt]), {
        stiffness: 250,
        damping: 22,
    })
    const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-maxTilt, maxTilt]), {
        stiffness: 250,
        damping: 22,
    })

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
        px.set((e.clientX - rect.left) / rect.width - 0.5)
        py.set((e.clientY - rect.top) / rect.height - 0.5)
    }

    const handleMouseLeave = () => {
        px.set(0)
        py.set(0)
    }

    return (
        <div className={className} style={{ perspective: 1200 }}>
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="h-full"
            >
                {children}
            </motion.div>
        </div>
    )
}
