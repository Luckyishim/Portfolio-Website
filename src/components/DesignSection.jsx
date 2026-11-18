import { ExternalLink } from "lucide-react"
import { usePortfolio } from "../context/PortfolioContext"

export const DesignSection = () => {
    const { designs } = usePortfolio()

    return <section id="design" className="py-24 px-4 relative bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Design <span className="text-primary">Work</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                A look at my UX process, from early ideas to interactive prototypes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(designs || []).map((project) => (
                    <article key={project._id || project.id} className="h-full bg-card rounded-lg p-6 md:p-8 shadow-xs card-hover text-left flex flex-col">
                        <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-primary font-medium mb-4">{project.subtitle}</p>
                        <p className="text-muted-foreground mb-6">{project.description}</p>
                        <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {project.prototypeUrl && (
                                <a
                                    href={project.prototypeUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="cosmic-button w-full px-4 text-sm whitespace-nowrap inline-flex items-center justify-center gap-2"
                                >
                                    View Figma Prototype <ExternalLink size={16} />
                                </a>
                            )}
                            {project.designFileUrl && (
                                <a
                                    href={project.designFileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full px-4 py-2 text-sm whitespace-nowrap rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 inline-flex items-center justify-center gap-2"
                                >
                                    View Design File <ExternalLink size={16} />
                                </a>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    </section>
}
