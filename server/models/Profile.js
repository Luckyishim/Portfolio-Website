import mongoose from "mongoose"

const aboutCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: "code" } // "code", "user", "lightbulb"
}, { _id: false })

const profileSchema = new mongoose.Schema({
  name: { type: String, default: "Lucky Rajkarnikar" },
  role: { type: String, default: "Web Developer & UX Designer" },
  tagline: { 
    type: String, 
    default: "Building interactive web apps and thoughtful UX designs with React, the MERN stack, and Figma." 
  },
  bioParagraph1: { 
    type: String, 
    default: "I build web applications and user experiences that are functional, well-structured, and thoughtfully designed. My work spans React, JavaScript, UX design, and full-stack development with the MERN stack." 
  },
  bioParagraph2: { 
    type: String, 
    default: "Currently deepening my full-stack skills, building complete applications from authentication and database design to deployment, driven by a genuine curiosity for how everything connects." 
  },
  email: { type: String, default: "luckyrajkarnikar@gmail.com" },
  phone: { type: String, default: "+977 9866046898" },
  location: { type: String, default: "Maitidevi, Kathmandu" },
  githubUrl: { type: String, default: "https://github.com/Luckyishim" },
  linkedinUrl: { type: String, default: "https://www.linkedin.com/in/lucky-rajkarnikar-867709206/" },
  instagramUrl: { type: String, default: "https://www.instagram.com/" },
  developerCvUrl: { type: String, default: "/projects/Lucky_Rajkarnikar_CV.pdf" },
  uiuxCvUrl: { type: String, default: "/projects/Lucky_Rajkarnikar_UIUX_CV.pdf" },
  aboutCards: {
    type: [aboutCardSchema],
    default: [
      {
        title: "Full-Stack Developer",
        description: "Build complete web applications with React frontends and Node.js/Express backends, connected to MongoDB.",
        icon: "code"
      },
      {
        title: "UX Design",
        description: "UX design in Figma: wireframing, prototyping, and usability evaluation.",
        icon: "user"
      },
      {
        title: "Problem Solving",
        description: "Break down ideas into clear, practical solutions with attention to both users and details.",
        icon: "lightbulb"
      }
    ]
  }
}, { timestamps: true })

export const Profile = mongoose.model("Profile", profileSchema)
