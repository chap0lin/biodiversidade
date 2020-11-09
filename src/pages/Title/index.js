import React from 'react'
import {Link} from 'react-router-dom'

import './styles.css'

function Title(){
    return(
        <div id="page-title">
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
            <div className="rooms-container">
                <h2 className="title">Salas</h2>
                <input type="text" placeholder="busque por nome" />
                <div className="room-list">
                    <div className="list-header">
                        <p>Nome da Sala</p>
                        <p>Jogadores</p>
                    </div>
                    <Link to="/room" >
                    <div className="room-item">
                        <p>Sala geral 1</p>
                        <p>32/50</p>
                    </div>
                    </Link>
                </div>
            </div>
            <div className="buttons-container">
                <button>CRIAR SALA</button>
                <button>RANKINGS</button>
            </div>
            <Link to="/" >
                <h2>Sair</h2>
            </Link>
        </div>
    )
}

export default Title