import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import { User } from "./models/User.js"
import { Profile } from "./models/Profile.js"
import { Project } from "./models/Project.js"
import { Skill } from "./models/Skill.js"
import { DesignProject } from "./models/DesignProject.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load from server/.env, then fallback to current directory
dotenv.config({ path: path.join(__dirname, ".env") })
dotenv.config()

let MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio"
if (MONGO_URI.endsWith("/")) {
  MONGO_URI += "portfolio?retryWrites=true&w=majority"
}

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

export const initialProjects = [
  {
    title: "Quote-Collector",
    description: "A quote management app that lets users collect, organize, and quickly find meaningful quotes using smart search, categories, and personal collections.",
    image: "/projects/Project2.png",
    tags: ["React.JS", "CSS"],
    demoUrl: "https://quote-collector.surge.sh/",
    githubUrl: "https://github.com/Luckyishim/Quote-Collector.git",
    order: 1
  },
  {
    title: "Memoire-Journals",
    description: "A journaling web app with a rich text editor, timeline-based navigation, people tracking for a more organized and contextual writing experience.",
    image: "/projects/Project3.png",
    tags: ["React.JS", "CSS", "FireBase"],
    demoUrl: "https://memoire-0610.web.app",
    githubUrl: "https://github.com/Luckyishim/Memoire-Journals.git",
    order: 2
  },
  {
    title: "Expenses Tracker",
    description: "A full-stack expense-tracking application for recording income and expenses, reviewing balances, and viewing monthly category summaries. Every account has its own protected transactions and profile.",
    image: "/projects/Project4.png",
    tags: ["React.JS", "Node.JS", "Express.JS", "MongoDB"],
    demoUrl: "https://expenses-tracker-lime-seven.vercel.app/",
    githubUrl: "https://github.com/Luckyishim/Expenses-Tracker",
    order: 3
  },
  {
    title: "Task Manager",
    description: "A full-stack task-tracking application for organizing productivity, priorities, and workflow deadlines. Complete with intuitive UI and full CRUD operations.",
    image: "/projects/Project5.png",
    tags: ["React.JS", "Node.JS", "Express.JS", "MongoDB"],
    demoUrl: "https://task-manager.luckyrajkarnikar.workers.dev/",
    githubUrl: "https://github.com/Luckyishim/Task-Manager",
    order: 4
  }
]

export const initialSkills = [
  { name: "HTML/CSS", category: "languages", order: 1 },
  { name: "JavaScript", category: "languages", order: 2 },
  { name: "Java", category: "languages", order: 3 },
  { name: "React", category: "frameworks", order: 4 },
  { name: "Node.js", category: "frameworks", order: 5 },
  { name: "Express.js", category: "frameworks", order: 6 },
  { name: "Firebase", category: "frameworks", order: 7 },
  { name: "MongoDB", category: "database", order: 8 },
  { name: "Git/GitHub", category: "tools", order: 9 },
  { name: "Figma", category: "tools", order: 10 },
  { name: "VS Code", category: "tools", order: 11 },
  { name: "Postman", category: "tools", order: 12 }
]

export const initialDesigns = [
  {
    title: "Syaphale On The Way",
    subtitle: "UX design for a café concept",
    description: "Designed wireframes and an interactive prototype for a café concept. Explored parallel design options and refined them through peer evaluation and participatory design.",
    prototypeUrl: "https://www.figma.com/proto/9JGZJhE9fqqnsFls9nvJ7G/Syaphale-On-The-Way-Project?node-id=238-74&t=cKe9z0kUhZnQ1N4i-1",
    designFileUrl: "https://www.figma.com/design/9JGZJhE9fqqnsFls9nvJ7G/Syaphale-On-The-Way-Project?node-id=238-74&t=cKe9z0kUhZnQ1N4i-1",
    order: 1
  },
  {
    title: "Personal Trainer Booking Platform",
    subtitle: "UI design for a personal trainer booking platform",
    description: "Designed a high-fidelity mobile app for finding and booking personal trainers. Built a design system and 7 screens covering discovery, booking, and chat.",
    prototypeUrl: "https://www.figma.com/proto/mbcmbECWw4I3NtXcjgRgxh/Booking-System?node-id=0-1&t=UXHs7VYcmrXX2u7f-1",
    designFileUrl: "https://www.figma.com/design/mbcmbECWw4I3NtXcjgRgxh/Booking-System?node-id=0-1&t=UXHs7VYcmrXX2u7f-1",
    order: 2
  }
]

export const initialProfileData = {
  name: "Lucky Rajkarnikar",
  role: "Web Developer & UX Designer",
  tagline: "Building interactive web apps and thoughtful UX designs with React, the MERN stack, and Figma.",
  bioParagraph1: "I build web applications and user experiences that are functional, well-structured, and thoughtfully designed. My work spans React, JavaScript, UX design, and full-stack development with the MERN stack.",
  bioParagraph2: "Currently deepening my full-stack skills, building complete applications from authentication and database design to deployment, driven by a genuine curiosity for how everything connects.",
  email: "luckyrajkarnikar@gmail.com",
  phone: "+977 9866046898",
  location: "Maitidevi, Kathmandu",
  githubUrl: "https://github.com/Luckyishim",
  linkedinUrl: "https://www.linkedin.com/in/lucky-rajkarnikar-867709206/",
  instagramUrl: "https://www.instagram.com/",
  developerCvUrl: "/projects/Lucky_Rajkarnikar_CV.pdf",
  uiuxCvUrl: "/projects/Lucky_Rajkarnikar_UIUX_CV.pdf",
  aboutCards: [
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

export async function runAutoSeed() {
  // 1. Seed or Update Admin User
  const existingAdmin = await User.findOne({ username: ADMIN_USERNAME })
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10)
  if (!existingAdmin) {
    await User.create({ username: ADMIN_USERNAME, password: hashedPassword })
    console.log(` Created admin user: "${ADMIN_USERNAME}" (Password: "${ADMIN_PASSWORD}")`)
  } else {
    console.log(` Admin user "${ADMIN_USERNAME}" is ready.`)
  }

  // 2. Seed Profile
  const profileCount = await Profile.countDocuments()
  if (profileCount === 0) {
    await Profile.create(initialProfileData)
    console.log(" Seeded initial Profile.")
  }

  // 3. Seed Projects
  const projectCount = await Project.countDocuments()
  if (projectCount === 0) {
    await Project.insertMany(initialProjects)
    console.log(` Seeded ${initialProjects.length} initial Projects.`)
  }

  // 4. Seed Skills
  const skillCount = await Skill.countDocuments()
  if (skillCount === 0) {
    await Skill.insertMany(initialSkills)
    console.log(` Seeded ${initialSkills.length} initial Skills.`)
  }

  // 5. Seed Design Projects
  const designCount = await DesignProject.countDocuments()
  if (designCount === 0) {
    await DesignProject.insertMany(initialDesigns)
    console.log(` Seeded ${initialDesigns.length} initial Design Projects.`)
  }
}

async function seedStandalone() {
  try {
    console.log("Connecting to MongoDB at:", MONGO_URI.replace(/:[^:]*@/, ":****@"))
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 8000 })
    console.log(" Connected to MongoDB successfully.")

    await runAutoSeed()

    console.log("\n Database seeding finished successfully!")
    process.exit(0)
  } catch (error) {
    console.error(" Error seeding database:", error)
    process.exit(1)
  }
}

// If executed directly: node seed.js
if (process.argv[1] && process.argv[1].endsWith("seed.js")) {
  seedStandalone()
}
