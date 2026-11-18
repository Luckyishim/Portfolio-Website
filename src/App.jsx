import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NotFound } from "./pages/NotFound"
import { HomePage } from "./pages/Home.jsx"
import { DesignCaseStudy } from "./pages/DesignCaseStudy.jsx"
import { AdminLogin } from "./pages/admin/AdminLogin.jsx"
import { AdminDashboard } from "./pages/admin/AdminDashboard.jsx"
import { ProtectedRoute } from "./components/admin/ProtectedRoute.jsx"
import { PortfolioProvider } from "./context/PortfolioContext.jsx"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <PortfolioProvider>
      <Toaster position="bottom-right" />
      <BrowserRouter>
        <Routes>
          {/* Public Portfolio Routes (Shown to Recruiters & Visitors) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/design/syaphale-on-the-way" element={<DesignCaseStudy />} />

          {/* Private Admin & Editing Routes (Protected, Only for You) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  )
}

export default App
