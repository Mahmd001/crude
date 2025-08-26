import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './register.css'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { Appcontext } from '../context/Appcontext'


function Register() {

    const { BackEnduri, getUserData, userData} = useContext(Appcontext)
    const users = {
        name: '',
        email: '',
        password: '',
        address: '', 
        comfirm: ''
    }
    const [user, setUser] = useState(users)
    const navigate = useNavigate()
    
    const handleInput = (e)=>{
        const {name, value} = e.target;
        console.log(name, value)
        setUser({...user, [name]: value})

      
    }

    const handleForm = async(e)=>{
        e.preventDefault();

          if(user.password !== user.comfirm){
                Swal.fire({
                    title: 'Comfirm Password',
                    text: 'password miss match, please check your password',
                    icon: 'error'
                });
                return
            }

        axios.defaults.withCredentials = true
        try {
            const response = await axios.post(BackEnduri +'/api/auth', user)
            console.log(response)
            Swal.fire({
                    title: 'Registration',
                    text: response.data.Message,
                    icon: 'success'
                })
                setUser(users)
                navigate('/login')

        } catch (error) {
            console.log({Message: error.message})
              Swal.fire({
                    title: 'Registration',
                    text:  error.response?.data?.Message,
                    icon: 'error'
                })
        }
    }

  return (
    <div>
        <div className="register">
            <div className="rg-form">
                <div className="con-rg">
                    <h2>Register</h2>
                    <p>Welcome to Earn-Flow Register to Start your Earning Jorney</p>
                </div>
                <form onSubmit={handleForm}>
                    <div className="rg-input">
                        <label htmlFor="name">Name</label>
                        <input type="text"
                        placeholder='Enter name'
                        name='name'
                         value={user.name}
                        onChange={handleInput}
                        autoComplete='off'
                         className='form-control'
                        />
                    </div>
                    <div className="rg-input">
                        <label htmlFor="email">email</label>
                        <input type="text"
                        placeholder='Enter email'
                        name='email'
                         value={user.email}
                        onChange={handleInput}
                        autoComplete='off'
                         className='form-control'
                        />
                    </div>
                    <div className="rg-input">
                        <label htmlFor="password">password</label>
                        <input type="password"
                        placeholder='Enter password'
                        name='password'
                         value={user.password}
                        onChange={handleInput}
                        autoComplete='off'
                         className='form-control'
                        />
                    </div>
                    <div className="rg-input">
                        <label htmlFor="password">comfirm-password</label>
                        <input type="password"
                        placeholder='Enter  comfirm-password'
                        name='comfirm'
                         value={user.comfirm}
                        onChange={handleInput}
                        autoComplete='off'
                         className='form-control'
                        />
                    </div>
                    <div className="rg-input">
                        <label htmlFor="address">address</label>
                        <input type="text"
                        placeholder='Enter address'
                        name='address'
                         value={user.address}
                        onChange={handleInput}
                        autoComplete='off'
                        className='form-control'
                        />
                    </div>
                    <button className='btn btn-success'>Register</button>

                    <div className="links">
                        <p>already have an account?</p>
                        <Link to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register