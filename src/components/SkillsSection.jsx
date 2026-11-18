import { useState } from "react"
import { cn } from "../lib/utils"
import { usePortfolio } from "../context/PortfolioContext"

export const SkillsSection = () => {
    const { skills } = usePortfolio()
    const [activeCategory, setActiveCategory] = useState("all")

    // Dynamically derive categories from current skills
    const categories = ["all", ...new Set((skills || []).map((s) => s.category).filter(Boolean))]

    const filteredSkills = (skills || []).filter(
        (skill) => activeCategory === "all" || skill.category === activeCategory
    )

    return <section id="skills" className="py-24 px-4 relative bg-secondary/30" >
        <div className="container mx-auto max-w-5xl" >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" >
                My <span className="text-primary" >Skills</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-4 mb-12" >
                {categories.map((category) => (
                    <button key={category}
                        onClick={() => setActiveCategory(category)}
                        className={cn(
                            "px-5 py-2 rounded-full transition-colors duration-300 capitalize cursor-pointer",
                            activeCategory === category
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary/70 text-foreground hover:bg-secondary"
                        )} >
                        {category}
                    </button>
                ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                {filteredSkills.map((skill) => (
                    <span key={skill._id || skill.name} className="px-4 py-2 text-sm rounded-full bg-primary/20 text-secondary-foreground font-medium">
                        {skill.name}
                    </span>
                ))}
            </div>
        </div>
    </section>
}
