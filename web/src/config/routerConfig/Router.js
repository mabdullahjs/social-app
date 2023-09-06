import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Login from '../../pages/Login'
// import ProtectedRoutes from './ProtectedRoutes'
// import Register from '../../pages/Signup'
import Home from '../../pages/Home'
// import Forms from '../../pages/Forms'


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/register' element={<Register />} />
        <Route path='/form' element={<Forms />} />
        <Route path='/home/*' element={<Home />} />
        <Route path='*' element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default Router