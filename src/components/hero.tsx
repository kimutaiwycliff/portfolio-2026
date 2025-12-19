"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"

import { heroImages, profileImage } from "@/data/images"
import { socialLinks } from "@/data/socials"

export function Hero() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section id="home" className="relative h-screen min-h-[800px] w-full flex items-center justify-center overflow-hidden">
            {/* Background Image Slider */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={heroImages[currentImageIndex].src}
                            alt={heroImages[currentImageIndex].alt}
                            fill
                            className="object-cover opacity-50 dark:opacity-40"
                            priority={currentImageIndex === 0}
                        />
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background z-10" />
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center gap-8">
                {/* Profile Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-40 h-40 md:w-52 md:h-52 rounded-full border-4 border-primary/20 shadow-xl overflow-hidden"
                >
                    {/* Placeholder for actual photo */}
                    <div className="w-full h-full bg-muted flex items-center justify-center text-4xl font-bold text-muted-foreground">
                        WK
                    </div>
                    <Image
                        src={profileImage.src}
                        alt={profileImage.alt}
                        fill
                        className="object-cover"
                    />
                </motion.div>

                {/* Content */}
                <div className="max-w-3xl space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent"
                    >
                        Geospatial Data Scientist <br className="hidden md:block" />
                        <span className="text-foreground text-3xl md:text-5xl">& Full-Stack Developer</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        Bridging spatial intelligence and AI to solve real-world challenges.
                    </motion.p>
                </div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Button size="lg" className="rounded-full text-lg h-12 px-8" asChild>
                        <Link href="#projects">View Projects</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full text-lg h-12 px-8" asChild>
                        <Link href="#contact">Contact Me</Link>
                    </Button>
                    <Button size="lg" variant="ghost" className="rounded-full h-12 w-12 p-0" asChild>
                        <Link href="/cv.pdf" target="_blank" title="Download CV">
                            <span className="sr-only">Download CV</span>
                            {/* Replace with DownloadIcon if needed, standard usually file-text */}
                            <span className="font-bold">CV</span>
                        </Link>
                    </Button>
                </motion.div>

                {/* Social Proof/Icons (Optional inline) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex gap-6 text-muted-foreground mt-4"
                >
                    {socialLinks.map((social) => (
                        <Link
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            className="hover:text-primary transition-colors"
                        >
                            <social.icon className="w-6 h-6" />
                        </Link>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, delay: 1, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
            >
                <ArrowDown className="w-8 h-8" />
            </motion.div>
        </section>
    )
}
