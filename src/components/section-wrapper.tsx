import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface SectionWrapperProps {
    children: ReactNode
    className?: string
    id?: string
}

// Layout only — no built-in reveal animation. Each section choreographs its
// own entrance so scrolling through the page doesn't repeat one fade-up tween.
export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
    return (
        <section id={id} className={cn("py-14 sm:py-20 md:py-28 lg:py-32 w-full", className)}>
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">{children}</div>
        </section>
    )
}
