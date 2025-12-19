import Link from "next/link"
import { socialLinks } from "@/data/socials"

export function Footer() {
    return (
        <footer className="w-full py-6 md:py-12 border-t bg-background">
            <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-between gap-6 md:flex-row">
                <p className="text-sm text-muted-foreground text-center md:text-left">
                    &copy; {new Date().getFullYear()} Wycliff Kimutai. All rights reserved.
                </p>

                <div className="flex items-center gap-6">
                    {socialLinks.map((social) => (
                        <Link
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <social.icon className="h-5 w-5" />
                            <span className="sr-only">{social.name}</span>
                        </Link>
                    ))}
                </div>

                <p className="text-xs text-muted-foreground">
                    Built with <span className="font-semibold text-foreground">Next.js 15</span> ⚡
                </p>
            </div>
        </footer>
    )
}
