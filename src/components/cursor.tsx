"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

const INTERACTIVE_SELECTOR = "a, button, input, textarea, select, [role='button'], [data-cursor-hover]"

// Crosshair-style cursor on brand with the survey/atlas theme — desktop
// (fine-pointer) only, and only once we've confirmed JS + a mouse are present,
// so touch devices and no-JS visitors always keep the native cursor.
export function Cursor() {
    const [enabled, setEnabled] = useState(false)
    const [hovering, setHovering] = useState(false)
    const dotX = useMotionValue(-100)
    const dotY = useMotionValue(-100)
    const ringX = useSpring(dotX, { stiffness: 300, damping: 30, mass: 0.5 })
    const ringY = useSpring(dotY, { stiffness: 300, damping: 30, mass: 0.5 })

    useEffect(() => {
        const isFinePointer = window.matchMedia("(pointer: fine)").matches
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (!isFinePointer || reduceMotion) return

        setEnabled(true)
        document.documentElement.classList.add("has-custom-cursor")

        const handleMove = (e: MouseEvent) => {
            dotX.set(e.clientX)
            dotY.set(e.clientY)
            const target = e.target as HTMLElement
            setHovering(Boolean(target.closest?.(INTERACTIVE_SELECTOR)))
        }

        window.addEventListener("mousemove", handleMove, { passive: true })
        return () => {
            window.removeEventListener("mousemove", handleMove)
            document.documentElement.classList.remove("has-custom-cursor")
        }
    }, [dotX, dotY])

    if (!enabled) return null

    return (
        <>
            <motion.div
                aria-hidden
                className="fixed top-0 left-0 z-[200] pointer-events-none rounded-full bg-primary"
                style={{
                    x: dotX,
                    y: dotY,
                    width: 6,
                    height: 6,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
            <motion.div
                aria-hidden
                animate={{ scale: hovering ? 1.8 : 1, opacity: hovering ? 0.9 : 0.5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="fixed top-0 left-0 z-[200] pointer-events-none rounded-full border border-primary"
                style={{
                    x: ringX,
                    y: ringY,
                    width: 32,
                    height: 32,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        </>
    )
}
