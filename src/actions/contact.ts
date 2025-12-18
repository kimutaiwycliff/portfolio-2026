"use server"

import { z } from "zod"
import { Resend } from "resend"

const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function submitContactForm(prevState: any, formData: FormData) {
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
            subject: `Portfolio Inquiry: ${subject}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
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
