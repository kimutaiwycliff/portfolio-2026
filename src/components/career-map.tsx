"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { careerPath } from "@/data/career-path";

const INK = "#0E1310";
const CONTOUR = "#3F4F41";
const AMBER = "#E3A63E";
const PAPER = "#E7E2D2";

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

function pathAtProgress(t: number): GeoJSON.Feature<GeoJSON.LineString> {
    const coords = careerPath.map((s) => s.coordinates);
    const segments = coords.length - 1;
    const scaled = t * segments;
    const line: [number, number][] = [coords[0]];

    for (let i = 0; i < segments; i++) {
        const segT = Math.min(Math.max(scaled - i, 0), 1);
        if (segT <= 0) break;
        const [lng1, lat1] = coords[i];
        const [lng2, lat2] = coords[i + 1];
        if (segT >= 1) {
            line.push([lng2, lat2]);
        } else {
            line.push([lerp(lng1, lng2, segT), lerp(lat1, lat2, segT)]);
            break;
        }
    }

    return {
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates: line },
    };
}

export function CareerMap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const [visitedCount, setVisitedCount] = useState(0);

    useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        const map = new maplibregl.Map({
            container: containerRef.current,
            style: {
                version: 8,
                sources: {
                    countries: {
                        type: "vector",
                        url: "https://demotiles.maplibre.org/tiles/tiles.json",
                    },
                },
                layers: [
                    { id: "bg", type: "background", paint: { "background-color": INK } },
                    {
                        id: "countries-fill",
                        type: "fill",
                        source: "countries",
                        "source-layer": "countries",
                        paint: { "fill-color": CONTOUR, "fill-opacity": 0.4 },
                    },
                    {
                        id: "countries-line",
                        type: "line",
                        source: "countries",
                        "source-layer": "countries",
                        paint: { "line-color": CONTOUR, "line-width": 0.7, "line-opacity": 0.9 },
                    },
                ],
            },
            center: [40, -0.5],
            zoom: 3.4,
            attributionControl: false,
            interactive: false,
        });

        mapRef.current = map;

        map.on("load", () => {
            const bounds = new maplibregl.LngLatBounds();
            careerPath.forEach((s) => bounds.extend(s.coordinates));
            map.fitBounds(bounds, { padding: 64, duration: 0 });

            map.addSource("traverse", {
                type: "geojson",
                data: pathAtProgress(0),
            });
            map.addLayer({
                id: "traverse-line",
                type: "line",
                source: "traverse",
                paint: {
                    "line-color": AMBER,
                    "line-width": 2,
                    "line-dasharray": [1, 0],
                },
            });

            map.addSource("stops", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: [],
                },
            });
            map.addLayer({
                id: "stops-ring",
                type: "circle",
                source: "stops",
                paint: {
                    "circle-radius": 7,
                    "circle-color": INK,
                    "circle-stroke-color": AMBER,
                    "circle-stroke-width": 2,
                },
            });
            map.addLayer({
                id: "stops-dot",
                type: "circle",
                source: "stops",
                paint: {
                    "circle-radius": 2.5,
                    "circle-color": PAPER,
                },
            });

            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const revealStop = (index: number) => {
                setVisitedCount(index + 1);
                const source = map.getSource("stops") as maplibregl.GeoJSONSource;
                source.setData({
                    type: "FeatureCollection",
                    features: careerPath.slice(0, index + 1).map((s) => ({
                        type: "Feature",
                        properties: { place: s.place, sheet: s.sheet },
                        geometry: { type: "Point", coordinates: s.coordinates },
                    })),
                });
            };

            if (reduceMotion) {
                (map.getSource("traverse") as maplibregl.GeoJSONSource).setData(pathAtProgress(1));
                revealStop(careerPath.length - 1);
                return;
            }

            const duration = 2200;
            const segments = careerPath.length - 1;
            let start: number | null = null;
            let lastSegment = -1;

            const step = (timestamp: number) => {
                if (start === null) start = timestamp;
                const elapsed = timestamp - start;
                const t = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - t, 3);

                (map.getSource("traverse") as maplibregl.GeoJSONSource).setData(pathAtProgress(eased));

                const currentSegment = Math.min(Math.floor(eased * segments), segments);
                if (currentSegment > lastSegment) {
                    lastSegment = currentSegment;
                    revealStop(currentSegment);
                }

                if (t < 1) requestAnimationFrame(step);
            };

            requestAnimationFrame(step);
        });

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    return (
        <div className="relative w-full h-full min-h-[320px] rounded-lg overflow-hidden border border-border">
            <div
                ref={containerRef}
                className="absolute inset-0"
                style={{ position: "absolute", inset: 0 }}
            />
            <div className="absolute inset-0 graticule pointer-events-none opacity-60" />
            {careerPath.map((stop, i) => (
                <div
                    key={stop.id}
                    className="absolute bottom-0 left-0 right-0 px-3 sm:px-4 py-2 font-mono text-[10px] sm:text-xs text-foreground/70 border-t border-border bg-background/70 backdrop-blur-sm transition-opacity duration-500"
                    style={{ opacity: i === visitedCount - 1 ? 1 : 0 }}
                >
                    <span className="text-primary">SHEET {stop.sheet}</span>
                    <span className="mx-2 text-muted-foreground">·</span>
                    {stop.place}
                    <span className="mx-2 text-muted-foreground">·</span>
                    {stop.period}
                </div>
            ))}
        </div>
    );
}
