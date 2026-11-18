import { ArrowRight, ExternalLink } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { usePortfolio } from "../context/PortfolioContext"

export const ProjectsSection = () => {
    const { projects, profile } = usePortfolio()

    return <section id="projects" className="py-24 px-4 relative" >
        <div className="container mx-auto max-w-5xl" >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center" >
                Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto" >
                Each project is built carefully and documented on GitHub.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" >
                {(projects || []).map((project, key) => (
                    <div key={project._id || project.id || key}
                        className="group bg-card rounded-2xl border border-border shadow-xs card-hover flex flex-col h-full overflow-hidden" >

                        <div className="p-4 pb-0">
                            <div className="aspect-[16/10] overflow-hidden rounded-xl border border-border bg-secondary/30">
                            <img
                                src={project.image || "/projects/Project2.png"}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-1 text-left" >
                            <div className="flex flex-wrap content-start gap-2 min-h-14 mb-4" >
                                {(Array.isArray(project.tags) ? project.tags : []).map((tag) => (
                                    <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-secondary-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h3 className="text-2xl font-semibold mb-3" >
                                {project.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed mb-6" >
                                {project.description}
                            </p>
                            <div className="flex items-center mt-auto pt-5 border-t border-border" >
                                <div className="flex space-x-3" >
                                    {project.demoUrl && (
                                        <a href={project.demoUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={`View ${project.title} live demo`}
                                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                        >
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a href={project.githubUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={`View ${project.title} source on GitHub`}
                                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                        >
                                            <FaGithub size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12" >
                <a className="cosmic-button w-fit flex items-center mx-auto gap-2" 
                target="_blank"
                rel="noreferrer"
                href={profile?.githubUrl || "https://github.com/Luckyishim"} >
                    Check My Github <ArrowRight size={16} />
                </a>
            </div>
        </div>
    </section>
}
