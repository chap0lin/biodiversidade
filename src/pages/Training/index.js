import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { gsap } from 'gsap'
import Background from '../../components/background'
import api from '../../services/api'

import './styles.css';

var interval
var round = 0
var bd = null
function Training() {
    const user_object = JSON.parse(localStorage.getItem('userData'))
    //const roomId = localStorage.getItem('roomId')
    const history = useHistory()
    const [timerValue, setTimerValue] = useState(10)
    const [playerPoints, setPlayerPoints] = useState(0)
    const correctRef = useRef(null)
    const [gameEnded, setGameEnded] = useState(false)
    const [winner, setWinner] = useState('player')

    const wrongRef = useRef(null)
    const [question, setQuestion] = useState({
        id: 0,
        question: '',
        answers: [
            'a', 'b', 'c', 'd'
        ],
        correctAnswer: 0
    })
    const [score, setScore] = useState({
        player: 0,
        adversary: 0
    })
    useEffect(()=>{
		api.get('quiz').then(response => {
            bd = response.data
            setQuestion(bd[round])
        })
		//eslint-disable-next-line
	}, [])

    
    useEffect(() => {
        startTimer()
        //eslint-disable-next-line
    }, [])
    //var interval
    function startTimer() {
        clearInterval(interval)
        const now = new Date().getTime() //receive from server later
        const countdownTime = now + 20000; //10s
        interval = setInterval(() => {
            const now = new Date().getTime()
            const distance = countdownTime - now
            const value = (distance / 1000).toFixed(0)
            if (distance < 0) {
                if (round < 6) {
                    round = round + 1
                    setQuestion(bd[round])
                    startTimer()
                }else{ //game over
                    setGameEnded(true)
                    round = 0
                    clearInterval(interval)
                }
            } else {
                setTimerValue(value)
            }
        }, 100)
    }

    async function handleSelection(choice) {
        await clearInterval(interval)
        const time = timerValue
        //console.log(choice)
        if (choice === question.correctAnswer) {
            setPlayerPoints(playerPoints + 10 + Math.floor(time))
            await gsap.to(correctRef.current, { duration: 1, background: 'green' })
            await gsap.to(correctRef.current, { duration: 1, background: 'white' })
            //alert('Correto!')
        } else {
            gsap.to('.item', { duration: 1, background: 'red' })
			await gsap.to(correctRef.current, { duration: 1, background: 'green' })
			gsap.to('.item', { duration: 1, background: 'white' })
			await gsap.to(correctRef.current, { duration: 1, background: 'white' })
        }
        if (round < 6) {
            round = round + 1
            setQuestion(bd[round])
            startTimer()
        }else{ //game over
            setGameEnded(true)
            round = 0
        }

    }
    function handleGoBack(){
        clearInterval(interval)
        round = 0
        history.push('/title')
    }

    return (
        <div id="game-screen">
            <Background>
                <div className="logo-container">
                    {gameEnded?
                    <svg xmlns="http://www.w3.org/2000/svg" width="268" height="76" viewBox="0 0 268 76">
                        <text id="BIO" transform="translate(0 62)" fill="#fff" fontSize="57" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">BIO</tspan></text>
                        <text id="DIVERSIDADE" transform="translate(98 41)" fill="#fff" fontSize="28" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">DIVERSIDADE</tspan></text>
                        <text id="GENES" transform="translate(98 64)" fill="#fff" fontSize="11" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">GENES</tspan></text>
                        <text id="ESPÉCIES" transform="translate(140 64)" fill="#fff" fontSize="11" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">ESPÉCIES</tspan></text>
                        <text id="ECOSSISTEMAS" transform="translate(193 64)" fill="#fff" fontSize="11" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">ECOSSISTEMAS</tspan></text>
                        <circle id="Elipse_1" data-name="Elipse 1" cx="1.5" cy="1.5" r="1.5" transform="translate(134 59)" fill="#fff"/>
                        <circle id="Elipse_2" data-name="Elipse 2" cx="1.5" cy="1.5" r="1.5" transform="translate(187 59)" fill="#fff"/>
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="79" height="22" viewBox="0 0 79 22">
                        <text id="BIO" transform="translate(0 18)" fill="#fff" fontSize="17" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">BIO</tspan></text>
                        <text id="DIVERSIDADE" transform="translate(29 12)" fill="#fff" fontSize="8" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">DIVERSIDADE</tspan></text>
                        <text id="GENES" transform="translate(29 18)" fill="#fff" fontSize="3" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">GENES</tspan></text>
                        <text id="ESPÉCIES" transform="translate(42 18)" fill="#fff" fontSize="3" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">ESPÉCIES</tspan></text>
                        <text id="ECOSSISTEMAS" transform="translate(58 18)" fill="#fff" fontSize="3" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">ECOSSISTEMAS</tspan></text>
                        <circle id="Elipse_1" data-name="Elipse 1" cx="1" cy="1" r="1" transform="translate(39 16)" fill="#fff"/>
                        <circle id="Elipse_2" data-name="Elipse 2" cx="1" cy="1" r="1" transform="translate(55 16)" fill="#fff"/>
                    </svg>
                    }
                </div>
                <div className={`end-container  ${gameEnded?'':'sumiu'}`}>
					<h2>Fim de Jogo!</h2>
					<div className="players-container">
						<div className={`player ${winner==='player'?'winner':winner==='tie'?'tie':''}`}>
							<h1 className="big-name">{user_object.login}</h1>
							<h2 className="big-points">{playerPoints}</h2>
						</div>
					</div>
					<button onClick={handleGoBack}>Voltar para a Sala</button>
					
				</div>
                <div className={`div-game ${gameEnded?'sumiu':''}`}>
                    <div className={`game-container`}>
                        <div className="scoreboard">
                            <div className="player-one">
                                <p>{user_object.login}</p>
                                <p>{playerPoints}</p>
                            </div>
                            <div className="timer">
                                <p>{timerValue}</p>
                            </div>
                        </div>
                        <div className="question">
                            <h2>{question.question}</h2>
                        </div>
                        <div className="answers">
                            {question.answers.map((item, index) => (
                                <div key={index} ref={index === question.correctAnswer ? correctRef : wrongRef} className="item" onClick={() => handleSelection(index)}>
                                    <p>{item}</p>
                                </div>
                            ))}

                        </div>
                        <button onClick={handleGoBack}>Sair</button>
                    </div>
                </div>
            </Background>
        </div>
    );
}

export default Training;

