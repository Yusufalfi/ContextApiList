import React, {createContext, useState} from "react"

export const AuthContext = createContext()

export const AuthProvider = (props) => {

    const [ isAuthencated, setAuth] = useState(false)

    const loginSuccess = () => {
        setAuth(true);
    }
    const loginFailed = () => {
        localStorage.removeItem("token")
        setAuth(false);
    }
    const logout = () => {
        localStorage.removeItem("token")
        setAuth(false);
    }

    return(
        <AuthContext.Provider 
          value={{isAuthencated, loginSuccess, loginFailed, logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}

