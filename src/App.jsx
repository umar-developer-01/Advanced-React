import { Routes, Route } from "react-router-dom"
import Home from "./home"
import Patterns from "./patterns"


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/patterns" element={ <Patterns/> } />
      </Routes>
      
    </>
  )
}

export default App
