"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SectionWrapper } from "@/components/section-wrapper"
import { Mail, MapPin, Phone, Send, ArrowUpRight } from "lucide-react"
import { useActionState, useEffect } from "react"
import { submitContactForm } from "@/actions/contact"
import { toast } from "sonner"
import { contactDetails } from "@/data/contact"
import { motion } from "framer-motion"
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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="text-[11px] font-mono text-primary tracking-[0.22em] uppercase mb-4 flex items-center justify-center gap-3">
                        <span className="h-px w-8 bg-primary" />
                        Contact
                        <span className="h-px w-8 bg-primary" />
                    </p>
                    <h2 className="text-3xl md:text-6xl font-extrabold leading-tight mb-5 font-display">
                        Let&apos;s Build
                        <br />
                        <span className="text-primary">Something Great</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-6">
                        Open to geospatial engineering, full-stack development, and
                        interesting collaborations.
                    </p>

                    {/* Big email CTA */}
                    <a
                        href={`mailto:${contactDetails.email}`}
                        className="group inline-flex items-center gap-2 text-xl md:text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
                    >
                        {contactDetails.email}
                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Contact info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        {[
                            {
                                icon: Mail,
                                label: "Email",
                                value: contactDetails.email,
                                href: `mailto:${contactDetails.email}`,
                            },
                            {
                                icon: Phone,
                                label: "Phone",
                                value: contactDetails.phone,
                                href: `tel:${contactDetails.phone.replace(/\s/g, "")}`,
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
                                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground font-mono tracking-wide">
                                        {label}
                                    </p>
                                    {href ? (
                                        <a
                                            href={href}
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

                        {/* Map */}
                        <div className="w-full h-44 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all border border-border">
                            <iframe
                                width="100%"
                                height="100%"
                                src={contactDetails.mapUrl}
                                title="Nairobi Map"
                                style={{ border: 0 }}
                            />
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl bg-card border border-border p-7 md:p-8"
                    >
                        <form action={formAction} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
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
                                        className="bg-background border-border rounded-xl"
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
                                        className="bg-background border-border rounded-xl"
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
                                    className="bg-background border-border rounded-xl"
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
                                    className="min-h-[130px] bg-background border-border rounded-xl resize-none"
                                    required
                                />
                            </div>

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
                        </form>
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    )
}
