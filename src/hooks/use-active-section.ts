"use client"

import { useState, useEffect } from "react"

export function useActiveSection(sectionIds: string[], offset = 100) {
    const [activeSection, setActiveSection] = useState<string>("")

    useEffect(() => {
        const handleScroll = () => {
            let current = ""
            for (const id of sectionIds) {
                const element = document.getElementById(id)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    // Check if the top of the section is within the viewport (with offset)
                    // or if the bottom of the section is still visible
                    if (rect.top <= offset && rect.bottom >= offset) {
                        current = id
                    }
                }
            }
            setActiveSection(current)
        }

        // Run initially
        handleScroll()

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [sectionIds, offset])

    return activeSection
}
