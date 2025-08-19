import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {FaEdit, FaTrash, FaUserPlus} from 'react-icons/fa'
import './get.css'
import Swal from 'sweetalert2';


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
    },[]);

   const deletedUser = async(userid)=>{
    try {
      const response=  await axios.delete(`http://localhost:3001/api/delete/${userid}`)
        setUsers((prevUser)=>prevUser.filter((user)=>user._id !==userid))
        Swal.fire({
            title: "Delete",
            text: response.data.message,
            icon:'success'
        })
    } catch (error) {
        console.log(error)
          Swal.fire({
            title: "failed",
            text: "Failed to delete user",
            icon:'error'
        })
    }
   }
  return (
    <div>
        <div className="table">
            <Link to={'/add'}><button  type='button' className='btn btn-primary'>AddUser<FaUserPlus /></button></Link>
              {users.length == 0?(
                <div className="data">
                    <h3>No Data to display</h3>
                    <p>please add new user</p>
                </div>
              ):(
                 <table className='tb table-bordered'>
              
                <tr>
                    <th scope='col'>S/N</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Email</th>
                     <th scope='col'>Address</th>
                     <th scope='col'>Password</th>
                     <th scope='col'>Role</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Wallet</th>
                    <th scope='col'>Actions</th>
                </tr>
                <tbody>
                    {
                        users.map((user, index)=>{
                         return  <tr key={index}>
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
                                        <Link to={`/update/`+user._id} 
                                         type='button' 
                                          className='btn btn-success'
                                           ><FaEdit />
                                           </Link>
                                        <button 
                                        onClick={()=>deletedUser(user._id)} 
                                        type='button' 
                                        className='btn btn-danger'
                                        >
                                        <FaTrash />
                                        </button>
                                        </div>
                                     </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
              )}
           
        </div>
    </div>
  )
}

export default Getuser