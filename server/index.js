import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import authRoutes from "./routes/auth.routes.js"
import portfolioRoutes from "./routes/portfolio.routes.js"
import { runAutoSeed } from "./seed.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load server/.env first, then fallback
dotenv.config({ path: path.join(__dirname, ".env") })
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
let MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio"
if (MONGO_URI.endsWith("/")) {
  MONGO_URI += "portfolio?retryWrites=true&w=majority"
}

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())

// Health check endpoint
app.get("/api/health", (req, res) => {
  const isConnected = mongoose.connection.readyState === 1
  res.json({
    status: "ok",
    database: isConnected ? "connected" : "disconnected",
    timestamp: new Date().toISOString()
  })
})

// Routes
app.use("/api/auth", authRoutes)
app.use("/api", portfolioRoutes)

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "API route not found." })
})

// Start server listening
app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio backend running on: http://localhost:${PORT}`)
})

// Connect to MongoDB and auto-seed if needed
console.log("Connecting to MongoDB Atlas...")
mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 8000 })
  .then(async () => {
    console.log(" Connected to MongoDB successfully.")
    try {
      await runAutoSeed()
    } catch (seedErr) {
      console.warn("Auto-seed notice:", seedErr.message)
    }
  })
  .catch((err) => {
    console.warn("⚠️  MongoDB connection warning:", err.message)
    console.log("ℹ️  Server is running. Check your MONGO_URI in server/.env.")
  })
