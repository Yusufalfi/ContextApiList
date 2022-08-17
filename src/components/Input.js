import React from 'react'

const Input = ({placeholder, type, value, change}) => {
  return (
  
        <input
            style={input}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={change}
        />
   
  )
}

export default Input

const input = {
    marginTop: "12px",
    width: "70%",
    height: "30px",
    border: "none",
    borderBottom: "1px solid #57ae4f ",
    marginBottom : "1rem",
    marginLeft : "3rem",
}