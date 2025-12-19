"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SectionWrapper } from "@/components/section-wrapper"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { useActionState } from "react" // React 19 / Next 15 hook
import { submitContactForm } from "@/actions/contact"
import { toast } from "sonner"
import { useEffect } from "react"
import { Label } from "@/components/ui/label"
import { contactDetails } from "@/data/contact"

export function Contact() {
    const [state, formAction, isPending] = useActionState(submitContactForm, null)

    useEffect(() => {
        if (state?.success) {
            toast.success("Message sent!", {
                description: "Thanks for reaching out. I'll get back to you soon.",
            })
        } else if (state?.error) {
            toast.error("Error", {
                description: state.error,
            })
        }
    }, [state])

    return (
        <SectionWrapper id="contact" className="bg-muted/30">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
                        <div className="h-1 w-20 bg-primary rounded-full mb-6" />
                        <p className="text-muted-foreground text-lg">
                            Interested in collaborating on a geospatial project or need a full-stack developer? I'm always open to discussing new opportunities and ideas.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full text-primary">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Email</h3>
                                <a href={`mailto:${contactDetails.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                                    {contactDetails.email}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full text-primary">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Phone</h3>
                                <a href={`tel:${contactDetails.phone.replace(/\s/g, '')}`} className="text-muted-foreground hover:text-primary transition-colors">
                                    {contactDetails.phone}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full text-primary">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Location</h3>
                                <p className="text-muted-foreground">{contactDetails.location}</p>
                            </div>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="w-full h-64 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all border shadow-sm">
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src={contactDetails.mapUrl}
                            title="Nairobi Map"
                        ></iframe>
                    </div>
                </div>

                {/* Contact Form */}
                <Card className="border-none shadow-lg">
                    <CardHeader>
                        <CardTitle>Send a Message</CardTitle>
                        <CardDescription>
                            Fill out the form below and I'll get back to you as soon as possible.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={formAction} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" placeholder="Your Name" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" name="subject" placeholder="Project Inquiry" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell me about your project..."
                                    className="min-h-[150px]"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? (
                                    "Sending..."
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" /> Send Message
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </SectionWrapper>
    )
}
