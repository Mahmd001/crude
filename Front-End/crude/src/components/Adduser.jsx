import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import '../App.css'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

function Adduser() {
const users = {
  name: "",
  email: "",
  password: "",
  address: "",
};
const[user, setUser] = useState(users)
const navigate = useNavigate();

const handledinput = (e)=>{
  const {name, value} = e.target
  console.log(name, value)
  setUser({...user, [name]: value})
};

const handledsubmit = async(e)=>{
  e.prevenDefaut();
  try {
    const response = await axios.post("http://localhost:3001/api/user",user)
    console.log("user created succesifull")
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}
 
  return (
    <div className='con'>
      <div className="form">
        <form onSubmit={handledsubmit}>
          <div className="con">
            <label htmlFor="name">Name</label>
            <input type="text"
            id='name'
            onChange={handledinput} 
            name='name'
            placeholder='Enter your name'
             className='form-control'
             autoComplete='off'
             />
          </div>
          <div className="con">
            <label htmlFor="Email">Email</label>
            <input type="text" 
            id='email'
              onChange={handledinput}
               name='email'
            placeholder='Enter your email' 
            className='form-control'
              autoComplete='off'
            
            />
          </div>
             <div className="con">
            <label htmlFor="password">Password</label>
            <input type="password" 
            id='password'
              onChange={handledinput}
              name='password'
            placeholder='Enter your password' 
            className='form-control'
              autoComplete='off'
            />
          </div>
            <div className="con">
            <label htmlFor="address">Address</label>
            <input type="text" 
            id='address'
              onChange={handledinput}
              name='address'
            placeholder='Enter your address' 
            className='form-control'
              autoComplete='off'
            />
          </div>
          <button type ="submit"   className='btn btn-primary' id='btn'>register</button>
        </form>
      </div>
    </div> 
  )
}
 
export default Adduser