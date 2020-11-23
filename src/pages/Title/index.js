import React, { useState } from 'react'
import { useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
import Background from '../../components/background'
import api from '../../services/api'

import './styles.css'
function Title(){
    //const location = useLocation()
    const history = useHistory()
    const user_object = JSON.parse(localStorage.getItem('userData'))
    const [titleObject, setTitleObject] = useState({})
    console.log(JSON.stringify(user_object))

    useEffect(()=>{
        if(user_object == null){
            history.push('/')
        }else{
            try{
                api.post('titleRequest', user_object).then(response => {
                    setTitleObject(response.data)
                })
            }catch(err){
                console.log(err)
                history.push('/')
            }
        }
        // eslint-disable-next-line
    }, [])


    function handleEnterRoom(){
        //socket.emit('enterRoom', {roomId: 1})
        localStorage.setItem('roomId', 1)
        history.push('/room')
    }


    return(
        <div id="page-title">
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
                <div className="rooms-container">
                    <h2 className="title">Salas</h2>
                    <input type="text" placeholder="busque por nome" />
                    <div className="room-list">
                        <div className="list-header">
                            <p>Nome da Sala</p>
                            <p>Jogadores</p>
                        </div>
                        {titleObject.rooms!=null &&
                            titleObject.rooms.map(room => (
                                <div className="room-item" key={room.id}>
                                    <p>{room.name}</p>
                                    <p>{`${room.n_players}/${room.size}`}</p>
                                </div>
                            ))
                        
                        }
                        
                    </div>
                    <button onClick={handleEnterRoom}>ENTRAR NA SALA</button>
                </div>
                <div className="buttons-container">
                    <button>CRIAR SALA</button>
                    <button>RANKINGS</button>
                </div>
                <Link to="/" >
                    <h2>Sair</h2>
                </Link>
            </Background>
        </div>
    )
}

export default Title