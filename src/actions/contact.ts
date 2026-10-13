"use server"

import { z } from "zod"
import { Resend } from "resend"

const contactSchema = z.object({
    name: z.string().trim().min(2, "Name is required").max(100, "Name is too long"),
    email: z.string().trim().email("Invalid email address").max(200),
    subject: z.string().trim().min(5, "Subject must be at least 5 characters").max(150, "Subject is too long"),
    message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000, "Message is too long"),
})

// Visitor input goes into an HTML email, so escape it rather than trusting it.
function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
}

export async function submitContactForm(prevState: any, formData: FormData) {
    // Honeypot: the "website" field is hidden from people, so only bots fill it.
    // Pretend success so they don't retry.
    if (formData.get("website")) {
        return { success: true, message: "Email sent successfully!" }
    }

    const validatedFields = contactSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
    })

    if (!validatedFields.success) {
        return {
            success: false,
            error: validatedFields.error.errors[0].message,
        }
    }

    const { name, email, subject, message } = validatedFields.data

    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
        console.error("Missing RESEND_API_KEY")
        return {
            success: false,
            error: "Server configuration error. Please contact me directly via email."
        }
    }

    const resend = new Resend(resendApiKey)

    try {
        const { error } = await resend.emails.send({
            from: process.env.EMAIL_SENDER_ADDRESS || 'Portfolio Contact Form <onboarding@resend.dev>',
            to: 'kimutaiwycliff90@gmail.com',
            replyTo: email,
            subject: `Portfolio Inquiry: ${subject.replace(/[\r\n]+/g, " ")}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      `
        })

        if (error) {
            console.error("Resend error:", error)
            return {
                success: false,
                error: "Failed to send email. Please try again later."
            }
        }

        return {
            success: true,
            message: "Email sent successfully!",
        }

    } catch (error) {
        console.error("Unexpected error:", error)
        return {
            success: false,
            error: "An unexpected error occurred."
        }
    }
}
