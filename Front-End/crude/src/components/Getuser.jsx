import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {FaEdit, FaTrash, FaUserPlus} from 'react-icons/fa'
import './get.css'


function Getuser() {
    const [users, setUsers] = useState([])
    useEffect(()=>{
        const fetchdata = async()=>{
            try {
                const response = await axios.get("http://localhost:3001/api/users")
                setUsers(response.data)
            } catch (error) {
                console.log(error.message)
            }
        };
        fetchdata()
    },[])
  return (
    <div>
        <div className="table">
            <Link to={'/add'}><button className='btn btn-primary'>AddUser<FaUserPlus /></button></Link>
            <table className='tb table-bordered'>
                <thead>
                    <th scope='col'>S/N</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Email</th>
                     <th scope='col'>Address</th>
                     <th scope='col'>Password</th>
                     <th scope='col'>Role</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Wallet</th>
                    <th scope='col'>Actions</th>
                </thead>
                <tbody>
                    {
                        users.map((user, index)=>{
                         return  <tr>
                                <td>{index+1}</td>
                                 <td>{user.name}</td>
                                  <td>{user.email}</td>
                                   <td>{user.address}</td>
                                    <td>{user.password}</td>
                                     <td>{user.role}</td>
                                    <td>{user.status}</td>
                                     <td>{user.wallet}</td>
                                     <td>
                                        <div className="actions">
                                        <button className='btn btn-success' ><Link to={'/update'} id='edit'>< FaEdit id='icon'/></Link></button>
                                        <button className='btn btn-danger'><FaTrash /></button>
                                        </div>
                
                                     </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Getuser