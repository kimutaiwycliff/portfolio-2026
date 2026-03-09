import Link from "next/link"
import { socialLinks } from "@/data/socials"

export function Footer() {
    return (
        <footer className="w-full border-t border-border">
            <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold font-mono">
                        WK
                    </span>
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Wycliff Kimutai
                    </p>
                </div>

                <p className="text-xs font-mono text-muted-foreground/60">
                    Built with Next.js · Deployed on Vercel
                </p>

                <div className="flex items-center gap-4">
                    {socialLinks.map((social) => (
                        <Link
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            title={social.name}
                        >
                            <social.icon className="h-4 w-4" />
                            <span className="sr-only">{social.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    )
}
