import React from 'react'
import {Link} from 'react-router-dom'


function Title(){
    return(
        <div>
            <h1>Title</h1>
            <Link to="/room" >
                <h2>Entrar</h2>
            </Link>
            <Link to="/" >
                <h2>Sair</h2>
            </Link>
        </div>
    )
}

export default Title