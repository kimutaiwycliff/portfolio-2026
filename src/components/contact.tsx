"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SectionWrapper } from "@/components/section-wrapper"
import { SheetLabel } from "@/components/sheet-frame"
import { Magnetic } from "@/components/ui/magnetic"
import { Reveal } from "@/components/ui/reveal"
import { Download, MapPin, Phone, Send, ArrowUpRight } from "lucide-react"
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon"
import { useActionState, useEffect } from "react"
import { submitContactForm } from "@/actions/contact"
import { toast } from "sonner"
import { contactDetails } from "@/data/contact"
import { socialLinks } from "@/data/socials"

export function Contact() {
    const [state, formAction, isPending] = useActionState(submitContactForm, null)

    useEffect(() => {
        if (state?.success) {
            toast.success("Message sent!", {
                description: "Thanks for reaching out. I'll get back to you soon.",
            })
        } else if (state?.error) {
            toast.error("Error", { description: state.error })
        }
    }, [state])

    return (
        <SectionWrapper id="contact" className="bg-muted/20">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <Reveal
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="text-[11px] font-mono tracking-[0.2em] uppercase mb-4 flex items-center justify-center gap-3">
                        <span className="text-primary">SHEET 06/06</span>
                        <span className="h-px w-8 bg-primary" />
                        <span className="text-muted-foreground">Contact</span>
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5 font-display">
                        Let&apos;s
                        <br />
                        <span className="text-primary">Talk</span>
                    </h2>
                    <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-6">
                        Open to software engineering roles (web, mobile, backend) and
                        geospatial work. Email is the quickest way to reach me.
                    </p>

                    {/* Big email CTA — stamps down like ink on a field form */}
                    <Reveal
                        initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.25, type: "spring", stiffness: 200, damping: 12 }}
                    >
                        <a
                            href={`mailto:${contactDetails.email}`}
                            className="group inline-flex items-center gap-2 text-base sm:text-xl md:text-2xl font-bold text-primary hover:text-primary/80 transition-colors break-all sm:break-normal"
                        >
                            {contactDetails.email}
                            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </Reveal>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                    {/* Contact info */}
                    <Reveal
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        {[
                            {
                                icon: Phone,
                                label: "Phone",
                                value: contactDetails.phone,
                                href: `tel:${contactDetails.phone.replace(/\s/g, "")}`,
                            },
                            {
                                icon: WhatsAppIcon,
                                label: "WhatsApp",
                                value: contactDetails.phone,
                                href: `https://wa.me/${contactDetails.whatsapp}`,
                            },
                            {
                                icon: MapPin,
                                label: "Location",
                                value: contactDetails.location,
                                href: undefined,
                            },
                        ].map(({ icon: Icon, label, value, href }) => (
                            <div
                                key={label}
                                className="flex items-center gap-4 p-4 rounded-md bg-card border border-border hover:border-primary/30 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground font-mono tracking-wide">
                                        {label}
                                    </p>
                                    {href ? (
                                        <a
                                            href={href}
                                            target={href.startsWith("http") ? "_blank" : undefined}
                                            rel={href.startsWith("http") ? "noreferrer" : undefined}
                                            className="font-medium hover:text-primary transition-colors text-sm"
                                        >
                                            {value}
                                        </a>
                                    ) : (
                                        <p className="font-medium text-sm">{value}</p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Social links */}
                        <div className="flex items-center gap-3 flex-wrap">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200 text-sm"
                                >
                                    <social.icon className="w-4 h-4" />
                                    {social.name}
                                </a>
                            ))}
                        </div>

                        <a
                            href="/CV.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Download my CV (PDF)
                        </a>
                    </Reveal>

                    {/* Form */}
                    <Reveal
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-lg bg-card border border-border p-4 sm:p-6 md:p-8"
                    >
                        <form action={formAction} className="space-y-5">
                            {/* Honeypot — hidden from people and screen readers; bots fill it in */}
                            <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
                                <label htmlFor="website">Website</label>
                                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label
                                        htmlFor="name"
                                        className="text-[11px] font-mono text-muted-foreground tracking-wide"
                                    >
                                        NAME
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Your Name"
                                        required
                                        className="bg-background border-border rounded-md"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label
                                        htmlFor="email"
                                        className="text-[11px] font-mono text-muted-foreground tracking-wide"
                                    >
                                        EMAIL
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@email.com"
                                        required
                                        className="bg-background border-border rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label
                                    htmlFor="subject"
                                    className="text-[11px] font-mono text-muted-foreground tracking-wide"
                                >
                                    SUBJECT
                                </Label>
                                <Input
                                    id="subject"
                                    name="subject"
                                    placeholder="Project Inquiry"
                                    required
                                    className="bg-background border-border rounded-md"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label
                                    htmlFor="message"
                                    className="text-[11px] font-mono text-muted-foreground tracking-wide"
                                >
                                    MESSAGE
                                </Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell me about your project..."
                                    className="min-h-[130px] bg-background border-border rounded-md resize-none"
                                    required
                                />
                            </div>

                            <Magnetic strength={0.2} className="block">
                                <Button
                                    type="submit"
                                    className="w-full rounded-full gap-2"
                                    disabled={isPending}
                                    size="lg"
                                >
                                    {isPending ? (
                                        "Sending…"
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            </Magnetic>
                        </form>
                    </Reveal>
                </div>
            </div>
        </SectionWrapper>
    )
}
