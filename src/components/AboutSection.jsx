import { Code, GitBranch, User } from "lucide-react"

export const AboutSection = () => {
    return <section id="about" className="py-24 px-4 relative" >
        <div className="container mx-auto max-w-5xl" >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" >
                About <span className="text-primary" >Me</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" >
                <div className="space-y-6" >
                    <h3 className="text-2xl font-semibold" >Dedicated Web Developer</h3>
                    <p className="text-muted-forefround" >
                       I build web applications that are functional, well-structured, and thought through. 
                       My work spans React, JavaScript, and responsive design; with a focus on getting the details right.
                    </p>
                    <p className="text-muted-forefround">
Currently expanding into full-stack development, driven by a genuine curiosity for how everything connects; from UI to database to deployment.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center" >
                        <a href="#contact"
                            className="cosmic-button" >
                            Get In Touch
                        </a>
                        {/* CV ko link halne yesma pachi */}
                        <a href="projects/Lucky_Rajkarnikar_CV_Resume_2026-06-11.pdf"
                            className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300" >
                            Download CV
                        </a>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6" >
                    <div className="gradient-border p-6 card-hover">
                        <div className="flex items-start gap-4" >
                            <div className="p-3 rounded-full bg-primary/10" >
                                <Code className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-left" >
                                <h4 className="font-semibold text-lg" >  Frontend Developer</h4>
                                <p className="text-muted-foreground" > Create various website with only basic frontend logics</p>
                            </div>
                        </div>
                    </div>
                    <div className="gradient-border p-6 card-hover">
                        <div className="flex items-start gap-4" >
                            <div className="p-3 rounded-full bg-primary/10" >
                                <User className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-left" >
                                <h4 className="font-semibold text-lg" > Design UI </h4>
                                <p className="text-muted-foreground" > Design basic UI on Figma for creating frontend applicaton </p>
                            </div>
                        </div>
                    </div>
                    <div className="gradient-border p-6 card-hover">
                        <div className="flex items-start gap-4" >
                            <div className="p-3 rounded-full bg-primary/10" >
                                <GitBranch className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-left" >
                                <h4 className="font-semibold text-lg"  > Uploaded to Github</h4>
                                <p className="text-muted-foreground" > Used Github to store and show the deployed projects</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}