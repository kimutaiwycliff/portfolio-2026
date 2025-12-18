"use server"

import { z } from "zod"

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

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would send this to Resend, SendGrid, etc.
    // console.log("Form submitted:", validatedFields.data)

    return {
        success: true,
        message: "Email sent successfully!",
    }
}
