import React, { useEffect, useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Login'
import Index from './Index'
import Cart from './Cart'
import LargeScreenPage from './LargeScreenPage'
import AdminLogin from './Admin/AdminLogin'
import ForgetPWD from './Admin/ForgetPWD/ForgetPWD'
import ResetPassword from './Admin/ResetPassword/ResetPassword'
import AdminHome from './Admin/AdminHome/AdminHome'
const App = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); 
  return (
    <div>
      
     {
       isLargeScreen?<LargeScreenPage/>: <BrowserRouter>
      <Routes>
      <Route path='/' Component={Index}/>
        <Route path='/login' Component={Login}/>
        <Route path='/cart' Component={Cart}/>
        <Route path='/adminlogin' Component={AdminLogin}/>
        <Route path='/forgetpassword' Component={ForgetPWD}/>
        <Route path='/resetpassword' Component={ResetPassword}/>
        <Route path='/admin' Component={AdminHome}/>
      </Routes>
      </BrowserRouter>
     }
     
    </div>
  )
}

export default App
