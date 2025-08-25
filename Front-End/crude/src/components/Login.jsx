import React, { useContext, useState } from 'react'
import './login.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { Appcontext } from '../context/Appcontext'

function Login() {
    const users = {
        password: '',
        email: ''
    }
    const {BackEnduri} = useContext(Appcontext)
    const [user, setUser] = useState(users)
    const navigate = useNavigate()

    const handleInput = (e)=>{
        const {name, value} = e.target
         console.log(name, value)
        setUser({...user, [name]: value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
         axios.defaults.withCredentials = true
        try {
            const response = await axios.post(BackEnduri + '/api/auth/login',user)
             console.log(response)
                        Swal.fire({
                                title: 'Login',
                                text: response.data.Message,
                                icon: 'success'
                            })
                            setUser(users)
                            navigate('/dash')

        } catch (error) {
            Swal.fire({
                title: 'Login',
                text: error.response?.data?.Message,
                icon: 'error'
            })
            console.log(error.message)
        }
    }
  return (
    <div>
        <div className="login">
            <div className="lg-form">
                    <h2>Login</h2>
                
                <form onSubmit={handleSubmit}>
                     <div className="lg-input">
                        <label htmlFor="email">email</label>
                        <input type="text"
                        value={user.email}
                        name='email'
                        onChange={handleInput}
                        placeholder='Enter email'
                        autoComplete='off'
                        className='form-control'
                        />
                    </div>
                    <div className="lg-input">
                        <label htmlFor="password">password</label>
                        <input type="password"
                        name='password'
                        value={user.password}
                        onChange={handleInput}
                        placeholder='Enter password'
                        autoComplete='off'
                         className='form-control'
                        />
                    </div>
                <button className='btn btn-success'>Login</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login