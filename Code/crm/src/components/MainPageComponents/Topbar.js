import React from 'react'
import './Components.css'


const Topbar = () => {
  return (
    <div className = 'topbar' >
        <h1 className = "header" style= {{fontWeight: 'Bold'}}>Chetohs</h1>
        <div className = 'iconright2'>
            <svg fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 28C22 28.5304 21.7893 29.0391 21.4142 29.4142C21.0391 29.7893 20.5304 30 20 30C19.4696 30 18.9609 29.7893 18.5858 29.4142C18.2107 29.0391 18 28.5304 18 28H22ZM20 10C20.2652 10 20.5196 10.1054 20.7071 10.2929C20.8946 10.4804 21 10.7348 21 11V12.08C23.84 12.56 26 15.03 26 18V24L29 27H11L14 24V18C14 15.03 16.16 12.56 19 12.08V11C19 10.7348 19.1054 10.4804 19.2929 10.2929C19.4804 10.1054 19.7348 10 20 10Z" fill="#979797"/>
            </svg>
        </div>
    </div>
  )
}


export default Topbar
