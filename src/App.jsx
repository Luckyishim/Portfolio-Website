
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NotFound } from "./pages/NotFound"
import { HomePage } from "./pages/home.jsx"
import { Toaster } from "react-hot-toast"

function App() {


  return (
    <>
      <Toaster position="bottom-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
