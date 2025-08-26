import React, { useContext } from 'react'
import './dash.css'
import mylogo from '../assets/amad-logo.jpg'
import { Appcontext } from '../context/Appcontext'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'



function Dashboard() {

  const {BackEnduri, userData, setUserData, setIsLogin} = useContext(Appcontext)
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
    <div id='amad'>
        <header>
          <img src={mylogo} alt="Amad-logo" />
            {userData ?
            <div className='profile'>{userData.name[0].toUpperCase()}
             <div className="div">
              <ul>
                <li>profile</li>
                <li onClick={logout}>logout</li>
              </ul>
             </div>
            </div>
           
            :<button onClick={logout}>logout</button>
          }
        </header>
        <div className="side-bar">
          <ul>
          <h2>Live-Stock Farm</h2>
          <p>Live-Stock Management System</p>
            <li><a href=""></a>Available-Product</li>
            <li><a href=""></a>Animal Management</li>
            <li><a href=""></a>Finance & Transactions</li>
            <li><a href=""></a>Breeding & Production Tracking</li>
            <li><a href=""></a>Report & Analytics</li>
            <li><a href=""></a>Feeding & Nutrition</li>
            <li><a href=""></a>Health & Medical Records</li>
            <li><a href=""></a>Total-Rams/Sheeps</li>
            <li><a href=""></a>Total-Goats</li>
            <li><a href=""></a>Total-Cows</li>
            {/* <li><a href=""></a>Total-LiveStocks</li> */}
            {/* <li><a href=""></a>Transactions</li> */}
          </ul>
        </div>

        <div className="cards">
        <div className="card">
          <h2>Total 
            <p>Livestock</p>
          </h2>
        </div>
        <div className="card">
           <h2>Total
            <p>Births</p>
          </h2>
        </div>
        <div className="card">
           <h2>Total
            <p>Deaths</p>
          </h2>
        </div>
        <div className="card">
           <h2>Total
            <p>Sales</p>
          </h2>
        </div>
        </div>
    </div>
  )
}

export default Dashboard