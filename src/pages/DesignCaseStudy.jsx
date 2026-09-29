import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

const processSteps = ["Wireframes", "Parallel Design", "Peer Evaluation", "Participatory Design"]
const designFileUrl = "PLACEHOLDER_FIGMA_DESIGN_FILE_LINK"

export const DesignCaseStudy = () => {
    return <main className="min-h-screen bg-background text-foreground px-4 py-12 md:py-20">
        <article className="container mx-auto max-w-3xl text-left">
            <Link to="/#design" className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors mb-10">
                <ArrowLeft size={18} /> Back to design work
            </Link>

            <p className="text-primary font-medium mb-3">UX case study · HCI coursework · Team of 4</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-12">Syaphale On The Way</h1>

            <div className="space-y-10">
                <section>
                    <h2 className="text-2xl font-semibold mb-3">The Problem</h2>
                    <p className="text-muted-foreground">[Add the problem your café concept was designed to solve.]</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">My Role</h2>
                    <p className="text-muted-foreground">[Describe your responsibilities and contributions within the team.]</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Process</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {processSteps.map((step) => (
                            <div key={step} className="gradient-border bg-card p-5">
                                <h3 className="font-semibold">{step}</h3>
                                <p className="text-sm text-muted-foreground mt-2">[Add details about this stage of the process.]</p>
                            </div>
                        ))}
                    </div>
                    <a
                        href={designFileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block text-sm text-primary hover:text-foreground transition-colors mt-5"
                    >
                        View Design File →
                    </a>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Final Screens</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {["Screen 1", "Screen 2", "Screen 3"].map((screen) => (
                            <div key={screen} className="aspect-[9/16] rounded-lg border border-dashed border-primary/50 bg-card flex items-center justify-center text-sm text-muted-foreground">
                                {screen} image placeholder
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">What I Learned</h2>
                    <p className="text-muted-foreground">[Add your reflections and key takeaways from this project.]</p>
                </section>
            </div>
        </article>
    </main>
}
