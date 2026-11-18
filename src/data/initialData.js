export const initialProfile = {
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

export const initialProjects = [
  {
    id: "1",
    _id: "1",
    title: "Quote-Collector",
    description: "A quote management app that lets users collect, organize, and quickly find meaningful quotes using smart search, categories, and personal collections.",
    image: "/projects/Project2.png",
    tags: ["React.JS", "CSS"],
    demoUrl: "https://quote-collector.surge.sh/",
    githubUrl: "https://github.com/Luckyishim/Quote-Collector.git"
  },
  {
    id: "2",
    _id: "2",
    title: "Memoire-Journals",
    description: "A journaling web app with a rich text editor, timeline-based navigation, people tracking for a more organized and contextual writing experience.",
    image: "/projects/Project3.png",
    tags: ["React.JS", "CSS", "FireBase"],
    demoUrl: "https://memoire-0610.web.app",
    githubUrl: "https://github.com/Luckyishim/Memoire-Journals.git"
  },
  {
    id: "3",
    _id: "3",
    title: "Expenses Tracker",
    description: "A full-stack expense-tracking application for recording income and expenses, reviewing balances, and viewing monthly category summaries. Every account has its own protected transactions and profile.",
    image: "/projects/Project4.png",
    tags: ["React.JS", "Node.JS", "Express.JS", "MongoDB"],
    demoUrl: "https://expenses-tracker-lime-seven.vercel.app/",
    githubUrl: "https://github.com/Luckyishim/Expenses-Tracker"
  },
  {
    id: "4",
    _id: "4",
    title: "Task Manager",
    description: "A full-stack task-tracking application for organizing productivity, priorities, and workflow deadlines. Complete with intuitive UI and full CRUD operations.",
    image: "/projects/Project5.png",
    tags: ["React.JS", "Node.JS", "Express.JS", "MongoDB"],
    demoUrl: "https://task-manager.luckyrajkarnikar.workers.dev/",
    githubUrl: "https://github.com/Luckyishim/Task-Manager"
  }
]

export const initialSkills = [
  { _id: "s1", name: "HTML/CSS", category: "languages" },
  { _id: "s2", name: "JavaScript", category: "languages" },
  { _id: "s3", name: "Java", category: "languages" },
  { _id: "s4", name: "React", category: "frameworks" },
  { _id: "s5", name: "Node.js", category: "frameworks" },
  { _id: "s6", name: "Express.js", category: "frameworks" },
  { _id: "s7", name: "Firebase", category: "frameworks" },
  { _id: "s8", name: "MongoDB", category: "database" },
  { _id: "s9", name: "Git/GitHub", category: "tools" },
  { _id: "s10", name: "Figma", category: "tools" },
  { _id: "s11", name: "VS Code", category: "tools" },
  { _id: "s12", name: "Postman", category: "tools" }
]

export const initialDesigns = [
  {
    _id: "d1",
    id: "d1",
    title: "Syaphale On The Way",
    subtitle: "UX design for a café concept",
    description: "Designed wireframes and an interactive prototype for a café concept. Explored parallel design options and refined them through peer evaluation and participatory design.",
    prototypeUrl: "https://www.figma.com/proto/9JGZJhE9fqqnsFls9nvJ7G/Syaphale-On-The-Way-Project?node-id=238-74&t=cKe9z0kUhZnQ1N4i-1",
    designFileUrl: "https://www.figma.com/design/9JGZJhE9fqqnsFls9nvJ7G/Syaphale-On-The-Way-Project?node-id=238-74&t=cKe9z0kUhZnQ1N4i-1"
  },
  {
    _id: "d2",
    id: "d2",
    title: "Personal Trainer Booking Platform",
    subtitle: "UI design for a personal trainer booking platform",
    description: "Designed a high-fidelity mobile app for finding and booking personal trainers. Built a design system and 7 screens covering discovery, booking, and chat.",
    prototypeUrl: "https://www.figma.com/proto/mbcmbECWw4I3NtXcjgRgxh/Booking-System?node-id=0-1&t=UXHs7VYcmrXX2u7f-1",
    designFileUrl: "https://www.figma.com/design/mbcmbECWw4I3NtXcjgRgxh/Booking-System?node-id=0-1&t=UXHs7VYcmrXX2u7f-1"
  }
]
