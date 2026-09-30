import { ExternalLink } from "lucide-react"

const designProjects = [
    {
        id: 1,
        title: "Syaphale On The Way",
        subtitle: "UX design for a café concept ",
        description: "Designed wireframes and an interactive prototype for a café concept. Explored parallel design options and refined them through peer evaluation and participatory design.",
        prototypeUrl: "https://www.figma.com/proto/9JGZJhE9fqqnsFls9nvJ7G/Syaphale-On-The-Way-Project?node-id=238-74&t=cKe9z0kUhZnQ1N4i-1",
        designFileUrl: "https://www.figma.com/design/9JGZJhE9fqqnsFls9nvJ7G/Syaphale-On-The-Way-Project?node-id=238-74&t=cKe9z0kUhZnQ1N4i-1",
    },
    {
        id: 2,
        title: "Personal Trainer Booking Platform",
        subtitle: "UI design for a personal trainer booking platform",
        description: "Designed a high-fidelity mobile app for finding and booking personal trainers. Built a design system and 7 screens covering discovery, booking, and chat.",
        prototypeUrl: "https://www.figma.com/proto/mbcmbECWw4I3NtXcjgRgxh/Booking-System?node-id=0-1&t=UXHs7VYcmrXX2u7f-1",
        designFileUrl: "https://www.figma.com/design/mbcmbECWw4I3NtXcjgRgxh/Booking-System?node-id=0-1&t=UXHs7VYcmrXX2u7f-1",
    },
]

export const DesignSection = () => {
    return <section id="design" className="py-24 px-4 relative bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Design <span className="text-primary">Work</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                A look at my UX process, from early ideas to interactive prototypes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {designProjects.map((project) => (
                    <article key={project.id} className="h-full bg-card rounded-lg p-6 md:p-8 shadow-xs card-hover text-left flex flex-col">
                        <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-primary font-medium mb-4">{project.subtitle}</p>
                        <p className="text-muted-foreground mb-6">{project.description}</p>
                        <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <a
                                href={project.prototypeUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="cosmic-button w-full px-4 text-sm whitespace-nowrap inline-flex items-center justify-center gap-2"
                            >
                                View Figma Prototype <ExternalLink size={16} />
                            </a>
                            <a
                                href={project.designFileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full px-4 py-2 text-sm whitespace-nowrap rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 inline-flex items-center justify-center gap-2"
                            >
                                View Design File <ExternalLink size={16} />
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    </section>
}
