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
            await gsap.to(correctRef.current, { duration: 0.8, background: 'green' })
            await gsap.to(correctRef.current, { duration: 0.8, background: 'white' })
            //alert('Correto!')
        } else {
            gsap.to('.item', { duration: 0.8, background: 'red' })
			await gsap.to(correctRef.current, { duration: 0.8, background: 'green' })
			gsap.to('.item', { duration: 0.8, background: 'white' })
			await gsap.to(correctRef.current, { duration: 0.8, background: 'white' })
        }
        if (round < 6) {
            round = round + 1
            setQuestion(bd[round])
            startTimer()
        }else{ //game over
            setGameEnded(true)
        }

    }

    return (
        <div id="game-screen">
            <Background>
                <div className={`end-container  ${gameEnded?'':'sumiu'}`}>
					<h2>Fim de Jogo!</h2>
					<div className="players-container">
						<div className={`player ${winner==='player'?'winner':winner==='tie'?'tie':''}`}>
							<h1 className="big-name">{user_object.login}</h1>
							<h2 className="big-points">{playerPoints}</h2>
						</div>
					</div>
					<button>Voltar para a Sala</button>
					
				</div>
                <div className={`game-container ${gameEnded?'sumiu':''}`}>
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
                </div>
                <Link to="/title" >
                    <h2>Sair</h2>
                </Link>
            </Background>
        </div>
    );
}

export default Training;

