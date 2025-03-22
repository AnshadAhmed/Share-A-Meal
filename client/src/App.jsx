
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Userprofile from './pages/Userprofile'
import Edituserprofile from './pages/Edituserprofile'
import Forgotpassword from './pages/Forgotpassword'
import Resetpassword from './pages/Resetpassword'
import Addmeal from './pages/Addmeal'
import Viewmeal from './pages/Viewmeal'
import Mymealupload from './pages/Mymealupload'
import Cart from './pages/Cart'
import AdminDashboard from './pages/AdminDashboard'


function App() {

  return (
    <>

    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path='/forgotpassword' element={<Forgotpassword/>}></Route>
      <Route path='/resetpassword/:token' element={<Resetpassword/>}></Route>
      <Route path="/userprofile" element={<Userprofile/>}></Route>
      <Route path="/edituserprofile" element={<Edituserprofile/>}></Route>
      <Route path='/addmeal' element={<Addmeal/>}></Route>
      <Route path='/viewmeal' element={<Viewmeal/>}></Route>
      <Route path='/viewcart' element={<Cart/>}></Route>
      <Route path='/mymeal' element={<Mymealupload/>}></Route>

      <Route path='/admin-dashboard' element={<AdminDashboard/>}></Route>


    </Routes>
    
    </>
  )
}

export default App
