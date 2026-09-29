
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NotFound } from "./pages/NotFound"
import { HomePage } from "./pages/Home.jsx"
import { DesignCaseStudy } from "./pages/DesignCaseStudy.jsx"
import { Toaster } from "react-hot-toast"

function App() {


  return (
    <>
      <Toaster position="bottom-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/design/syaphale-on-the-way" element={<DesignCaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
