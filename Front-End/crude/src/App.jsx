import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Adduser from './components/Adduser'
import Getuser from './components/Getuser'
import Updateuser from './components/Updateuser'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Verification from './components/Verification'
import Drop from './components/Drop'
// import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Router>
          {/* <Toaster position="top-right" /> */}
      <Routes>
        <Route path='/' element ={<Getuser />}></Route>
          <Route path='/update/:id' element ={<Updateuser />}></Route>
          <Route path='/add' element ={<Adduser />}></Route>
          <Route path='/login' element ={<Login />}></Route>
          <Route path='/register' element ={<Register/>}></Route>
          <Route path='/dash' element ={<Dashboard />}></Route>
          <Route path='/otp' element ={<Verification/>}></Route>
          <Route path='/drop' element ={<Drop/>}></Route>
      </Routes>
    </Router>
  )
}

export default App