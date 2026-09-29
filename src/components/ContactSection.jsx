import { Mail, MapPin, Phone, Send } from "lucide-react"
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa"
import { cn } from "../lib/utils"
import { useState } from "react"
import emailjs from "@emailjs/browser"

export const ContactSection = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formStatus, setFormStatus] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

        if (!serviceId || !templateId || !publicKey) {
            setFormStatus({ type: "error", message: "The contact form is not configured yet. Please try again later." })
            return
        }

        setIsSubmitting(true)
        setFormStatus(null)

        try {
            await emailjs.sendForm(serviceId, templateId, form, { publicKey })
            form.reset()
            setFormStatus({ type: "success", message: "Message sent! Thank you — I'll get back to you soon." })
        } catch (error) {
            console.error("EmailJS send failed:", error)
            setFormStatus({ type: "error", message: "Sorry, your message could not be sent. Please try again or email me directly." })
        } finally {
            setIsSubmitting(false)
        }
    }


    return <section id="contact"
        className="py-24 px-4 relative bg-secondary/30" >
        <div className="container mx-auto max-w-5xl" >

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Get In <span className="text-primary" >
                    Touch
                </span>
            </h2>

            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto" >
                Have any project available to work on or want to just collaborate?
                Feel free to reach out. <br />
                I'm open to learn and grow more.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-11" >
                <div className="space-y-8 ">
                    <h3 className="text-2xl font-semibold mb-6"> Contact Information</h3>
                    <div className="space-y-6 justify-center">
                        <div className="flex items-start space-x-4" >
                            <div className="p-3 rounded-full bg-primary/10">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-medium"> Email</h4>
                                <a href="mailto:luckyrajkarnikar@gmail.com" className="text-muted-foreground hover:text-primary transtition-colors">
                                    luckyrajkarnikar@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6 justify-center">
                        <div className="flex items-start space-x-4" >
                            <div className="p-3 rounded-full bg-primary/10">
                                <Phone className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-medium"> Phone</h4>
                                <a href="tel:+977 9866046898" className="text-muted-foreground hover:text-primary transtition-colors">
                                    +977 9866046898
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6 justify-center">
                        <div className="flex items-start space-x-4" >
                            <div className="p-3 rounded-full bg-primary/10">
                                <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-medium"> Location</h4>
                                <a className="text-muted-foreground hover:text-primary transtition-colors">
                                    Maitidevi, Kathmandu
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <h4 className="font-medium mb-4" >Connect With Me</h4>
                        <div className="flex space-x-4 justify-center">
                            <a
                                href="https://www.linkedin.com/in/lucky-rajkarnikar-867709206/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="p-3 rounded-full border border-border bg-card text-foreground hover:text-primary hover:border-primary transition-colors duration-300"
                            >
                                <FaLinkedinIn className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="p-3 rounded-full border border-border bg-card text-foreground hover:text-primary hover:border-primary transition-colors duration-300"
                            >
                                <FaInstagram className="h-5 w-5" />
                            </a>
                            <a
                                href="https://github.com/Luckyishim"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                                className="p-3 rounded-full border border-border bg-card text-foreground hover:text-primary hover:border-primary transition-colors duration-300"
                            >
                                <FaGithub className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="bg-card p-8 rounded-lg shadow-xs">
                    <h3 className="text-2xl font-semibold mb-6">
                        Send a Message
                    </h3>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                            <input type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring2 focus:ring-primary"
                                placeholder="Lucky Rajkarnikar..." />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                            <input type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring2 focus:ring-primary"
                                placeholder="sam@gmail.com" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring2 focus:ring-primary resize-none"
                                placeholder="Hello, I'd Like to talk about..." />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={cn("cosmic-button w-full flex items-center justify-center gap-2")}

                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                            <Send size={16} />
                        </button>
                        {formStatus && (
                            <p role="status" className={cn("text-sm", formStatus.type === "success" ? "text-primary" : "text-destructive")}>
                                {formStatus.message}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    </section>
}
