import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { gsap } from 'gsap'
import Background from '../../components/background'
import api from '../../services/api'

import './styles.css';

var interval
var clientInterval
var started = false
var responded = false
var points = 0
var round = 0
function Game() {
	const user_object = JSON.parse(localStorage.getItem('userData'))
    //const roomId = localStorage.getItem('roomId')
	const history = useHistory()
	const [timerValue, setTimerValue] = useState(10)
	const correctRef = useRef(null)
	const wrongRef = useRef(null)
	const [score, setScore] = useState({
		player: 0,
		adversary: 0
	})
	const [playerNames, setPlayerNames] = useState({
		player: '',
		adversary: '',
	})
	const [question, setQuestion] = useState({
		id: 0,
		question: '',
		answers: [
			'a', 'b', 'c', 'd'
		],
		correctAnswer: 0
	})
	//const [bd, setBd] = useState({})
	const [gameEnded, setGameEnded] = useState(false)
	const [winner, setWinner] = useState('')
	useEffect(()=>{
		if(user_object != null){
            interval = setInterval(keepAlive, 1000)
        }else{
            history.push('/')
        }
		//eslint-disable-next-line
	}, [])
	function keepAlive(){
		try{
			api.post('keepPlayerAliveGame', 
			{
				user_object, responded, points, round
			}).then(response=>{
				if(!started){
					//setBd(response.data.questions)
					setQuestion(response.data.questions[round])
					console.log(`UO:${user_object} - {${JSON.stringify(user_object)}}`)
					console.log(`id:${response.data.player_1.id}vs${user_object.id} || ${typeof response.data.player_1.id} vs ${typeof user_object.id}`)
					if(response.data.player_1.id === user_object.id){
						setPlayerNames({
							player: response.data.player_1.login,
							adversary: response.data.player_2.login
						})
					}else{
						setPlayerNames({
							player: response.data.player_2.login,
							adversary: response.data.player_1.login
						})
					}
					startTimer()
					started = true
				}else{
					const game = response.data
					if(game.abandoned){
						setGameEnded(true)
						setWinner('Jogador abandonou a partida! :/')
						clearInterval(interval)
						started = false
						responded = false
						points = 0
						round = 0
					}

					if(response.data.player_1.id === user_object.id){
						setScore({
							player:  game.player1Points,
							adversary:  game.player2Points
						})
					}else{
						setScore({
							player:  game.player2Points,
							adversary:  game.player1Points
						})
					}
					if(game.currentRound!== round){
						responded = false
						if(game.currentRound === 7){//match over
							setGameEnded(true)
							var newUserData = user_object
							if(response.data.player_1.id === user_object.id){
								setWinner(game.player1Points>game.player2Points?'player':game.player1Points === game.player2Points?'tie':'adversary')
								newUserData.points_t += game.player1Points
							}else{
								setWinner(game.player2Points>game.player1Points?'player':game.player2Points === game.player1Points?'tie':'adversary')
								newUserData.points_t += game.player2Points
							}
							localStorage.setItem('userData', JSON.stringify(newUserData))
							clearInterval(interval)
							started = false
							responded = false
							points = 0
							round = 0
						}else{
							round = game.currentRound
							setTimeout(()=>{
								clearInterval(clientInterval)
								startTimer()
								setQuestion(response.data.questions[game.currentRound])
							}, 
							2000)
						}
					}
				}	
            })
        }catch(err){
            console.log(err)
            history.push('/')
        }
	}

	function startTimer() {
		const now = new Date().getTime() //receive from server later
		const countdownTime = now + 20000; //20s
		clientInterval = setInterval(() => {
			const now = new Date().getTime()
			const distance = countdownTime - now
			const value = (distance / 1000).toFixed(0)
			if (distance < 0) {
				clearInterval(clientInterval)
				if(!responded){
					responded = true
				}
			} else {
				setTimerValue(value)
			}
		}, 100)
	}

	async function handleSelection(choice) {
		const time = timerValue
		if (choice === question.correctAnswer) {
			points+=10 + Math.floor(time)
			await setScore({
				...score,
				player: score.player + 10 + Math.floor(time)
			})
			responded = true
			await gsap.to(correctRef.current, { duration: 0.8, background: 'green' })
			await gsap.to(correctRef.current, { duration: 0.8, background: 'white' })
		} else {
			responded = true
			gsap.to('.item', { duration: 0.8, background: 'red' })
			await gsap.to(correctRef.current, { duration: 0.8, background: 'green' })
			gsap.to('.item', { duration: 0.8, background: 'white' })
			await gsap.to(correctRef.current, { duration: 0.8, background: 'white' })
		}
	}
	function handleGoBack(){

        history.push('/room')
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
					<h2>{winner==='player'?'Vitória!':winner==='adversary'?'Derrota!':winner==='tie'?'Empate!':winner}</h2>
					<div className="players-container">
						<div className={`player ${winner==='player'?'winner':winner==='tie'?'tie':''}`}>
							<h1 className="big-name">{playerNames.player}</h1>
							<h2 className="big-points">{score.player}</h2>
						</div>
						<div className="vs">
							<h2>VS</h2>
						</div>
						<div className={`player ${winner==='adversary'?'winner':winner==='tie'?'tie':''}`}>
							<h1 className="big-name">{playerNames.adversary}</h1>
							<h2 className="big-points">{score.adversary}</h2>
						</div>
					</div>
					<button onClick={handleGoBack}>Voltar para a Sala</button>
					
				</div>
				<div className={`div-game ${gameEnded?'sumiu':''}`}>
					<div className={`game-container`}>
						<div className="scoreboard">
							<div className="player-one">
								<p>{playerNames.player}</p>
								<p>{score.player}</p>
							</div>
							<div className="timer">
								<p>{timerValue}</p>
							</div>
							<div className="player-two">
								<p>{playerNames.adversary}</p>
								<p>{score.adversary}</p>
							</div>
						</div>
						<div className="question">
							<h2>{question.question!=null?question.question:''}</h2>
						</div>
						<div className="answers">
							{question.answers.map((item, index) => (
								<div key={index} ref={index === question.correctAnswer ? correctRef : wrongRef} className="item" onClick={() => handleSelection(index)}>
									<p>{item}</p>
								</div>
							))}

						</div>
					</div>
				</div>
			</Background>
		</div>
	);
}

export default Game;

