import { Router } from "express"
import { Profile } from "../models/Profile.js"
import { Project } from "../models/Project.js"
import { Skill } from "../models/Skill.js"
import { DesignProject } from "../models/DesignProject.js"
import { Message } from "../models/Message.js"
import { authMiddleware } from "../middleware/auth.js"

const router = Router()

// ==========================================
// 1. ALL-IN-ONE PUBLIC PORTFOLIO DATA
// ==========================================
router.get("/portfolio", async (req, res) => {
  try {
    const [profile, projects, skills, designs] = await Promise.all([
      Profile.findOne(),
      Project.find().sort({ order: 1, createdAt: -1 }),
      Skill.find().sort({ order: 1, createdAt: 1 }),
      DesignProject.find().sort({ order: 1, createdAt: 1 })
    ])

    res.json({
      profile: profile || {},
      projects: projects || [],
      skills: skills || [],
      designs: designs || []
    })
  } catch (error) {
    console.error("Error fetching portfolio bundle:", error)
    res.status(500).json({ message: "Failed to load portfolio data.", error: error.message })
  }
})

// ==========================================
// 2. PROFILE ROUTES
// ==========================================
router.get("/profile", async (req, res) => {
  try {
    let profile = await Profile.findOne()
    if (!profile) {
      profile = await Profile.create({})
    }
    res.json(profile)
  } catch (error) {
    res.status(500).json({ message: "Failed to get profile.", error: error.message })
  }
})

router.put("/profile", authMiddleware, async (req, res) => {
  try {
    let profile = await Profile.findOne()
    if (!profile) {
      profile = new Profile(req.body)
    } else {
      Object.assign(profile, req.body)
    }
    await profile.save()
    res.json({ message: "Profile updated successfully.", profile })
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile.", error: error.message })
  }
})

// ==========================================
// 3. PROJECTS ROUTES
// ==========================================
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ message: "Failed to get projects.", error: error.message })
  }
})

router.post("/projects", authMiddleware, async (req, res) => {
  try {
    const { title, description, image, tags, demoUrl, githubUrl, order } = req.body
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required." })
    }

    const project = new Project({
      title,
      description,
      image: image || "/projects/Project2.png",
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(",").map(t => t.trim()) : []),
      demoUrl: demoUrl || "",
      githubUrl: githubUrl || "",
      order: order || 0
    })

    await project.save()
    res.status(201).json({ message: "Project created successfully.", project })
  } catch (error) {
    res.status(500).json({ message: "Failed to create project.", error: error.message })
  }
})

router.put("/projects/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, image, tags, demoUrl, githubUrl, order } = req.body
    const updateData = {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(image !== undefined && { image }),
      ...(tags !== undefined && { 
        tags: Array.isArray(tags) ? tags : tags.split(",").map(t => t.trim()) 
      }),
      ...(demoUrl !== undefined && { demoUrl }),
      ...(githubUrl !== undefined && { githubUrl }),
      ...(order !== undefined && { order })
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true })
    if (!project) {
      return res.status(404).json({ message: "Project not found." })
    }

    res.json({ message: "Project updated successfully.", project })
  } catch (error) {
    res.status(500).json({ message: "Failed to update project.", error: error.message })
  }
})

router.delete("/projects/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) {
      return res.status(404).json({ message: "Project not found." })
    }
    res.json({ message: "Project deleted successfully." })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete project.", error: error.message })
  }
})

// ==========================================
// 4. SKILLS ROUTES
// ==========================================
router.get("/skills", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1, createdAt: 1 })
    res.json(skills)
  } catch (error) {
    res.status(500).json({ message: "Failed to get skills.", error: error.message })
  }
})

router.post("/skills", authMiddleware, async (req, res) => {
  try {
    const { name, category, order } = req.body
    if (!name || !category) {
      return res.status(400).json({ message: "Skill name and category are required." })
    }

    const skill = new Skill({
      name: name.trim(),
      category: category.toLowerCase().trim(),
      order: order || 0
    })

    await skill.save()
    res.status(201).json({ message: "Skill created successfully.", skill })
  } catch (error) {
    res.status(500).json({ message: "Failed to create skill.", error: error.message })
  }
})

router.put("/skills/:id", authMiddleware, async (req, res) => {
  try {
    const { name, category, order } = req.body
    const updateData = {
      ...(name && { name: name.trim() }),
      ...(category && { category: category.toLowerCase().trim() }),
      ...(order !== undefined && { order })
    }

    const skill = await Skill.findByIdAndUpdate(req.params.id, updateData, { new: true })
    if (!skill) {
      return res.status(404).json({ message: "Skill not found." })
    }
    res.json({ message: "Skill updated successfully.", skill })
  } catch (error) {
    res.status(500).json({ message: "Failed to update skill.", error: error.message })
  }
})

router.delete("/skills/:id", authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id)
    if (!skill) {
      return res.status(404).json({ message: "Skill not found." })
    }
    res.json({ message: "Skill deleted successfully." })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete skill.", error: error.message })
  }
})

// ==========================================
// 5. DESIGN PROJECTS ROUTES
// ==========================================
router.get("/designs", async (req, res) => {
  try {
    const designs = await DesignProject.find().sort({ order: 1, createdAt: 1 })
    res.json(designs)
  } catch (error) {
    res.status(500).json({ message: "Failed to get design projects.", error: error.message })
  }
})

router.post("/designs", authMiddleware, async (req, res) => {
  try {
    const { title, subtitle, description, prototypeUrl, designFileUrl, order } = req.body
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required." })
    }

    const design = new DesignProject({
      title,
      subtitle: subtitle || "",
      description,
      prototypeUrl: prototypeUrl || "",
      designFileUrl: designFileUrl || "",
      order: order || 0
    })

    await design.save()
    res.status(201).json({ message: "Design project created successfully.", design })
  } catch (error) {
    res.status(500).json({ message: "Failed to create design project.", error: error.message })
  }
})

router.put("/designs/:id", authMiddleware, async (req, res) => {
  try {
    const design = await DesignProject.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!design) {
      return res.status(404).json({ message: "Design project not found." })
    }
    res.json({ message: "Design project updated successfully.", design })
  } catch (error) {
    res.status(500).json({ message: "Failed to update design project.", error: error.message })
  }
})

router.delete("/designs/:id", authMiddleware, async (req, res) => {
  try {
    const design = await DesignProject.findByIdAndDelete(req.params.id)
    if (!design) {
      return res.status(404).json({ message: "Design project not found." })
    }
    res.json({ message: "Design project deleted successfully." })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete design project.", error: error.message })
  }
})

// ==========================================
// 6. CONTACT MESSAGES ROUTES
// ==========================================
router.post("/messages", async (req, res) => {
  try {
    const { name, email, message } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields (name, email, message) are required." })
    }

    const newMessage = new Message({ name, email, message })
    await newMessage.save()

    res.status(201).json({ message: "Message received successfully!" })
  } catch (error) {
    console.error("Message save error:", error)
    res.status(500).json({ message: "Failed to save message.", error: error.message })
  }
})

router.get("/messages", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })
    res.json(messages)
  } catch (error) {
    res.status(500).json({ message: "Failed to get messages.", error: error.message })
  }
})

router.delete("/messages/:id", authMiddleware, async (req, res) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id)
    if (!msg) {
      return res.status(404).json({ message: "Message not found." })
    }
    res.json({ message: "Message deleted successfully." })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete message.", error: error.message })
  }
})

export default router
