import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: "/projects/Project2.png" },
  tags: { type: [String], default: [] },
  demoUrl: { type: String, default: "" },
  githubUrl: { type: String, default: "" },
  order: { type: Number, default: 0 }
}, { timestamps: true })

export const Project = mongoose.model("Project", projectSchema)
