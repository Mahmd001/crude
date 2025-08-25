import React, { useContext } from 'react'
import './verification.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { Appcontext } from '../context/Appcontext'
import Swal from 'sweetalert2'

function Verification() {

const {BackEnduri} = useContext(Appcontext)

const Sendotp= async(e)=>{
  e.preventDefault()
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.post(BackEnduri + '/api/auth/sendotp')
    console.log(response)
      Swal.fire({
        title: 'Email Verification',
        text: response.data.Message,
        icon: 'success'
   });
  } catch (error) {
    cons
  }
}


  return (
    <div id='con-otp'>
      <form>
         <div className="otp-token">
            <h2>Verify our Account</h2>
            <p>Enter 6 digit otp to verify our account </p>
            <div className="input-token">
                 <input type="text" 
                  placeholder='Enter 6 digit code'
            />  
            <span>sendotp</span>
            </div>
           <button className='btn btn-success '>Verify</button>
        </div>
      </form>
    </div>
  )
}

export default Verification