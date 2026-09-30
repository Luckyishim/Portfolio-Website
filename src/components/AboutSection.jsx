import { Code, Lightbulb, User } from "lucide-react"

export const AboutSection = () => {
    return <section id="about" className="py-24 px-4 relative" >
        <div className="container mx-auto max-w-5xl" >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" >
                About <span className="text-primary" >Me</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" >
                <div className="space-y-6" >
                    <h3 className="text-2xl font-semibold" >Web Developer & UX Designer</h3>
                    <p className="text-muted-forefround" >
                        I build web applications and user experiences that are functional, well-structured, and thoughtfully designed. My work spans React, JavaScript, UX design, and full-stack development with the MERN stack.
                    </p>
                    <p className="text-muted-forefround">
                        Currently deepening my full-stack skills, building complete applications from authentication and database design to deployment, driven by a genuine curiosity for how everything connects.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center" >
                        <a href="#contact"
                            className="cosmic-button" >
                            Get In Touch
                        </a>
                        <a href="/public/projects/Lucky_Rajkarnikar_CV_Resume.pdf"
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
                                <h4 className="font-semibold text-lg" > Full-Stack Developer</h4>
                                <p className="text-muted-foreground" > Build complete web applications with React frontends and Node.js/Express backends, connected to MongoDB.</p>
                            </div>
                        </div>
                    </div>
                    <div className="gradient-border p-6 card-hover">
                        <div className="flex items-start gap-4" >
                            <div className="p-3 rounded-full bg-primary/10" >
                                <User className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-left" >
                                <h4 className="font-semibold text-lg" > UX Design </h4>
                                <p className="text-muted-foreground" > UX design in Figma: wireframing, prototyping, and usability evaluation.</p>
                            </div>
                        </div>
                    </div>
                    <div className="gradient-border p-6 card-hover">
                        <div className="flex items-start gap-4" >
                            <div className="p-3 rounded-full bg-primary/10" >
                                <Lightbulb className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-left" >
                                <h4 className="font-semibold text-lg"  > Problem Solving</h4>
                                <p className="text-muted-foreground" > Break down ideas into clear, practical solutions with attention to both users and details.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}
