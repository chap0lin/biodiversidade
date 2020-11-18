import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Background from '../../components/background'
import SocketConnection from '../../services/socket-connection'
import './styles.css'

function Room(){
    var socketConnection = new SocketConnection()
    const socket = socketConnection.conn()
    const history = useHistory()
    const [roomObject, setRoomObject] = useState({})
    useEffect(()=>{
        socket.emit('roomRequest', {})
        // eslint-disable-next-line
    }, [])

    socket.on('roomMessage', message=> {
        setRoomObject(message)
    })
    socket.on('message', message => {
        console.log(`[${socket.id}]:${message}`)
    })
    function handlePlayClick(){
        socket.emit('playerReady')
    }
    socket.on('GameFound', ()=>{
        history.push('/game')
    })
    return(
        <div id="page-room">
            <Background>
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
                <div className="players-container">
                    <h2 className="title">{roomObject.name!=null?roomObject.name:''}</h2>
                    <div className="players-list">
                        <div className="list-header">
                            <p>Jogador</p>
                            <p>Pontos</p>
                            <p>Status</p>
                        </div>
                        {roomObject.players!=null &&
                            roomObject.players.map(player => (
                                <div className="player-item" key={player.id}>
                                    <p>{player.login}</p>
                                    <p>{player.points_w}</p>
                                <div className="ocupado"></div>
                        </div>
                            ))
                        }
                        
                    </div>
                    <button onClick={handlePlayClick}>JOGAR</button>
                </div>
                <Link to="/title" >
                    <h2>Voltar</h2>
                </Link>
            </Background>
        </div>
    )
}

export default Room