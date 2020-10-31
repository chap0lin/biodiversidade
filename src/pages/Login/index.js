import React from 'react'
import {Link} from 'react-router-dom'

function Login(){
    return(
        <div>
            <h1>Login</h1>
            <Link to="/title" >
                <h2>Entrar</h2>
            </Link>
        </div>
    )
}

export default Login