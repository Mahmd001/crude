import React, { useRef, useState, useEffect} from 'react'
import mylogo from '../assets/amad-logo.jpg'
import './drop.css'

function Drop() {
    const [open, setOpen] = useState(false)

     const imgRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        imgRef.current &&
        listRef.current &&
        !imgRef.current.contains(e.target) &&
        !listRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [])
  return (
    <div>
        <div className="drop">
            <div className="img">
                <img 
                ref={imgRef}
                onClick={()=>setOpen(!open)}
                src={mylogo} alt=""
                />
                {open && (

                <div
               ref={listRef}  
                className="list"
                >
             <ul>
                <li onClick={()=>setOpen(false)}>Profile</li>
                <li onClick={()=>setOpen(false)}>Settings</li>
                <li onClick={()=>setOpen(false)}>Logout</li>
            </ul>
          </div>
                )}
            </div>
        

        
        </div>
    </div>
  )
}

export default Drop