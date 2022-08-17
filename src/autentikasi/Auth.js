import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/auth'
import { Redirect } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import axios from 'axios'

const baseUrl = "https://my-udemy-api.herokuapp.com/api/v1"



const Auth = () => {
  const {isAuthencated, loginSuccess, loginFailed} = useContext(AuthContext)
//   console.log(AuthContext);
  
//   const history = useHistory()
  const [login, setLogin] = useState(true)
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState("")
  const [isError, setIsError] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  


  const isLogin = () => 
  {
    // jika true jadi false , jika false jadi true
    setLogin(!login)
  }

  const userLogin = async () =>
   {
        setisLoading(true)
        // body request
        const user = {
            email,password
        }

        try {
            const res = await axios.post(`${baseUrl}/user/signin`, user)
            // console.log(res)
            // saveTokenUser to localStorage
            localStorage.setItem("token", res.data.token )
            setEmail("")
            setPassword("")
            setisLoading(false)
            loginSuccess()
            // history.push("/task")
        } catch (error) {
            setIsError(true)
            // console.log(error.response.data)
            setError(error.response.data.errors)
            setisLoading(false)
            setEmail("")
            setPassword("")
            setTimeout(() => {
                setIsError(false)
                setError("")
                loginFailed()
            },3000)
        }
   }

  const userRegister = async () =>
  {
    // setLoading menjadi true
    setisLoading(true)
      // body request
      const user = {
        name, email,password
    }

    try {
        const res = await axios.post(`${baseUrl}/user/signup`, user)
        // console.log(res)
        // saveTokenUser to localStorage
        localStorage.setItem("token", res.data.token )
        setName("")
        setEmail("")
        setPassword("")
        loginSuccess()
        setisLoading(false)
        // history.push("/")
        alert("register berhasil silakan login")
    } catch (error) {
        setIsError(true)
        // console.log(error.response.data)
        setError(error.response.data.errors)
        setisLoading(false)
        setName("")
        setEmail("")
        setPassword("")
        setTimeout(() => {
            setIsError(false)
            setError("")
            loginFailed()
        },3000)
    }
  }
//   jika isAuthencated true
  if(isAuthencated)
    {
      return <Redirect to="/task" />
    }

  return (
    <div style={box}>
        <h3 style={head}>{login ? "Login" : "Register"}</h3>
        <div> 
            {/* jika tidak login mempunyai input name*/}
           {!login && <Input change={(e) => setName(e.target.value)} value={name} placeholder="masukan nama" type="text" />}
                <>
                   <Input 
                        value={email}
                        change={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="masukan email" 
                        />
                    <Input
                        value={password}
                        change={(e) => setPassword(e.target.value)}
                        type="password" 
                        placeholder="masukan password"      
                    />
                </>
        </div>
        <div style={btn}>
            {/* error message */}
            {isError && (
                <div>
                    {error && error.map((item, index) => 
                     <p style={errorMsg} key={index}>{item.msg}</p> 
                    )}
                </div>
            )}
            <Button 
              action={login ? userLogin : userRegister} 
              load={isLoading} 
              variant='primary' 
              text={login ? "Login" : "Register"} />
        </div>
        {login ? (
            <div style={parag}>
             <p>belum punya akun ? silahkan 
                <span onClick={isLogin} style={textSpan} >Register</span>
             </p>
            </div>
            
        ) : (
            <div style={parag}>
             <p>Sudah punya akun ? Silahkan 
                <span onClick={isLogin}  style={textSpan}>Login</span>
             </p>
           </div>  
        )}
        
    </div>
  )
}

export default Auth

const box = {
    background: "#D9DEE6",
    width: "25%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding:"0.7rem"


}
const head = {
    textAlign: "center",
    marginBottom: "0.4rem",
}
const btn = {
    textAlign: "center",
    marginTop: "0.5rem",

}
const parag = {
    textAlign: "center",
    marginTop: "0.5rem",
    fontSize: "14px"

}

const textSpan = {
    color: "blue",
    cursor: "pointer",
    textDecoration: "underline"
}

const errorMsg = {
    background: "red",
    color: "black"
}



