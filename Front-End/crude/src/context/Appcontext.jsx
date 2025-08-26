import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";


export const Appcontext = createContext()

export const AppcontextProvider = (props)=>{
    const BackEnduri = import.meta.env.VITE_BACKEND_URI
    const [loggedin, setLoggedin] = useState(false)
    const [userData, setUserData] = useState(null) 
    
    const getUserData = async()=>{ 
        axios.defaults.withCredentials = true
     
        try {
            const response = await axios.get(BackEnduri + '/api/user/data')
            if(response.data?.userData){
                setUserData(response.data.userData)
            }else{
                Swal.fire({
                    title: 'User',
                    text:  error.response?.data?.Message,
                    icon: 'error'
                })
            }
        } catch (error) {
             Swal.fire({
                    title: 'User',
                    text:  error.response?.data?.Message,
                    icon: 'error'
                })
        }
    }

    const  getAuthState = async ()=>{
        try {
            const response = await axios.get(BackEnduri + '/api/auth/is-auth')
            if(response.data?.auth){
                setLoggedin(true)
                getUserData()
            }
        } catch (error) {
              Swal.fire({
                    title: 'User',
                    text:  error.response?.data?.Message,
                    icon: 'error'
                })
        }

    }
    useEffect(()=>{
        getAuthState()
    },[])
    
    const value = {
        BackEnduri,
        userData, setUserData,
        getUserData
    }
    return( 
        <Appcontext.Provider value={value} >
            {props.children}
        </Appcontext.Provider>
    )
}


