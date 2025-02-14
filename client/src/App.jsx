
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'


function App() {

  return (
    <>
    <Routes>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
    </Routes>
    </>
  )
}

export default App
