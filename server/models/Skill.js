import mongoose from "mongoose"

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ["languages", "frameworks", "database", "tools", "other"],
    default: "languages"
  },
  order: { type: Number, default: 0 }
}, { timestamps: true })

export const Skill = mongoose.model("Skill", skillSchema)
