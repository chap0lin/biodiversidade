import React from 'react'
import {Link} from 'react-router-dom'

import './styles.css'

function Login(){
    return(
        <div id="page-login">
            <div className="login-container">

            </div>
            <div className="enter-container">

            </div>
            <h1>Login</h1>
            <Link to="/title" >
                <h2>Entrar</h2>
            </Link>
        </div>
    )
}

export default Login