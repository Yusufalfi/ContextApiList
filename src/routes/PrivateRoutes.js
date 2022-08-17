import React, {useContext} from 'react'
import {Route, Redirect} from "react-router-dom"
import { AuthContext } from '../context/auth'

const PrivateRoutes = ({component: Component, ...rest}) => {
    const {isAuthencated} =useContext(AuthContext)
    return (
        <Route 
          {...rest} 
          render={props =>
             isAuthencated ? (
            <Component {...props} />
          ): (
            <Redirect to="/" />
          )
         }   
        />     
    )
}

export default PrivateRoutes