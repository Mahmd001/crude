import { createContext, useState } from "react";


export const Appcontext = createContext()

export const AppcontextProvider = (props)=>{
    const BackEnduri = import.meta.env.VITE_BACKEND_URI
    const [loggedin, setLoggedin] = useState(false)
    const [userdata, setUserdata] = useState(false) 
    
    const value = {
        BackEnduri
    }
    return( 
        <Appcontext.Provider value={value} >
            {props.children}
        </Appcontext.Provider>
    )
}


