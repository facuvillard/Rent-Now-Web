import React from 'react'
import {Typography} from '@material-ui/core'

const Login = (props) => {
    return (
        <div>
            
            <Typography variant='h1'>Hola {props.nombre}, estamos en el login....</Typography> 
        </div>
    )
}

export default Login;
