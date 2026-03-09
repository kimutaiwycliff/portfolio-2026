"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useActiveSection } from "@/hooks/use-active-section"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

const navItems = [
    { name: "About", href: "/#about", section: "about" },
    { name: "Skills", href: "/#skills", section: "skills" },
    { name: "Work", href: "/#experience", section: "experience" },
    { name: "Projects", href: "/#projects", section: "projects" },
    { name: "Contact", href: "/#contact", section: "contact" },
]

export function Navigation() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)
    const activeSection = useActiveSection([
        "home",
        "about",
        "skills",
        "experience",
        "projects",
        "contact",
    ])

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <>
            {/* ── Desktop: floating pill nav ── */}
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "backOut" }}
                className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
            >
                {/* Desktop pill */}
                <div className="hidden md:flex pointer-events-auto items-center gap-1 px-2 py-2 rounded-full bg-background/75 backdrop-blur-2xl border border-border shadow-xl shadow-black/10">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold font-mono mr-2 hover:opacity-80 transition-opacity"
                    >
                        WK
                    </Link>

                    {navItems.map((item) => {
                        const isActive = activeSection === item.section
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 z-10",
                                    isActive
                                        ? "text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        className="absolute inset-0 rounded-full bg-primary"
                                        style={{ zIndex: -1 }}
                                        transition={{ type: "spring", duration: 0.45, bounce: 0.2 }}
                                    />
                                )}
                                {item.name}
                            </Link>
                        )
                    })}

                    <div className="ml-2 pl-2 border-l border-border">
                        <ModeToggle />
                    </div>
                </div>

                {/* Mobile top bar */}
                <div className="md:hidden pointer-events-auto flex w-full items-center justify-between px-4 py-2.5 rounded-2xl bg-background/80 backdrop-blur-2xl border border-border shadow-lg">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold font-mono">
                            WK
                        </span>
                        <span className="font-bold text-sm font-display">Wycliff Kimutai</span>
                    </Link>
                    <div className="flex items-center gap-1.5">
                        <ModeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* ── Mobile menu ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed top-[72px] left-4 right-4 z-40 md:hidden rounded-2xl bg-card/95 backdrop-blur-2xl border border-border shadow-2xl p-5"
                    >
                        <nav className="flex flex-col">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "block py-3 text-base font-medium border-b border-border last:border-0 transition-colors",
                                            activeSection === item.section
                                                ? "text-primary"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
