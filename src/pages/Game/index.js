import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { gsap } from 'gsap'
import Background from '../../components/background'
//import SocketConnection from '../../services/socket-connection'
import {useSocket} from '../../services/socket-connection'
import './styles.css';

var interval

function Game() {
	// var socketConnection = new SocketConnection()
	// const socket = socketConnection.conn()
	const socket = useSocket()
	const history = useHistory()
	const [round, setRound] = useState(0)
	const [timerValue, setTimerValue] = useState(10)
	const correctRef = useRef(null)
	const wrongRef = useRef(null)
	const [question, setQuestion] = useState({
		id: 0,
		question: '',
		answers: [
			'a', 'b', 'c', 'd'
		],
		correctAnswer: 0
	})
	const [bd, setBd] = useState({})

	useEffect(()=>{
        socket.emit('gameRequest', {})
        // eslint-disable-next-line
    }, [])

	socket.on('GameStarted', message => {
		console.log(JSON.stringify(message))
		setBd(message.questions)
		setQuestion(message.questions[round])
		if(message.player_1.socketId === socket.id){
			setPlayerNames({
				player: message.player_1.login,
				adversary: message.player_2.login
			})
		}else{
			setPlayerNames({
				player: message.player_2.login,
				adversary: message.player_1.login
			})
		}
		startTimer()
	})
	var playerResponded = false
	socket.once('playerResponded', message => {
		if(playerResponded === false){
			playerResponded = true
			console.log('Player Responded' + playerResponded)
			if(message.player_1.socketId === socket.id){
				setScore({
					...score,
					adversary: message.player2Points
				})
			}else{
				setScore({
					...score,
					adversary: message.player1Points
				})
			}
		}
	})
	socket.once('NextRound', async(game)=>{
		console.log('Next Round received')
		if(round<6){
			playerResponded = false
			await setRound(round + 1)
			setQuestion(game.questions[round])
			startTimer()
		}
	})


	const [score, setScore] = useState({
	  player: 0,
	  adversary: 0
	})
	const [playerNames, setPlayerNames] = useState({
		player: '',
		adversary: '',
	})


	// useEffect(() => {
	// 	setQuestion(bd[round])
	// }, [round, bd])
	//var interval
	function startTimer() {
		const now = new Date().getTime() //receive from server later
		const countdownTime = now + 10000; //10s
		interval = setInterval(() => {
			const now = new Date().getTime()
			const distance = countdownTime - now
			const value = (distance / 1000).toFixed(1)
			if (distance < 0) {
				clearInterval(interval)
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
			await setScore({
				...score,
				player: score.player + 10 + Math.floor(time)
			})
			socket.emit('playerResponded', {
				points: score.player
			})
			await gsap.to(correctRef.current, { duration: 0.8, background: 'green' })
			await gsap.to(correctRef.current, { duration: 0.8, background: 'white' })
			
			//alert('Correto!')
		} else {
			socket.emit('playerResponded', {
				points: score.player
			})
			gsap.to('.item', { duration: 0.8, background: 'red' })
			await gsap.to(correctRef.current, { duration: 0.8, background: 'green' })
			gsap.to('.item', { duration: 0.8, background: 'white' })
			await gsap.to(correctRef.current, { duration: 0.8, background: 'white' })
		}
	}

	return (
		<div id="game-screen">
			<Background>
				<div className="logo-container">
					<svg xmlns="http://www.w3.org/2000/svg" width="79" height="22" viewBox="0 0 79 22">
						<text id="BIO" transform="translate(0 18)" fill="#fff" fontSize="17" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">BIO</tspan></text>
						<text id="DIVERSIDADE" transform="translate(29 12)" fill="#fff" fontSize="8" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">DIVERSIDADE</tspan></text>
						<text id="GENES" transform="translate(29 18)" fill="#fff" fontSize="3" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">GENES</tspan></text>
						<text id="ESPÉCIES" transform="translate(42 18)" fill="#fff" fontSize="3" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">ESPÉCIES</tspan></text>
						<text id="ECOSSISTEMAS" transform="translate(58 18)" fill="#fff" fontSize="3" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">ECOSSISTEMAS</tspan></text>
						<circle id="Elipse_1" data-name="Elipse 1" cx="1" cy="1" r="1" transform="translate(39 16)" fill="#fff"/>
						<circle id="Elipse_2" data-name="Elipse 2" cx="1" cy="1" r="1" transform="translate(55 16)" fill="#fff"/>
					</svg>
				</div>
				<div className="game-container">
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
				<Link to="/room" >
					<h2>Sair</h2>
				</Link>
			</Background>
		</div>
	);
}

export default Game;

