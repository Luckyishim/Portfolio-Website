
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NotFound } from "./pages/NotFound"
import { HomePage } from "./pages/home"
import { Toaster } from "./components/ui/toaster"

function App() {


  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App
