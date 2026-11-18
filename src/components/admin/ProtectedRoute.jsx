import { Navigate } from "react-router-dom"
import { isAuthenticated } from "../../lib/api"

export const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
