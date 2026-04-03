import { ArrowRight, ExternalLink, GitFork } from "lucide-react"

const projects = [
    {
        id: 1,
        title: "Codelecta",
        description: "Responsive Website made to understand simple coding languages using HTML/CSS.",
        image: "/projects/Project1.png",
        tags: ["HTML/CSS", "JavaScript"],
        demoUrl: "https://codelecta.surge.sh/",
        githubUrl: "https://github.com/Codelecta/Codelecta.git",
    },
    {
        id: 2,
        title: "Quote-Collector",
        description: "A quote management app that lets users collect, organize, and quickly find meaningful quotes using smart search, categories, and personal collections.",
        image: "/projects/Project2.png",
        tags: ["HTML/CSS", "JavaScript"],
        demoUrl: "https://quote-collector.surge.sh/",
        githubUrl: "https://github.com/Luckyishim/Quote-Collector.git",
    },
    {
        id: 3,
        title: "Memoire-Journals",
        description: "A journaling web app with a rich text editor, timeline-based navigation, people tracking for a more organized and contextual writing experience.",
        image: "/projects/Project3.png",
        tags: ["React.JS", "CSS", "FireBase"],
        demoUrl: "https://memoire-0610.web.app",
        githubUrl: "https://github.com/Luckyishim/Memoire-Journals.git",
    },
]

export const ProjectsSection = () => {
    return <section id="projects" className="py-24 px-4 relative" >
        <div className="container mx-auto max-w-5xl" >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center" >
                Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto" >
                Here are some of the projects I have done recenlty.
                Every Project is done carefully and documented likewise to have more understanding of it
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" >
                {projects.map((project, key) => (
                    <div key={key}
                        className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover" >

                        <div className="h-48 overflow-hidden" >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>

                        <div className="p-6" >
                            <div className="flex flex-wrap gap-2 mb-4" >
                                {project.tags.map((tag) => (
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-secondary-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </div>


                            <h3 className="text-xl font-semibold mb-1" >
                                {project.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4 " >
                                {project.description}
                            </p>
                            <div className="flex justify-between items-center" >
                                <div className="flex space-x-3" >\
                                    <a href={project.demoUrl}
                                        target="_blank"
                                        className="text-foregone/80 hover:text-primary transition-colors duration-300"
                                    >
                                        <ExternalLink size={20} />
                                    </a>
                                    <a href={project.githubUrl}
                                        target="_blank"
                                        className="text-foregone/80 hover:text-primary transition-colors duration-300"
                                    >
                                        <GitFork size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12" >
                <a className="cosmic-button w-fit flex items-center mx-auto gap-2" 
                target="_blank"
                href="https://github.com/Luckyishim" >
                    Check My Github <ArrowRight size={16} />
                </a>
            </div>
        </div>
    </section>
}