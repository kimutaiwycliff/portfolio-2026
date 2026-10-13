"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ArrowRight, Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef, useEffect, useState, type CSSProperties } from "react"
import { socialLinks } from "@/data/socials"
import { profileImage } from "@/data/images"
import { Magnetic } from "@/components/ui/magnetic"
import { CareerMap } from "@/components/career-map"

const roles = [
    "Software Engineer",
    "Full-Stack Developer",
    "Backend & Mobile Developer",
    "Geospatial Engineer",
]

// Starts with the first role fully typed so the line is never blank on load,
// then cycles: pause, delete, type the next one.
function useTypewriter(words: string[], speed = 75, pauseDuration = 2200) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [currentText, setCurrentText] = useState(words[0])
    const [isDeleting, setIsDeleting] = useState(false)
    const [isPaused, setIsPaused] = useState(true)

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
        if (isPaused) {
            const t = setTimeout(() => {
                setIsPaused(false)
                setIsDeleting(true)
            }, pauseDuration)
            return () => clearTimeout(t)
        }
        const currentWord = words[currentWordIndex]

        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    if (currentText.length < currentWord.length) {
                        setCurrentText(currentWord.slice(0, currentText.length + 1))
                    } else {
                        setIsPaused(true)
                    }
                } else if (currentText.length > 0) {
                    setCurrentText(currentText.slice(0, -1))
                } else {
                    setIsDeleting(false)
                    setCurrentWordIndex((prev) => (prev + 1) % words.length)
                }
            },
            isDeleting ? speed / 2 : speed
        )

        return () => clearTimeout(timeout)
    }, [currentText, isDeleting, isPaused, currentWordIndex, words, speed, pauseDuration])

    return currentText
}

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` })

// Per-letter cascade for the name, driven by CSS so it starts on first paint.
function CascadeText({ text, start }: { text: string; start: number }) {
    return (
        <span>
            <span className="sr-only">{text}</span>
            {text.split("").map((ch, i) => (
                <span key={i} aria-hidden className="letter-in" style={delay(start + i * 0.03)}>
                    {ch}
                </span>
            ))}
        </span>
    )
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
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 sm:py-0"
        >
            {/* ── Graticule background ── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <div className="absolute inset-0 graticule opacity-100" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(227,166,62,0.06),transparent)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
            </div>

            {/* ── Main content ── */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 container mx-auto px-4 md:px-6 max-w-6xl pt-20 sm:pt-24"
            >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-10 lg:gap-16 items-center">
                    {/* Left: text */}
                    <div className="space-y-6">
                        {/* Label + signature avatar */}
                        <div className="rise flex items-center gap-3" style={delay(0.05)}>
                            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-primary/30 shrink-0">
                                <Image
                                    src={profileImage.src}
                                    alt={profileImage.alt}
                                    fill
                                    sizes="36px"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <span className="h-px w-8 bg-primary" />
                            <span className="text-[11px] font-mono text-primary tracking-[0.22em] uppercase">
                                Software Engineer · Geospatial
                            </span>
                        </div>

                        {/* Name */}
                        <h1
                            className="font-display font-extrabold leading-[0.9] tracking-tight uppercase"
                            style={{ perspective: 600 }}
                        >
                            <span className="block text-[clamp(3.2rem,9vw,7.5rem)] text-foreground">
                                <CascadeText text="WYCLIFF" start={0.1} />
                            </span>
                            <span className="block text-[clamp(3.2rem,9vw,7.5rem)] text-primary">
                                <CascadeText text="KIMUTAI" start={0.3} />
                            </span>
                        </h1>

                        {/* Typewriter role */}
                        <div className="rise h-8 flex items-center gap-2" style={delay(0.2)}>
                            <span className="text-lg md:text-xl text-muted-foreground font-medium">
                                {typewriterText}
                                <span className="inline-block w-[2px] h-5 bg-primary ml-0.5 align-middle animate-pulse" />
                            </span>
                        </div>

                        {/* Bio */}
                        <p className="rise text-muted-foreground leading-relaxed max-w-md" style={delay(0.25)}>
                            I build web, mobile and backend systems end to end, from offline-first
                            point-of-sale apps to national land and climate-risk platforms. I trained
                            as a surveyor, so maps are my speciality.
                        </p>

                        {/* CTAs */}
                        <div className="rise flex flex-wrap gap-3" style={delay(0.3)}>
                            <Magnetic>
                                <Link
                                    href="#projects"
                                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all duration-200 hover:gap-3"
                                >
                                    View Projects
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                                </Link>
                            </Magnetic>
                            <Magnetic>
                                <a
                                    href="/CV.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 text-sm font-medium transition-all duration-200"
                                >
                                    <Download className="w-4 h-4" />
                                    Download CV
                                </a>
                            </Magnetic>
                        </div>

                        {/* Socials */}
                        <div className="rise flex items-center gap-5 pt-1" style={delay(0.35)}>
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
                        </div>
                    </div>

                    {/* Right: career map — the signature element */}
                    <div className="rise relative" style={delay(0.2)}>
                        <div className="mb-2 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                            <span>Field Log — Career Traverse</span>
                            <span className="text-primary">1:24,000,000</span>
                        </div>
                        <CareerMap />
                    </div>
                </div>
            </motion.div>

            {/* ── Scroll indicator ── */}
            <div
                className="rise hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
                style={delay(1.2)}
            >
                <span className="text-[10px] text-muted-foreground font-mono tracking-[0.25em]">
                    SCROLL
                </span>
                <ArrowDown className="w-4 h-4 text-muted-foreground animate-bounce" />
            </div>
        </section>
    )
}
