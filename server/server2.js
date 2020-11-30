const express = require('express')
const cors = require('cors')

const routes = require('./routes')

const QuestionsController = require('./Controllers/QuestionsController')
const questionsController = new QuestionsController()

const app = express()

app.use(cors())
app.use(express.json());
app.use(routes)

var players = []
var titleObject = {
    rooms: [
        {
            id: 1,
            name: 'Sala Geral 1',
            size: 50,
            n_players: 0,
            players: []
        },
        {
            id: 2,
            name: 'Sala Geral 2',
            size: 50,
            n_players: 0,
            players: []
        }
    ],
}
var games = []
// var game = {
//     started:false,
//     generated: false,
//     player_1: null,
//     player_2: null,
//     questions: null,
//     player1Responded: false,
//     player2Responded: false,
//     player1Points: 0,
//     player2Points: 0,
//     currentRound: 0
// }

app.post('/titleRequest', async(req, res) => {
    const user_object = req.body
    if(user_object != null && user_object != {}){
        var newPlayer = true
        await players.map(player => {
            if(user_object.id === player.id){
                newPlayer = false
            }
        })
        if(newPlayer){
            players.push({...user_object})
            console.log(`New player: ${user_object.login}`)
        }
        res.json(titleObject)
    }else{
        res.status(400).send({message: 'Erro! user_object não identificado!'})
    }
})

//later i'll make the player expired to remove
app.post('/keepPlayerAliveRoom', async(req, res) => {
    const roomId = req.body.roomId
    const user_object = req.body.user_object
    const ready = JSON.parse(req.body.ready)

    var game = getGame(user_object.id)
    //console.log('Alive (' + ready + ')')
    if(!game.generated){

        var newPlayer = true
        await titleObject.rooms[0].players.map(player => {
            if(user_object.id === player.id){
                newPlayer = false
            }
        })
        if(newPlayer){
            //console.log(`[${user_object.login}] just joined the room: ${roomId}`)
            titleObject.rooms[0].n_players+=1
            titleObject.rooms[0].players.push({...user_object})
        }


        if(ready){
            //console.log('Player Ready')
            if(game.player_1===null){

                game.player_1 = user_object

            }else if(game.player_2===null && game.player_1.id !== user_object.id){

                game.player_2 = user_object
                game.generated = true

            }
        }
    }
    
    res.json({
        started: game.generated,
        id: 1,
        name: 'Sala Geral 1',
        players
    })
    
})

app.post('/keepPlayerAliveGame', async (req, res) => {
    const user_object = req.body.user_object
    const responded = req.body.responded
    const points = JSON.parse(req.body.points)
    const round = JSON.parse(req.body.round)
    var game = getGame(user_object.id)

    if(game.started === 1){ // segunda++ requisicao recebida
        
        //console.log(`GameAlive! (${responded}) - [${points}]`)
        if(responded){
            console.log('respondeu' + points)
            if(game.player_1.id === user_object.id){
                game.player1Responded = true
                game.player1Points = points
            }else{
                game.player2Responded = true
                game.player2Points = points
            }
            if(game.player1Responded && game.player2Responded){
                if(round===game.currentRound){
                    game.currentRound++
                    console.log('Now next round' + game.currentRound)
                }else{
                    if(game.currentRound===7){ //ended
                        console.log('Game Ended')
                        res.json(game)
                        gameEnded()
                        return
                    }
                    game.player1Responded = false
                    game.player2Responded = false
                }
            }
        }
    }else{
        game.started = 1;
        const questions = await questionsController.getQuizQuestions()
        game.currentQuestion = 0
        game.questions = questions
        //console.log(JSON.stringify(game))
    }  
    res.json(game)
})

async function getGame(playerId){
    var output = {generated: false}
    games.map(game => {
        if((game.player_1!==null && game.player_1.id === playerId) || (game.player_2!==null && game.player_2.id === playerId)){
            output = game
            return
        }
    })
    return output
}

function gameEnded(){
    game = {
        started:false,
        generated: false,
        player_1: null,
        player_2: null,
        questions: null,
        player1Responded: false,
        player2Responded: false,
        player1Points: 0,
        player2Points: 0,
        currentRound: 0
    }
}

app.listen(3333, ()=>{
    console.log('> Server listening on port: 3333')
})