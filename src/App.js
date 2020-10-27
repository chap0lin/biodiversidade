import React, {useState, useEffect, useRef} from 'react';
import { gsap } from 'gsap'
import './styles.css';

var interval

function App() {
  const [round, setRound] = useState(0)
  const [timerValue, setTimerValue] = useState(10)
  const [playerPoints, setPlayerPoints] = useState(0)
  const correctRef = useRef(null)
  const wrongRef = useRef(null)
  const [question, setQuestion] = useState({
    id:0,
    question: '',
    answers: [
      'a',  'b', 'c', 'd'
    ],
    correctAnswer: 0
  })
  const [score, setScore] = useState({
    player: 0,
    adversary: 0
  })

  const bd = [
    {
      id: 1,
      question: 'Quanto maior a superposição dos nichos ecológicos de duas espécies, maior será ...',
      answers: [
        'a competição', 'a protocooperação', 'o potencial biótico', 'o bioma'
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      question: 'Termo adotado por Van Potter em 1970/71 para integrar aspectos das ciências naturais com valores humanos, viabilizando o que ele chamou de “Ponte para o Futuro”',
      answers: [
        'Alelobiose', 'Bioética', 'Biotecnologia', 'Sociobiologia '
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      question: 'As características abaixo são observadas e primatas do novo mundo, exceto:',
      answers: [
        'cauda preênsil', 'geralmente arborícolas', 'polegares opositores', 'nariz achatado, com narinas abertas para os lados'
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      question: 'Qual o dedo mais importante dos hominídeos?',
      answers: [
        'anelar', 'médio', 'indicador', 'polegar'
      ],
      correctAnswer: 3
    },
    {
      id: 5,
      question: 'Como são chamadas as espécies que possuem nichos ecológicos semelhantes, porém habitam regiões geográficas distintas?',
      answers: [
        'competidoras', 'equivalentes ecológicos', 'sinfílicas', 'pioneiras'
      ],
      correctAnswer: 1
    },
    {
      id: 6,
      question: 'Papagaio verdadeiro, pipira vermelha e sanhaço são pássaros frugívoros. Portanto, pertencem à mesma ...',
      answers: [
        'família', 'guilda', 'classe', 'ordem'
      ],
      correctAnswer: 1
    },
    {
      id: 7,
      question: 'O nicho ecológico da espécie humana é muito amplo. Por este motivo a espécie é considerada ...',
      answers: [
        'cosmopolita', 'especialista ', 'generalista', 'euriécia'
      ],
      correctAnswer: 2
    },
  ]


  useEffect(()=>{
    setQuestion(bd[round])
  }, [round, bd])
  useEffect(()=>{
    startTimer()
  }, [])
  //var interval
  function startTimer(){
    const now = new Date().getTime() //receive from server later
    const countdownTime = now+10000; //10s
    interval = setInterval(()=>{
      const now = new Date().getTime()
      const distance = countdownTime - now
      const value = (distance/1000).toFixed(1)
      if(distance<0){
        clearInterval(interval)
      }else{
        setTimerValue(value)
      }
    }, 100)
  }

  async function handleSelection(choice){
    await clearInterval(interval)
    const time = timerValue
    //console.log(choice)
    if(choice === question.correctAnswer){
      await gsap.to(correctRef.current, {duration: 0.8, background: 'green' })
      await gsap.to(correctRef.current, {duration: 0.8, background: 'white' })

      setPlayerPoints(playerPoints+10+Math.floor(time))
      //alert('Correto!')
    }else{
      gsap.to(correctRef.current, {duration: 0.8, background: 'green' })
      await gsap.to(wrongRef.current, {duration: 0.8, background: 'red' })
      gsap.to(correctRef.current, {duration: 0.8, background: 'white' })
      await gsap.to(wrongRef.current, {duration: 0.8, background: 'white' }) 
    }
    if(round<6){
      setRound(round+1)
      startTimer()
    }
      
  }

  return (
    <div id="game-screen">
      <div className="game-container">
        <div className="scoreboard">
          <div className="player-one">
            <p>Joãozinho</p>
            <p>{playerPoints}</p>
          </div>
          <div className="timer">
            <p>{timerValue}</p>
          </div>
          <div className="player-two">
            <p>Fulaninho</p>
            <p>0</p>
          </div>
        </div>
        <div className="question">
          <h2>{question.question}</h2>
        </div>
        <div className="answers">
          {question.answers.map((item, index) => (
            <div key={index} ref={index===question.correctAnswer?correctRef:wrongRef} className="item" onClick={()=>handleSelection(index)}>
              <p>{item}</p>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default App;
