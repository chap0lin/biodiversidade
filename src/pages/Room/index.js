import React from 'react'
import {Link} from 'react-router-dom'

import './styles.css'

function Room(){
    return(
        <div id="page-room">
            <div className="logo-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="268" height="76" viewBox="0 0 268 76">
                <text id="BIO" transform="translate(0 62)" fill="#fff" fontSize="57" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">BIO</tspan></text>
                <text id="DIVERSIDADE" transform="translate(98 41)" fill="#fff" fontSize="28" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">DIVERSIDADE</tspan></text>
                <text id="GENES" transform="translate(98 64)" fill="#fff" fontSize="11" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">GENES</tspan></text>
                <text id="ESPÉCIES" transform="translate(140 64)" fill="#fff" fontSize="11" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">ESPÉCIES</tspan></text>
                <text id="ECOSSISTEMAS" transform="translate(193 64)" fill="#fff" fontSize="11" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">ECOSSISTEMAS</tspan></text>
                <circle id="Elipse_1" data-name="Elipse 1" cx="1.5" cy="1.5" r="1.5" transform="translate(134 59)" fill="#fff"/>
                <circle id="Elipse_2" data-name="Elipse 2" cx="1.5" cy="1.5" r="1.5" transform="translate(187 59)" fill="#fff"/>
            </svg>
            </div>
            <div></div>
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