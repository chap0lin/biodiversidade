import React, { useState } from 'react'
import { useEffect } from 'react'
import { useHistory} from 'react-router-dom'
import Background from '../../components/background'
import api from '../../services/api'

import './styles.css'
function Title(){
    //const location = useLocation()
    const history = useHistory()
    const user_object = JSON.parse(localStorage.getItem('userData'))
    //const [titleObject, setTitleObject] = useState({})
    const [ranking, setRanking] = useState(null)
    const [rankingVisible, setRankingVisible] = useState(false)
    console.log(JSON.stringify(user_object))

    useEffect(()=>{
        if(user_object == null){
            history.push('/')
        }else{
            try{
                api.post('titleRequest', user_object).then(response => {
                    //setTitleObject(response.data)
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
    function handleEnterTraining(){
        history.push('/training')
    }
    function handleRankingClick(){
        api.get('ranking_t').then(response => {
            setRanking(response.data)

        })
        setRankingVisible(true)
    }
    function handleLeave(){
        history.push('/')
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
                <div className={`${rankingVisible?'ranking-container':'invisible'}`}>
                    {ranking!=null &&
                            ranking.map((player, index) => (
                                <div className="ranking-item" key={player.id}>
                                    <p>{index+1}</p>
                                    <p>{player.login}</p>
                                    <p>{player.points_t}</p>
                                </div>
                            ))
                    }
                    <button onClick={()=>{setRankingVisible(false)}}>FECHAR</button>
                </div>
                <div className={`${rankingVisible?'invisible':'rooms-container'}`}>
                    <button onClick={handleEnterRoom}>JOGAR</button>
                    <button onClick={handleEnterTraining}>PRATICAR</button>
                </div>
                <div className={`${rankingVisible?'invisible':'buttons-container'}`}>
                    <button onClick={handleRankingClick}>RANKINGS</button>
                    <button onClick={handleLeave}>Sair</button>
                </div>
                
            </Background>
        </div>
    )
}

export default Title