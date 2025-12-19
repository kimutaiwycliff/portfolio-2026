import { Github, Linkedin, Mail } from "lucide-react"
import { contactDetails } from "./contact"

export const socialLinks = [
    {
        name: "GitHub",
        url: "https://github.com/kimutaiwycliff", // Updated based on previous context or placeholder
        icon: Github
    },
    {
        name: "LinkedIn",
        url: "https://linkedin.com/in/wycliff-kimutai-698903139/", // Keeping placeholder but centralized
        icon: Linkedin
    },
    {
        name: "Email",
        url: `mailto:${contactDetails.email}`,
        icon: Mail
    }
]
