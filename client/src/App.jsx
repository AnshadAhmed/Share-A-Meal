
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Userprofile from './pages/Userprofile'


function App() {

  return (
    <>
    <Routes>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/userprofile" element={<Userprofile/>}></Route>
    </Routes>
    </>
  )
}

export default App
