import React from 'react'
import {Link} from 'react-router-dom'

function Room(){
    return(
        <div>
            <h1>Room</h1>
            <Link to="/game" >
                <h2>Jogar</h2>
            </Link>
            <Link to="/title" >
                <h2>Voltar</h2>
            </Link>
        </div>
    )
}

export default Room