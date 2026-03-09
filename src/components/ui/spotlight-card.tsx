"use client"

import { useRef, useState } from "react"
import type { MouseEvent, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps {
    children: ReactNode
    className?: string
    spotlightColor?: string
}

export function SpotlightCard({
    children,
    className,
    spotlightColor = "rgba(0, 212, 255, 0.10)",
}: SpotlightCardProps) {
    const divRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [opacity, setOpacity] = useState(0)

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return
        const rect = divRef.current.getBoundingClientRect()
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className={cn("relative overflow-hidden", className)}
        >
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500 z-0"
                style={{
                    opacity,
                    background: `radial-gradient(700px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                }}
            />
            <div className="relative z-10 h-full">{children}</div>
        </div>
    )
}
