"use client"

import { ReactNode } from "react"

interface SheetLabelProps {
    index: string
    total?: string
    title: string
    coordinate?: string
}

// Eyebrow label styled like a printed map sheet reference — the number is a real
// index into the page's set of sections, not decoration.
export function SheetLabel({ index, total = "06", title, coordinate }: SheetLabelProps) {
    return (
        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase mb-4">
            <span className="text-primary">
                SHEET {index}/{total}
            </span>
            <span className="h-px w-8 bg-primary" />
            <span className="text-muted-foreground">{title}</span>
            {coordinate && (
                <span className="ml-auto text-muted-foreground/70 hidden sm:inline">{coordinate}</span>
            )}
        </div>
    )
}

interface TickCornersProps {
    children: ReactNode
    className?: string
}

// Corner tick-marks like a survey plate's neatline — frames the section content.
export function TickCorners({ children, className }: TickCornersProps) {
    return (
        <div className={`relative ${className ?? ""}`}>
            <span className="absolute -top-3 -left-3 w-3 h-3 border-t border-l border-primary/40 pointer-events-none" />
            <span className="absolute -top-3 -right-3 w-3 h-3 border-t border-r border-primary/40 pointer-events-none" />
            <span className="absolute -bottom-3 -left-3 w-3 h-3 border-b border-l border-primary/40 pointer-events-none" />
            <span className="absolute -bottom-3 -right-3 w-3 h-3 border-b border-r border-primary/40 pointer-events-none" />
            {children}
        </div>
    )
}
