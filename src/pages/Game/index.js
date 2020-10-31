import React from 'react'
import {Link} from 'react-router-dom'

function Game(){
    return(
        <div>
            <h1>Game</h1>
            <Link to="/room" >
                <h2>Sair</h2>
            </Link>
        </div>
    )
}

export default Game