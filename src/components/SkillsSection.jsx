const skills = [
    //Frontend
    { name: "HTML/CSS", level: 70, category: "frontend" },
    { name: "JavaScript", level: 60, category: "frontend" },
    { name: "React", level: 50, category: "frontend" },
    { name: "Java", level: 40, category: "frontend" },

    //Backend
    { name: "Firebase", level: 20, category: "backend" },

    //Tools
    { name: "Git/GitHub", level: 80, category: "tools" },
    { name: "Figma", level: 50, category: "tools" },
    { name: "VS Code", level: 80, category: "tools" },

]

export const SkillsSection = () => {
    return <section id="skills" className="py-24 px-4 relative bg-secondary/30" >
        <div className="container mx-auto max-w-5xl" >
            <h2 className="text-3xl md:tex-4xl font-bold mb-12 text-center" >
                My <span className="text-primary" >Skills</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" >
                {skills.map((skill, key) => {
                    <div 
                    key={key} 
                    className="bg-card p-6 rounded-lg shadow-xs card-hover" 
                    >

                        <div className="text-left mb-4" >
                            <h3 className="font-semibold text-lg" >{skill.name}</h3>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </section>
}