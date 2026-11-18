import { useState } from "react"
import { ChevronDown, Code, Lightbulb, User } from "lucide-react"
import { usePortfolio } from "../context/PortfolioContext"

const iconMap = {
    code: Code,
    user: User,
    lightbulb: Lightbulb
}

export const AboutSection = () => {
    const [isCvMenuOpen, setIsCvMenuOpen] = useState(false)
    const { profile } = usePortfolio()

    const cards = profile?.aboutCards && profile.aboutCards.length > 0 ? profile.aboutCards : [
        {
            title: "Full-Stack Developer",
            description: "Build complete web applications with React frontends and Node.js/Express backends, connected to MongoDB.",
            icon: "code"
        },
        {
            title: "UX Design",
            description: "UX design in Figma: wireframing, prototyping, and usability evaluation.",
            icon: "user"
        },
        {
            title: "Problem Solving",
            description: "Break down ideas into clear, practical solutions with attention to both users and details.",
            icon: "lightbulb"
        }
    ]

    return <section id="about" className="py-24 px-4 relative" >
        <div className="container mx-auto max-w-5xl" >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" >
                About <span className="text-primary" >Me</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" >
                <div className="space-y-6" >
                    <h3 className="text-2xl font-semibold" >{profile?.role || "Web Developer & UX Designer"}</h3>
                    <p className="text-muted-foreground" >
                        {profile?.bioParagraph1 || "I build web applications and user experiences that are functional, well-structured, and thoughtfully designed. My work spans React, JavaScript, UX design, and full-stack development with the MERN stack."}
                    </p>
                    <p className="text-muted-foreground">
                        {profile?.bioParagraph2 || "Currently deepening my full-stack skills, building complete applications from authentication and database design to deployment, driven by a genuine curiosity for how everything connects."}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center" >
                        <a href="#contact"
                            className="cosmic-button" >
                            Get In Touch
                        </a>
                        <div className="relative">
                            <button
                                type="button"
                                aria-expanded={isCvMenuOpen}
                                aria-controls="cv-download-options"
                                onClick={() => setIsCvMenuOpen((isOpen) => !isOpen)}
                                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 inline-flex items-center gap-2 cursor-pointer"
                            >
                                Download CV
                                <ChevronDown size={16} aria-hidden="true" />
                            </button>
                            {isCvMenuOpen && (
                                <div
                                    id="cv-download-options"
                                    className="absolute z-10 right-0 mt-2 min-w-full rounded-xl border border-border bg-card p-2 shadow-lg"
                                >
                                    <a
                                        href={profile?.developerCvUrl || "/projects/Lucky_Rajkarnikar_CV.pdf"}
                                        download="Lucky_Rajkarnikar_Developer_CV.pdf"
                                        className="block whitespace-nowrap rounded-lg px-4 py-2 text-left text-foreground hover:bg-primary/10 transition-colors"
                                    >
                                        Developer CV
                                    </a>
                                    <a
                                        href={profile?.uiuxCvUrl || "/projects/Lucky_Rajkarnikar_UIUX_CV.pdf"}
                                        download
                                        className="block whitespace-nowrap rounded-lg px-4 py-2 text-left text-foreground hover:bg-primary/10 transition-colors"
                                    >
                                        UI/UX CV
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6" >
                    {cards.map((card, idx) => {
                        const IconComponent = iconMap[card.icon] || Code
                        return (
                            <div key={idx} className="gradient-border p-6 card-hover">
                                <div className="flex items-start gap-4" >
                                    <div className="p-3 rounded-full bg-primary/10" >
                                        <IconComponent className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="text-left" >
                                        <h4 className="font-semibold text-lg" > {card.title}</h4>
                                        <p className="text-muted-foreground" > {card.description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </section>
}
