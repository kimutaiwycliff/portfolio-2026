import { Github, Linkedin, Mail } from "lucide-react"
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon"
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
        name: "WhatsApp",
        url: `https://wa.me/${contactDetails.whatsapp}?text=${encodeURIComponent("Hi Wycliff, I found your portfolio and would like to connect.")}`,
        icon: WhatsAppIcon
    },
    {
        name: "Email",
        url: `mailto:${contactDetails.email}`,
        icon: Mail
    }
]
