import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { api } from "../lib/api"
import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialDesigns
} from "../data/initialData"

const PortfolioContext = createContext(null)

export const PortfolioProvider = ({ children }) => {
  const [profile, setProfile] = useState(initialProfile)
  const [projects, setProjects] = useState(initialProjects)
  const [skills, setSkills] = useState(initialSkills)
  const [designs, setDesigns] = useState(initialDesigns)
  const [isLoading, setIsLoading] = useState(true)
  const [isBackendConnected, setIsBackendConnected] = useState(false)

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await api.getPortfolioBundle()

      if (data) {
        if (data.profile && Object.keys(data.profile).length > 0) {
          setProfile((prev) => ({ ...prev, ...data.profile }))
        }
        if (Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects)
        }
        if (Array.isArray(data.skills) && data.skills.length > 0) {
          setSkills(data.skills)
        }
        if (Array.isArray(data.designs) && data.designs.length > 0) {
          setDesigns(data.designs)
        }
        setIsBackendConnected(true)
      }
    } catch (err) {
      // Backend not running or offline; gracefully keep fallback data
      console.info("Using local portfolio data (Backend offline or connecting):", err.message)
      setIsBackendConnected(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        setProfile,
        projects,
        setProjects,
        skills,
        setSkills,
        designs,
        setDesigns,
        isLoading,
        isBackendConnected,
        refreshData: loadData
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider")
  }
  return context
}
