import React from 'react'
import Login from './components/login/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/signup/Signup'
import User from './components/users/User'
import Dashboard from './components/dashboard/Dashboard'
import CreateUser from './components/createuser/CreateUser'
import UpdateUser from './components/updateuser/UpdateUser'
import AccountUser from './components/account/AccountUser'
import Staff from './components/staff/Staff'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}> </Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/user' element={<User/>}></Route>
        <Route path='/create' element={<CreateUser/>}></Route>
        <Route path='/update/:id' element={<UpdateUser/>}></Route>
        <Route path='/account' element={<AccountUser/>}></Route>
        <Route path='/staff' element={<Staff/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
