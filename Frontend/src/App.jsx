import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Login'
import Index from './Index'
import Cart from './Cart'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' Component={Index}/>
        <Route path='/login' Component={Login}/>
        <Route path='/cart' Component={Cart}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
