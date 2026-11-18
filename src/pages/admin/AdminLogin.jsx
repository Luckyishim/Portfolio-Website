import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { api, setAuthToken } from "../../lib/api"
import { Lock, User, ArrowLeft, ShieldCheck } from "lucide-react"
import toast from "react-hot-toast"

export const AdminLogin = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    setIsLoading(true)

    try {
      const data = await api.login(username, password)
      setAuthToken(data.token)
      toast.success("Welcome back, Admin!")
      navigate("/admin")
    } catch (err) {
      const message = err.message || "Invalid credentials. Please check your backend connection and login details."
      setErrorMessage(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center px-4 relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="p-3 bg-primary/10 rounded-2xl mb-4 text-primary">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-2xl font-bold">Admin Portal</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to manage your portfolio content & projects
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm text-left">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-left">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-left">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="cosmic-button w-full py-3 flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? "Signing in..." : "Sign In to Dashboard"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground">
            Default credentials: <span className="font-mono text-primary">admin</span> / <span className="font-mono text-primary">admin123</span>
          </div>
        </div>
      </div>
    </div>
  )
}
