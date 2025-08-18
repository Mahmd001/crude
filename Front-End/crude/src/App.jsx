import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Adduser from './components/Adduser'
import Getuser from './components/Getuser'
import Updateuser from './components/Updateuser'
// import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Router>
          {/* <Toaster position="top-right" /> */}
      <Routes>
        <Route path='/' element ={<Getuser />}></Route>
          <Route path='/update/:id' element ={<Updateuser />}></Route>
          <Route path='/add' element ={<Adduser />}></Route>
      </Routes>
    </Router>
  )
}

export default App