"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ArrowRight, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import { socialLinks } from "@/data/socials"
import { profileImage } from "@/data/images"

const roles = [
    "Geospatial Engineer",
    "Full-Stack Developer",
    "GIS Specialist",
    "Cartographer",
]

function useTypewriter(words: string[], speed = 75, pauseDuration = 2200) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [currentText, setCurrentText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        if (isPaused) return
        const currentWord = words[currentWordIndex]

        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    if (currentText.length < currentWord.length) {
                        setCurrentText(currentWord.slice(0, currentText.length + 1))
                    } else {
                        setIsPaused(true)
                        setTimeout(() => {
                            setIsPaused(false)
                            setIsDeleting(true)
                        }, pauseDuration)
                    }
                } else {
                    if (currentText.length > 0) {
                        setCurrentText(currentText.slice(0, -1))
                    } else {
                        setIsDeleting(false)
                        setCurrentWordIndex((prev) => (prev + 1) % words.length)
                    }
                }
            },
            isDeleting ? speed / 2 : speed
        )

        return () => clearTimeout(timeout)
    }, [currentText, isDeleting, isPaused, currentWordIndex, words, speed, pauseDuration])

    return currentText
}

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.35 },
    },
}

const item = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: "easeOut" as const },
    },
}

export function Hero() {
    const ref = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })
    const y = useTransform(scrollYProgress, [0, 1], [0, -80])
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

    const typewriterText = useTypewriter(roles)

    return (
        <section
            ref={ref}
            id="home"
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
        >
            {/* ── Dot grid background ── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <div className="absolute inset-0 hero-grid opacity-100" />
                {/* Radial glow at top */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(0,200,240,0.07),transparent)]" />
                {/* Fade to bg at bottom */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
            </div>

            {/* ── Coordinate badge (top right) ── */}
            <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute top-20 right-4 md:top-24 md:right-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/25 bg-primary/5 backdrop-blur-sm"
            >
                <MapPin className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-mono text-primary/75 tracking-wide">
                    -1.2921°S · 36.8219°E
                </span>
            </motion.div>

            {/* ── Main content ── */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 container mx-auto px-4 md:px-6 max-w-6xl pt-24"
            >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-20 items-center">
                    {/* Left: text */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        {/* Label */}
                        <motion.div variants={item} className="flex items-center gap-3">
                            <span className="h-px w-10 bg-primary" />
                            <span className="text-[11px] font-mono text-primary tracking-[0.22em] uppercase">
                                Geospatial × Full‑Stack
                            </span>
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            variants={item}
                            className="font-display font-extrabold leading-none tracking-tight"
                        >
                            <span className="block text-[clamp(3.2rem,9vw,7.5rem)] text-foreground">
                                WYCLIFF
                            </span>
                            <span className="block text-[clamp(3.2rem,9vw,7.5rem)] text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                KIMUTAI
                            </span>
                        </motion.h1>

                        {/* Typewriter role */}
                        <motion.div variants={item} className="h-8 flex items-center gap-2">
                            <span className="text-lg md:text-xl text-muted-foreground font-medium">
                                {typewriterText}
                                <span className="inline-block w-[2px] h-5 bg-primary ml-0.5 align-middle animate-pulse" />
                            </span>
                        </motion.div>

                        {/* Bio */}
                        <motion.p
                            variants={item}
                            className="text-muted-foreground leading-relaxed max-w-md"
                        >
                            Bridging spatial intelligence and modern web engineering to build
                            systems that transform geographic data into actionable insights.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div variants={item} className="flex flex-wrap gap-3">
                            <Link
                                href="#projects"
                                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all duration-200 hover:gap-3"
                            >
                                View Projects
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                            <Link
                                href="#contact"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 text-sm font-medium transition-all duration-200"
                            >
                                Get in Touch
                            </Link>
                        </motion.div>

                        {/* Socials */}
                        <motion.div
                            variants={item}
                            className="flex items-center gap-5 pt-1"
                        >
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                                    title={social.name}
                                >
                                    <social.icon className="w-5 h-5" />
                                    <span className="sr-only">{social.name}</span>
                                </Link>
                            ))}
                            <span className="h-px w-6 bg-border" />
                            <span className="text-xs text-muted-foreground font-mono">
                                Nairobi, KE
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Right: profile photo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "backOut" }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        <div className="relative w-64 h-64 md:w-72 md:h-72">
                            {/* Glow halo */}
                            <div className="absolute inset-0 rounded-full bg-primary/15 blur-3xl scale-125" />
                            {/* Outer ring (slow pulse) */}
                            <div
                                className="absolute inset-0 rounded-full border border-primary/25"
                                style={{ animation: "float-y 4s ease-in-out infinite" }}
                            />
                            {/* Inner ring */}
                            <div className="absolute inset-3 rounded-full border border-primary/15" />
                            {/* Photo */}
                            <div className="absolute inset-5 rounded-full overflow-hidden bg-muted">
                                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-3xl font-bold text-primary/50 font-display">
                                    WK
                                </div>
                                <Image
                                    src={profileImage.src}
                                    alt={profileImage.alt}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Floating tech badges */}
                            <motion.span
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-2 -right-6 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-mono text-muted-foreground shadow-lg backdrop-blur"
                            >
                                🌍 GIS
                            </motion.span>
                            <motion.span
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-1 -left-8 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-mono text-muted-foreground shadow-lg backdrop-blur"
                            >
                                ⚡ Next.js
                            </motion.span>
                            <motion.span
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-1/2 -right-16 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-mono text-muted-foreground shadow-lg backdrop-blur"
                            >
                                🛰 Supabase
                            </motion.span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* ── Scroll indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] text-muted-foreground font-mono tracking-[0.25em]">
                    SCROLL
                </span>
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowDown className="w-4 h-4 text-muted-foreground" />
                </motion.div>
            </motion.div>
        </section>
    )
}
