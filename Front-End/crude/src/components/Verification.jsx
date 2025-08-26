import React, { useContext } from 'react'
import './verification.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { Appcontext } from '../context/Appcontext'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Verification() {

const {BackEnduri, getUserData, userData} = useContext(Appcontext)
const navigate = useNavigate()


const otpcode = {
  otp: ''
}


const handleInput = (e)=>{
  const {name, value} = e.target;
  console.log(name, value)
  setOtp({...otp, [name]:value})
}

const [otp, setOtp] = useState(otpcode)

const Sendotp= async(e)=>{
  e.preventDefault()
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.post(BackEnduri + '/api/auth/sendotp')
    console.log(response)
    getUserData()
    if(userData.isAccountVerify){
      navigate('/')
    }
      Swal.fire({
        title: 'Email Verification',
        text: response.data.Message,
        icon: 'success'
   });
 
  } catch (error) {
    console.log(error.message)
       Swal.fire({
        title: 'Email Verification',
        text: error.response?.data?.Message,
        icon: 'error'
   });
  }
}

const verifyotp = async(e)=>{
  e.preventDefault()
  try {
    axios.defaults.withCredentials = true
    const response = await axios.post(BackEnduri + '/api/auth/verifyotp',{otp:otp.otp})
      console.log(response)
      Swal.fire({
        title: 'Email Verification',
        text: response.data.Message,
        icon: 'success'
   });
     navigate('/login')
  } catch (error) {
      console.log(error.message)
       Swal.fire({
        title: 'Email Verification',
        text: error.response?.data?.Message,
        icon: 'error'
   });
  }
}




  return (
    <div id='con-otp'>
      <form onSubmit={verifyotp}>
         <div className="otp-token">
            <h2>Verify our Account</h2>
            <p>Enter 6 digit otp to verify our account </p>
            <div className="input-token">
                 <input type="text" 
                 maxLength={6}
                 name='otp'
                 value={otp.otp}
                 onChange={handleInput}
                  placeholder='Enter 6 digit code'
            />  
            <span onClick={Sendotp}>sendotp</span>
            </div>
           <button className='btn btn-success '>Verify</button>
        </div>
      </form>
    </div>
  )
}

export default Verification