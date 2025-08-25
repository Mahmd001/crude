import React, { useContext } from 'react'
import './dash.css'
import mylogo from '../assets/amad-logo.jpg'
import { Appcontext } from '../context/Appcontext'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'



function Dashboard() {

  const {BackEnduri} = useContext(Appcontext)
  const navigate = useNavigate()

  const logout = async(e)=>{
    e.preventDefault()
    axios.defaults.withCredentials = true

    try {
      const response = await axios.post(BackEnduri + '/api/auth/logout')
      console.log(response)
      Swal.fire({
        title: 'Logout',
        text: response.data.Message,
        icon: 'success'
      })
      navigate('/login')
    } catch (error) {
      console.log(error.message)
       Swal.fire({
        title: 'Logout',
        text: error.response?.data?.Message,
        icon: 'error'
      })
    }
  }
  

  return (
    <div>
        <header>
          <img src={mylogo} alt="Amad-logo" />
            <ul>
                <li>Profile</li>
                <li>About</li>
                <li>Home</li>
            </ul>
            <button onClick={logout}>logout</button>
        </header>
    </div>
  )
}

export default Dashboard