"use client";

import { useEffect, useState } from "react";
import { careerPath } from "@/data/career-path";
import { COUNTRY_PATHS, MAP_BOUNDS, MAP_HEIGHT, MAP_WIDTH } from "@/data/career-map-geometry";

// Static SVG instead of a WebGL map: the hero only needs a few outlines and a
// line, and shipping maplibre-gl (~1 MB) for that cost several seconds of
// main-thread time on mid-range phones.
const K = MAP_WIDTH / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng);
const project = ([lng, lat]: [number, number]) =>
    [(lng - MAP_BOUNDS.minLng) * K, (MAP_BOUNDS.maxLat - lat) * K] as const;

const stops = careerPath.map((s) => ({ ...s, xy: project(s.coordinates) }));
const traverse = stops.map((s) => s.xy.join(" ")).join(" L ");

// Total draw time of the traverse line; each stop appears as the line reaches it.
const DRAW_MS = 2200;

export function CareerMap() {
    // Server render shows the latest stop so the caption is never empty.
    const [active, setActive] = useState(stops.length - 1);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        setActive(0);
        const timers = stops.slice(1).map((_, i) =>
            setTimeout(() => setActive(i + 1), 300 + ((i + 1) / (stops.length - 1)) * DRAW_MS)
        );
        return () => timers.forEach(clearTimeout);
    }, []);

    const current = stops[active];

    return (
        <div className="relative w-full rounded-lg overflow-hidden border border-border bg-card">
            <svg
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                className="block w-full h-auto"
                role="img"
                aria-label={`Career route: ${stops.map((s) => s.place).join(", then ")}`}
            >
                <g className="fill-muted/60 stroke-border" strokeWidth={0.8} strokeLinejoin="round">
                    {COUNTRY_PATHS.map((c) => (
                        <path key={c.id} d={c.d} />
                    ))}
                </g>
                <path
                    d={`M ${traverse}`}
                    pathLength={1}
                    className="traverse-line fill-none stroke-primary"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animationDuration: `${DRAW_MS}ms` }}
                />
                {stops.map((s, i) => (
                    <g
                        key={s.id}
                        className="traverse-stop"
                        style={{ animationDelay: `${300 + (i / (stops.length - 1)) * DRAW_MS}ms` }}
                    >
                        <circle cx={s.xy[0]} cy={s.xy[1]} r={6} className="fill-background stroke-primary" strokeWidth={2} />
                        <circle cx={s.xy[0]} cy={s.xy[1]} r={2.2} className="fill-foreground" />
                        <text
                            x={s.xy[0] + 10}
                            y={s.xy[1] + 4}
                            className="fill-muted-foreground font-mono"
                            fontSize={11}
                            letterSpacing={1.5}
                        >
                            {s.place.split(",")[0].toUpperCase()}
                        </text>
                    </g>
                ))}
            </svg>
            <div className="absolute inset-0 graticule pointer-events-none opacity-50" aria-hidden />
            <div className="relative px-3 sm:px-4 py-2 font-mono text-[10px] sm:text-xs text-foreground/80 border-t border-border bg-background/70">
                <span className="text-primary">SHEET {current.sheet}</span>
                <span className="mx-2 text-muted-foreground">·</span>
                {current.place}
                <span className="mx-2 text-muted-foreground">·</span>
                {current.period}
            </div>
        </div>
    );
}
