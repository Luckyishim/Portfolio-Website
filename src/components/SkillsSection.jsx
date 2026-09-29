import { useState } from "react"
import { cn } from "../lib/utils"

const skills = [
    // Languages
    { name: "HTML/CSS", category: "languages" },
    { name: "JavaScript", category: "languages" },
    { name: "Java", category: "languages" },

    // Frameworks & Libraries
    { name: "React", category: "frameworks" },
    { name: "Node.js", category: "frameworks" },
    { name: "Express.js", category: "frameworks" },
    { name: "Firebase", category: "frameworks" },

    // Database
    { name: "MongoDB", category: "database" },

    // Tools & Practices
    { name: "Git/GitHub", category: "tools" },
    { name: "Figma", category: "tools" },
    { name: "VS Code", category: "tools" },
    { name: "Postman", category: "tools" },
]
const categories = ["all", "languages", "frameworks", "database", "tools"]

export const SkillsSection = () => {

    const [activeCategory, setActiveCategory] = useState("all")

    const filteredSkills = skills.filter(
        (skill) => activeCategory === "all" || skill.category === activeCategory)

    return <section id="skills" className="py-24 px-4 relative bg-secondary/30" >
        <div className="container mx-auto max-w-5xl" >
            <h2 className="text-3xl md:tex-4xl font-bold mb-12 text-center" >
                My <span className="text-primary" >Skills</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-4 mb-12" >
                {categories.map((category, key) => (
                    <button key={key}
                        onClick={() => setActiveCategory(category)}
                        className={cn(
                            "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
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
                    <span key={skill.name} className="px-4 py-2 text-sm rounded-full bg-primary/20 text-secondary-foreground">
                        {skill.name}
                    </span>
                ))}
            </div>
        </div>
    </section>
}
