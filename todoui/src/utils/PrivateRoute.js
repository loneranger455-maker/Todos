import React from 'react'
import { GetToken } from '../components/Localstorage'
import { Navigate } from "react-router-dom";

function PrivateRoute({children}) {
const {access}=GetToken()
if (access){
    return children
}
else{
    <Navigate to='/'></Navigate>
}


}

export default PrivateRoute