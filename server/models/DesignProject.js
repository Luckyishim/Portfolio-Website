import mongoose from "mongoose"

const designProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  description: { type: String, required: true },
  prototypeUrl: { type: String, default: "" },
  designFileUrl: { type: String, default: "" },
  order: { type: Number, default: 0 }
}, { timestamps: true })

export const DesignProject = mongoose.model("DesignProject", designProjectSchema)
