import React from 'react'
import { Route } from 'react-router-dom'
import Auth from '../autentikasi/Auth'
import Task from '../autentikasi/Task'
import PrivateRoutes from './PrivateRoutes'

const Routes = () => {
    return(
        <>
            
            <Route exact path="/" component={Auth} />
            <PrivateRoutes exact path="/task" component={Task} /> 
        </>
    )
}

export default Routes;