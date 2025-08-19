import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import './update.css'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate,useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

function Updateuser() {
const users = {
  name: "",
  email: "",
  password: "",
  address: "",
};
const[user, setUser] = useState(users)
const navigate = useNavigate();
const {id} = useParams();

const handledinput = (e)=>{
  const {name, value} = e.target
  console.log(name, value)
  setUser({...user, [name]: value})
};

useEffect(()=>{
    const GetuserById = async()=>{
        try {
            const response = await axios.get(`http://localhost:3001/api/user/${id}`)
            setUser(response.data)
        } catch (error) {
            console.log(error.message)
        }
    };
    GetuserById();
},[id])

const handledsubmit = async(e)=>{
  e.preventDefault();
  try {
    const response =  await axios.put(`http://localhost:3001/api/update/${id}`,user)
    // toast.success(response.data.message,{position:"top-right"})
    Swal.fire({
      title: "Registration",
      text: response.data.message,
      icon: 'success'
    })
    navigate('/')
  } catch (error) {
    console.log(error)
    // toast.error(error?.data?.message,{position:"top-right"})
    Swal.fire({
      title: "Failed",
      text: "failed to update user",
      icon: "error"
    })
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
            value={user.name}
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
            value={user.email}
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
            value={user.password}
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
            value={user.address}
            onChange={handledinput}
            name='address'
            placeholder='Enter your address' 
            className='form-control'
            autoComplete='off'
            />
          </div>
          <button type ="submit"   className='btn btn-primary' id='btn'>Update</button>
        </form>
      </div>
    </div> 
  )
}
 
export default Updateuser