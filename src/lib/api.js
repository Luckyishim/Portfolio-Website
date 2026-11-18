const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export const getAuthToken = () => {
  return localStorage.getItem("portfolio_admin_token")
}

export const setAuthToken = (token) => {
  localStorage.setItem("portfolio_admin_token", token)
}

export const removeAuthToken = () => {
  localStorage.removeItem("portfolio_admin_token")
}

export const isAuthenticated = () => {
  return Boolean(getAuthToken())
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const token = getAuthToken()

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  }

  const response = await fetch(url, {
    ...options,
    headers
  })

  const contentType = response.headers.get("content-type")
  let data = null
  if (contentType && contentType.includes("application/json")) {
    data = await response.json()
  } else {
    data = await response.text()
  }

  if (!response.ok) {
    const errorMessage = (data && data.message) || response.statusText || "Request failed"
    const error = new Error(errorMessage)
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

export const api = {
  // Health
  checkHealth: () => request("/health"),

  // Auth
  getAuthStatus: () => request("/auth/status"),
  initAdmin: (data = {}) => request("/auth/init", {
    method: "POST",
    body: JSON.stringify(data)
  }),
  login: (username, password) => request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password })
  }),
  getMe: () => request("/auth/me"),
  updateCredentials: (data) => request("/auth/update-credentials", {
    method: "PUT",
    body: JSON.stringify(data)
  }),

  // Portfolio Bundle
  getPortfolioBundle: () => request("/portfolio"),

  // Profile
  getProfile: () => request("/profile"),
  updateProfile: (data) => request("/profile", {
    method: "PUT",
    body: JSON.stringify(data)
  }),

  // Projects
  getProjects: () => request("/projects"),
  createProject: (data) => request("/projects", {
    method: "POST",
    body: JSON.stringify(data)
  }),
  updateProject: (id, data) => request(`/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  }),
  deleteProject: (id) => request(`/projects/${id}`, {
    method: "DELETE"
  }),

  // Skills
  getSkills: () => request("/skills"),
  createSkill: (data) => request("/skills", {
    method: "POST",
    body: JSON.stringify(data)
  }),
  updateSkill: (id, data) => request(`/skills/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  }),
  deleteSkill: (id) => request(`/skills/${id}`, {
    method: "DELETE"
  }),

  // Design Projects
  getDesigns: () => request("/designs"),
  createDesign: (data) => request("/designs", {
    method: "POST",
    body: JSON.stringify(data)
  }),
  updateDesign: (id, data) => request(`/designs/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  }),
  deleteDesign: (id) => request(`/designs/${id}`, {
    method: "DELETE"
  }),

  // Messages
  sendMessage: (data) => request("/messages", {
    method: "POST",
    body: JSON.stringify(data)
  }),
  getMessages: () => request("/messages"),
  deleteMessage: (id) => request(`/messages/${id}`, {
    method: "DELETE"
  })
}
