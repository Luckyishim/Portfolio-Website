import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { api, removeAuthToken } from "../../lib/api"
import { usePortfolio } from "../../context/PortfolioContext"
import toast from "react-hot-toast"
import {
  LayoutDashboard,
  User,
  Briefcase,
  Wrench,
  Palette,
  Mail,
  Shield,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  X
} from "lucide-react"

export const AdminDashboard = () => {
  const navigate = useNavigate()
  const { refreshData } = usePortfolio()

  // State
  const [activeTab, setActiveTab] = useState("profile")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dbStatus, setDbStatus] = useState("checking")

  // Portfolio Entities
  const [profile, setProfile] = useState({
    name: "",
    role: "",
    tagline: "",
    bioParagraph1: "",
    bioParagraph2: "",
    email: "",
    phone: "",
    location: "",
    githubUrl: "",
    linkedinUrl: "",
    instagramUrl: "",
    developerCvUrl: "",
    uiuxCvUrl: ""
  })
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [designs, setDesigns] = useState([])
  const [messages, setMessages] = useState([])

  // Modal / Form States for Projects
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    image: "/projects/Project2.png",
    tags: "",
    demoUrl: "",
    githubUrl: "",
    order: 0
  })

  // Form State for Skills
  const [skillForm, setSkillForm] = useState({
    name: "",
    category: "frameworks",
    order: 0
  })

  // Modal / Form States for Designs
  const [designModalOpen, setDesignModalOpen] = useState(false)
  const [editingDesign, setEditingDesign] = useState(null)
  const [designForm, setDesignForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    prototypeUrl: "",
    designFileUrl: "",
    order: 0
  })

  // Form State for Account Security
  const [securityForm, setSecurityForm] = useState({
    currentUsername: "",
    newUsername: "",
    currentPassword: "",
    newPassword: ""
  })

  // Fetch initial data
  const loadAllData = async () => {
    setLoading(true)
    try {
      // 1. Health check
      try {
        const health = await api.checkHealth()
        setDbStatus(health.database === "connected" ? "connected" : "db-disconnected")
      } catch {
        setDbStatus("server-offline")
      }

      // 2. Load Portfolio Bundle
      const bundle = await api.getPortfolioBundle()
      if (bundle) {
        if (bundle.profile) setProfile((prev) => ({ ...prev, ...bundle.profile }))
        if (bundle.projects) setProjects(bundle.projects)
        if (bundle.skills) setSkills(bundle.skills)
        if (bundle.designs) setDesigns(bundle.designs)
      }

      // 3. Load Messages
      try {
        const msgs = await api.getMessages()
        setMessages(msgs || [])
      } catch (err) {
        console.warn("Could not load messages:", err.message)
      }
    } catch (err) {
      toast.error("Failed to fetch data from backend. Check if your server is running.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAllData()
  }, [])

  const handleLogout = () => {
    removeAuthToken()
    toast.success("Logged out successfully.")
    navigate("/admin/login")
  }

  // ==========================================
  // PROFILE HANDLERS
  // ==========================================
  const handleProfileSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.updateProfile(profile)
      await refreshData()
      toast.success("Profile updated successfully!")
    } catch (err) {
      toast.error(err.message || "Failed to update profile.")
    } finally {
      setSaving(false)
    }
  }

  // ==========================================
  // PROJECTS HANDLERS
  // ==========================================
  const openNewProjectModal = () => {
    setEditingProject(null)
    setProjectForm({
      title: "",
      description: "",
      image: "/projects/Project2.png",
      tags: "",
      demoUrl: "",
      githubUrl: "",
      order: projects.length + 1
    })
    setProjectModalOpen(true)
  }

  const openEditProjectModal = (project) => {
    setEditingProject(project)
    setProjectForm({
      title: project.title,
      description: project.description,
      image: project.image || "/projects/Project2.png",
      tags: Array.isArray(project.tags) ? project.tags.join(", ") : project.tags || "",
      demoUrl: project.demoUrl || "",
      githubUrl: project.githubUrl || "",
      order: project.order || 0
    })
    setProjectModalOpen(true)
  }

  const handleSaveProject = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...projectForm,
        tags: projectForm.tags ? projectForm.tags.split(",").map((t) => t.trim()).filter(Boolean) : []
      }

      if (editingProject) {
        const id = editingProject._id || editingProject.id
        await api.updateProject(id, payload)
        toast.success("Project updated successfully!")
      } else {
        await api.createProject(payload)
        toast.success("New project created!")
      }

      setProjectModalOpen(false)
      await loadAllData()
      await refreshData()
    } catch (err) {
      toast.error(err.message || "Failed to save project.")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return
    try {
      await api.deleteProject(id)
      toast.success("Project deleted.")
      await loadAllData()
      await refreshData()
    } catch (err) {
      toast.error(err.message || "Failed to delete project.")
    }
  }

  // ==========================================
  // SKILLS HANDLERS
  // ==========================================
  const handleAddSkill = async (e) => {
    e.preventDefault()
    if (!skillForm.name.trim()) return
    setSaving(true)
    try {
      await api.createSkill(skillForm)
      toast.success(`Skill "${skillForm.name}" added!`)
      setSkillForm({ name: "", category: skillForm.category, order: 0 })
      await loadAllData()
      await refreshData()
    } catch (err) {
      toast.error(err.message || "Failed to add skill.")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteSkill = async (id, name) => {
    try {
      await api.deleteSkill(id)
      toast.success(`Skill "${name}" removed.`)
      await loadAllData()
      await refreshData()
    } catch (err) {
      toast.error(err.message || "Failed to delete skill.")
    }
  }

  // ==========================================
  // DESIGN HANDLERS
  // ==========================================
  const openNewDesignModal = () => {
    setEditingDesign(null)
    setDesignForm({
      title: "",
      subtitle: "",
      description: "",
      prototypeUrl: "",
      designFileUrl: "",
      order: designs.length + 1
    })
    setDesignModalOpen(true)
  }

  const openEditDesignModal = (design) => {
    setEditingDesign(design)
    setDesignForm({
      title: design.title,
      subtitle: design.subtitle || "",
      description: design.description,
      prototypeUrl: design.prototypeUrl || "",
      designFileUrl: design.designFileUrl || "",
      order: design.order || 0
    })
    setDesignModalOpen(true)
  }

  const handleSaveDesign = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editingDesign) {
        const id = editingDesign._id || editingDesign.id
        await api.updateDesign(id, designForm)
        toast.success("Design work updated!")
      } else {
        await api.createDesign(designForm)
        toast.success("New design project added!")
      }

      setDesignModalOpen(false)
      await loadAllData()
      await refreshData()
    } catch (err) {
      toast.error(err.message || "Failed to save design project.")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteDesign = async (id) => {
    if (!window.confirm("Are you sure you want to delete this design item?")) return
    try {
      await api.deleteDesign(id)
      toast.success("Design work deleted.")
      await loadAllData()
      await refreshData()
    } catch (err) {
      toast.error(err.message || "Failed to delete design item.")
    }
  }

  // ==========================================
  // MESSAGES HANDLERS
  // ==========================================
  const handleDeleteMessage = async (id) => {
    try {
      await api.deleteMessage(id)
      setMessages((prev) => prev.filter((m) => m._id !== id))
      toast.success("Message removed.")
    } catch (err) {
      toast.error(err.message || "Failed to delete message.")
    }
  }

  // ==========================================
  // SECURITY HANDLERS
  // ==========================================
  const handleUpdateSecurity = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.updateCredentials({
        newUsername: securityForm.newUsername || undefined,
        currentPassword: securityForm.currentPassword || undefined,
        newPassword: securityForm.newPassword || undefined
      })
      toast.success("Security credentials updated successfully!")
      setSecurityForm({
        currentUsername: "",
        newUsername: "",
        currentPassword: "",
        newPassword: ""
      })
    } catch (err) {
      toast.error(err.message || "Failed to update credentials.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-xl">
            <LayoutDashboard size={22} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Portfolio Admin CMS</h1>
            <p className="text-xs text-muted-foreground">Manage live portfolio content</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Database connection badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-secondary/30">
            {dbStatus === "connected" && (
              <>
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span className="text-emerald-500">MongoDB Connected</span>
              </>
            )}
            {dbStatus === "db-disconnected" && (
              <>
                <AlertCircle size={14} className="text-amber-500" />
                <span className="text-amber-500">DB Disconnected (Check URI)</span>
              </>
            )}
            {dbStatus === "server-offline" && (
              <>
                <AlertCircle size={14} className="text-destructive" />
                <span className="text-destructive">Backend Offline (Port 5000)</span>
              </>
            )}
            {dbStatus === "checking" && (
              <>
                <RefreshCw size={14} className="animate-spin text-muted-foreground" />
                <span className="text-muted-foreground">Checking status...</span>
              </>
            )}
          </div>

          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border hover:border-primary text-foreground transition-colors"
          >
            <ExternalLink size={14} /> View Live Site
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors cursor-pointer"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 border-r border-border bg-card/30 p-4 shrink-0">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "profile" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              <User size={18} /> Profile & About
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "projects" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              <Briefcase size={18} /> Projects ({projects.length})
            </button>

            <button
              onClick={() => setActiveTab("skills")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "skills" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              <Wrench size={18} /> Skills ({skills.length})
            </button>

            <button
              onClick={() => setActiveTab("designs")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "designs" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              <Palette size={18} /> Design Work ({designs.length})
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "messages" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail size={18} /> Messages
              </div>
              {messages.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs bg-primary/20 text-foreground">
                  {messages.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "security" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              <Shield size={18} /> Admin Security
            </button>
          </nav>
        </aside>

        {/* Tab Body */}
        <main className="flex-1 p-6 md:p-8 max-w-5xl">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <RefreshCw size={32} className="animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* ========================================== */}
              {/* TAB 1: PROFILE & ABOUT                     */}
              {/* ========================================== */}
              {activeTab === "profile" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold">Profile & About Settings</h2>
                    <p className="text-sm text-muted-foreground">
                      Edit your headline, introductory bio, contact channels, and CV files.
                    </p>
                  </div>

                  <form onSubmit={handleProfileSave} className="space-y-6">
                    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                      <h3 className="font-semibold text-base border-b border-border pb-3">Hero Headline</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">Your Full Name</label>
                          <input
                            type="text"
                            value={profile.name || ""}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">Professional Title</label>
                          <input
                            type="text"
                            value={profile.role || ""}
                            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Hero Tagline / Intro</label>
                        <textarea
                          rows={2}
                          value={profile.tagline || ""}
                          onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                      <h3 className="font-semibold text-base border-b border-border pb-3">About Me Details</h3>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Bio Paragraph 1</label>
                        <textarea
                          rows={3}
                          value={profile.bioParagraph1 || ""}
                          onChange={(e) => setProfile({ ...profile, bioParagraph1: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Bio Paragraph 2</label>
                        <textarea
                          rows={3}
                          value={profile.bioParagraph2 || ""}
                          onChange={(e) => setProfile({ ...profile, bioParagraph2: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">Developer CV Path / Link</label>
                          <input
                            type="text"
                            value={profile.developerCvUrl || ""}
                            onChange={(e) => setProfile({ ...profile, developerCvUrl: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">UI/UX CV Path / Link</label>
                          <input
                            type="text"
                            value={profile.uiuxCvUrl || ""}
                            onChange={(e) => setProfile({ ...profile, uiuxCvUrl: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                      <h3 className="font-semibold text-base border-b border-border pb-3">Contact & Social Links</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">Email Address</label>
                          <input
                            type="email"
                            value={profile.email || ""}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">Phone Number</label>
                          <input
                            type="text"
                            value={profile.phone || ""}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">Location</label>
                          <input
                            type="text"
                            value={profile.location || ""}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">GitHub URL</label>
                          <input
                            type="url"
                            value={profile.githubUrl || ""}
                            onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">LinkedIn URL</label>
                          <input
                            type="url"
                            value={profile.linkedinUrl || ""}
                            onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">Instagram URL</label>
                          <input
                            type="url"
                            value={profile.instagramUrl || ""}
                            onChange={(e) => setProfile({ ...profile, instagramUrl: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={saving}
                      className="cosmic-button px-6 py-2.5 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Save size={18} /> {saving ? "Saving Changes..." : "Save Profile"}
                    </button>
                  </form>
                </div>
              )}

              {/* ========================================== */}
              {/* TAB 2: PROJECTS                            */}
              {/* ========================================== */}
              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">Featured Projects</h2>
                      <p className="text-sm text-muted-foreground">
                        Add, modify, or remove projects shown on your portfolio.
                      </p>
                    </div>

                    <button
                      onClick={openNewProjectModal}
                      className="cosmic-button px-4 py-2 text-sm flex items-center gap-2 cursor-pointer"
                    >
                      <Plus size={16} /> Add Project
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                      <div
                        key={project._id || project.id}
                        className="bg-card border border-border rounded-2xl p-5 flex flex-col justify-between shadow-xs"
                      >
                        <div>
                          <div className="aspect-[16/10] overflow-hidden rounded-xl border border-border mb-4 bg-secondary/30">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {(Array.isArray(project.tags) ? project.tags : []).map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          <h3 className="font-bold text-lg">{project.title}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-3 mt-1 mb-4">
                            {project.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                          <div className="flex gap-2">
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-primary hover:underline flex items-center gap-1"
                              >
                                <ExternalLink size={12} /> Demo
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                              >
                                GitHub
                              </a>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditProjectModal(project)}
                              className="p-1.5 rounded-lg border border-border hover:bg-secondary/50 text-foreground cursor-pointer"
                              title="Edit Project"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project._id || project.id)}
                              className="p-1.5 rounded-lg border border-destructive/20 text-destructive hover:bg-destructive/10 cursor-pointer"
                              title="Delete Project"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================== */}
              {/* TAB 3: SKILLS                              */}
              {/* ========================================== */}
              {activeTab === "skills" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold">Skills Management</h2>
                    <p className="text-sm text-muted-foreground">
                      Add new tech stacks or remove old skills categorized neatly.
                    </p>
                  </div>

                  {/* Add skill form */}
                  <form onSubmit={handleAddSkill} className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="font-semibold text-base mb-4">Add a New Skill</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Skill Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. TypeScript, GraphQL"
                          value={skillForm.name}
                          onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Category</label>
                        <select
                          value={skillForm.category}
                          onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl border border-input bg-card text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                        >
                          <option value="languages">Languages</option>
                          <option value="frameworks">Frameworks & Libraries</option>
                          <option value="database">Database</option>
                          <option value="tools">Tools & Practices</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={saving}
                        className="cosmic-button py-2 px-5 flex items-center justify-center gap-2 cursor-pointer text-sm"
                      >
                        <Plus size={16} /> Add Skill
                      </button>
                    </div>
                  </form>

                  {/* Skills by category */}
                  {["languages", "frameworks", "database", "tools", "other"].map((cat) => {
                    const groupSkills = skills.filter((s) => s.category === cat)
                    if (groupSkills.length === 0) return null

                    return (
                      <div key={cat} className="space-y-3">
                        <h4 className="text-sm font-semibold capitalize text-primary tracking-wide">
                          {cat === "frameworks" ? "Frameworks & Libraries" : cat} ({groupSkills.length})
                        </h4>
                        <div className="flex flex-wrap gap-2.5">
                          {groupSkills.map((s) => (
                            <span
                              key={s._id || s.name}
                              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-card border border-border"
                            >
                              {s.name}
                              <button
                                type="button"
                                onClick={() => handleDeleteSkill(s._id, s.name)}
                                className="text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                                title="Remove skill"
                              >
                                <X size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* ========================================== */}
              {/* TAB 4: DESIGN WORK                         */}
              {/* ========================================== */}
              {activeTab === "designs" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">Design Work & Case Studies</h2>
                      <p className="text-sm text-muted-foreground">
                        Manage your Figma prototypes, case studies, and UX design projects.
                      </p>
                    </div>

                    <button
                      onClick={openNewDesignModal}
                      className="cosmic-button px-4 py-2 text-sm flex items-center gap-2 cursor-pointer"
                    >
                      <Plus size={16} /> Add Design Work
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {designs.map((design) => (
                      <div
                        key={design._id || design.id}
                        className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-between shadow-xs"
                      >
                        <div>
                          <h3 className="font-bold text-lg mb-1">{design.title}</h3>
                          <p className="text-xs font-medium text-primary mb-3">{design.subtitle}</p>
                          <p className="text-sm text-muted-foreground mb-4">{design.description}</p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                          <div className="flex gap-2">
                            {design.prototypeUrl && (
                              <a
                                href={design.prototypeUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-primary hover:underline flex items-center gap-1"
                              >
                                <ExternalLink size={12} /> Prototype
                              </a>
                            )}
                            {design.designFileUrl && (
                              <a
                                href={design.designFileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                              >
                                File
                              </a>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditDesignModal(design)}
                              className="p-1.5 rounded-lg border border-border hover:bg-secondary/50 text-foreground cursor-pointer"
                              title="Edit"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteDesign(design._id || design.id)}
                              className="p-1.5 rounded-lg border border-destructive/20 text-destructive hover:bg-destructive/10 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================== */}
              {/* TAB 5: MESSAGES                            */}
              {/* ========================================== */}
              {activeTab === "messages" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold">Contact Messages ({messages.length})</h2>
                    <p className="text-sm text-muted-foreground">
                      Inquiries and notes sent through your website contact form.
                    </p>
                  </div>

                  {messages.length === 0 ? (
                    <div className="bg-card border border-border rounded-2xl p-12 text-center text-muted-foreground">
                      <Mail size={36} className="mx-auto mb-3 opacity-40" />
                      <p>No messages received yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg._id}
                          className="bg-card border border-border rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row justify-between gap-4"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-base">{msg.name}</span>
                              <a
                                href={`mailto:${msg.email}`}
                                className="text-xs text-primary hover:underline"
                              >
                                {msg.email}
                              </a>
                              <span className="text-xs text-muted-foreground">
                                {new Date(msg.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-foreground/90 whitespace-pre-line">
                              {msg.message}
                            </p>
                          </div>

                          <div className="shrink-0 self-start">
                            <button
                              onClick={() => handleDeleteMessage(msg._id)}
                              className="p-2 rounded-xl text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                              title="Delete Message"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ========================================== */}
              {/* TAB 6: SECURITY                            */}
              {/* ========================================== */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold">Admin Account & Credentials</h2>
                    <p className="text-sm text-muted-foreground">
                      Change your administrator username or password.
                    </p>
                  </div>

                  <form onSubmit={handleUpdateSecurity} className="bg-card border border-border rounded-2xl p-6 max-w-xl space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">
                        New Username (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Leave blank to keep unchanged"
                        value={securityForm.newUsername}
                        onChange={(e) => setSecurityForm({ ...securityForm, newUsername: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">
                        Current Password (required for password change)
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={securityForm.currentPassword}
                        onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">
                        New Password (minimum 6 characters)
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={securityForm.newPassword}
                        onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={saving}
                      className="cosmic-button px-5 py-2.5 text-sm flex items-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
                    >
                      <Save size={16} /> {saving ? "Updating..." : "Update Credentials"}
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* ========================================== */}
      {/* MODAL: PROJECT ADD / EDIT                  */}
      {/* ========================================== */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setProjectModalOpen(false)}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold mb-4">
              {editingProject ? "Edit Project" : "Add New Project"}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Expenses Tracker"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe key features, stack, and architecture..."
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Image Path / URL</label>
                <input
                  type="text"
                  placeholder="/projects/Project2.png"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="React.JS, Node.JS, MongoDB"
                  value={projectForm.tags}
                  onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={projectForm.demoUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, demoUrl: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">GitHub Repository URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-secondary/40 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="cosmic-button px-5 py-2 text-sm cursor-pointer disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL: DESIGN ADD / EDIT                   */}
      {/* ========================================== */}
      {designModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setDesignModalOpen(false)}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold mb-4">
              {editingDesign ? "Edit Design Work" : "Add Design Work"}
            </h3>

            <form onSubmit={handleSaveDesign} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Syaphale On The Way"
                  value={designForm.title}
                  onChange={(e) => setDesignForm({ ...designForm, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Subtitle</label>
                <input
                  type="text"
                  placeholder="e.g. UX design for a café concept"
                  value={designForm.subtitle}
                  onChange={(e) => setDesignForm({ ...designForm, subtitle: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your UX/UI process, wireframes, and design system..."
                  value={designForm.description}
                  onChange={(e) => setDesignForm({ ...designForm, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Figma Prototype Link</label>
                <input
                  type="url"
                  placeholder="https://www.figma.com/proto/..."
                  value={designForm.prototypeUrl}
                  onChange={(e) => setDesignForm({ ...designForm, prototypeUrl: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Figma Design File Link</label>
                <input
                  type="url"
                  placeholder="https://www.figma.com/design/..."
                  value={designForm.designFileUrl}
                  onChange={(e) => setDesignForm({ ...designForm, designFileUrl: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-input bg-secondary/30 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setDesignModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-secondary/40 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="cosmic-button px-5 py-2 text-sm cursor-pointer disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Design Work"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
