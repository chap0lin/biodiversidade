import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Background from '../../components/background'
import api from '../../services/api'

import './styles.css'
var interval
var playerReady = false
function Room(){
    const user_object = JSON.parse(localStorage.getItem('userData'))
    const roomId = localStorage.getItem('roomId')
    
    const history = useHistory()
    const [roomObject, setRoomObject] = useState({})
    const [inQueue, setInQueue] = useState(playerReady)
    useEffect(()=>{
        if(user_object != null && roomId != null){
            interval = setInterval(keepAlive, 1000)
        }else{
            history.push('/')
        }
        // eslint-disable-next-line
    }, [])
    function keepAlive(){
        try{
            api.post('keepPlayerAliveRoom', {user_object, roomId, ready: playerReady}).then(response=>{
                var formatedPlayerList = null
                if(response.data.players!=null){
                    formatedPlayerList = response.data.players.sort((a, b)=>{
                        return b.points_t - a.points_t
                    })
                }
                setRoomObject({
                    ...response.data,
                    players: formatedPlayerList
                })
                if(response.data.started){
                    clearInterval(interval)
                    playerReady = false
                    history.push('/game')
                }
            })
        }catch(err){
            console.log(err)
            history.push('/')
        }
    }
    function handlePlayClick(){
        console.log('Clicked')
        if(playerReady){
            setInQueue(false)
            playerReady = false
        }else{
            setInQueue(true)
            playerReady = true
        }
            
    }
    function handleGoBack(){
        if(!inQueue){
            clearInterval(interval)
            playerReady = false
            history.push('/title')
        }
    }

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
                                    <p>{player.points_t}</p>
                                <div className={`${player.inGame?'ocupado':'disponivel'}`}></div>
                        </div>
                            ))
                        }
                        
                    </div>
                    <button onClick={handlePlayClick}>{inQueue?'CANCELAR':'JOGAR'}</button>
                </div>
                <h2 onClick={handleGoBack}>Voltar</h2>
            </Background>
        </div>
    )
}

export default Room