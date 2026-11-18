import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../models/User.js"
import { authMiddleware } from "../middleware/auth.js"

const router = Router()

// GET /api/auth/status - Checks if an admin user already exists
router.get("/status", async (req, res) => {
  try {
    const adminCount = await User.countDocuments()
    res.json({ hasAdmin: adminCount > 0 })
  } catch (error) {
    res.status(500).json({ message: "Failed to check auth status", error: error.message })
  }
})

// POST /api/auth/init - Creates initial admin user if none exists
router.post("/init", async (req, res) => {
  try {
    const adminCount = await User.countDocuments()
    if (adminCount > 0) {
      return res.status(400).json({ message: "Admin account already exists. Please log in." })
    }

    const username = (req.body.username && req.body.username.trim()) || process.env.ADMIN_USERNAME || "admin"
    const password = req.body.password || process.env.ADMIN_PASSWORD || "admin123"

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ username, password: hashedPassword })

    res.status(201).json({
      message: "Admin account created successfully!",
      username: newUser.username
    })
  } catch (error) {
    res.status(500).json({ message: "Failed to create admin.", error: error.message })
  }
})

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." })
    }

    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password." })
    }

    const secret = process.env.JWT_SECRET || "default_jwt_secret_change_in_production"
    const token = jwt.sign(
      { id: user._id, username: user.username },
      secret,
      { expiresIn: "7d" }
    )

    res.json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        username: user.username
      }
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error during login.", error: error.message })
  }
})

// GET /api/auth/me (Protected)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found." })
    }
    res.json({ user })
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user.", error: error.message })
  }
})

// PUT /api/auth/update-credentials (Protected)
router.put("/update-credentials", authMiddleware, async (req, res) => {
  try {
    const { newUsername, currentPassword, newPassword } = req.body

    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: "User not found." })
    }

    if (currentPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect." })
      }
    }

    if (newUsername && newUsername.trim()) {
      user.username = newUsername.trim()
    }

    if (newPassword && newPassword.trim()) {
      if (newPassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long." })
      }
      user.password = await bcrypt.hash(newPassword, 10)
    }

    await user.save()

    res.json({
      message: "Credentials updated successfully.",
      user: { id: user._id, username: user.username }
    })
  } catch (error) {
    res.status(500).json({ message: "Failed to update credentials.", error: error.message })
  }
})

export default router
