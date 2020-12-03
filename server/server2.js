const express = require('express')
const cors = require('cors')

const routes = require('./routes')

const QuestionsController = require('./Controllers/QuestionsController')
const { use } = require('./routes')
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
        }
    ],
}
var hasGamePendent = -1
var games = []


app.post('/titleRequest', async(req, res) => {
    const user_object = req.body
    if(user_object != null && user_object != {}){
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
    //console.log('Alive[' + user_object.login + ']')
    //console.log(JSON.stringify(players))
    const playerIndex = await getPlayer(user_object)
    //console.log(`gp: ${hasGamePendent}[]:${games.length>0?JSON.stringify(games[hasGamePendent]):JSON.stringify(games)}`)
    if(ready){
        if(hasGamePendent !== -1 && games[hasGamePendent].player_1.id !== user_object.id){
            games[hasGamePendent].player_2 = user_object
            games[hasGamePendent].generated = true
            tooglePlayerInGameStatus(games[hasGamePendent].player_1.id)
            tooglePlayerInGameStatus(games[hasGamePendent].player_2.id)
            hasGamePendent = -1
        }else if(hasGamePendent === -1){
            const alreadyInGame = await getGame(user_object.id)
            if(alreadyInGame!==-1){
                res.json({
                    started: true,
                })
                return
            }
            console.log('Game Created')
            hasGamePendent = -1 + games.push({ 
                started:false,
                generated: false,
                player_1: user_object,
                player_2: null,
                questions: null,
                player1Responded: false,
                player2Responded: false,
                player1Points: 0,
                player2Points: 0,
                currentRound: 0
            })
        }
    }else{
        if(hasGamePendent!== -1 && games[hasGamePendent].player_1.id === user_object.id){ //unready
            games.splice(hasGamePendent-1,1)
            hasGamePendent = -1;
        }
    }
    //room update - get players with updatedAt - 5s  - else remove from players - room count
    var updatedPlayers = []
    var now = new Date().getTime()
    players.map(player => {
        if( (now - player.updatedAt)<=5000){
            updatedPlayers.push(player)
        }
    })
    players = updatedPlayers

    const gameIndex = await getGame(user_object.id)
    console.log(`[${user_object.login}] gi:${gameIndex} - ${gameIndex!==-1?JSON.stringify(games[gameIndex].generated):'nulo'}`)
    //format and send
    res.json({
        started: gameIndex!==-1?games[gameIndex].generated:false,
        id: 1,
        name: 'Sala Geral 1',
        players: updatedPlayers
    })
})

app.post('/keepPlayerAliveGame', async (req, res) => {
    const user_object = req.body.user_object
    const responded = req.body.responded
    const points = JSON.parse(req.body.points)
    const round = JSON.parse(req.body.round)
    var gameIndex = await getGame(user_object.id)
    const playerIndex = await getPlayer(user_object)
    if(games[gameIndex].started === 1){ // segunda++ requisicao recebida
        
        //console.log(`GameAlive! (${responded}) - [${points}]`)
        if(responded){
            console.log('respondeu' + points)
            if(games[gameIndex].player_1.id === user_object.id){
                games[gameIndex].player1Responded = true
                games[gameIndex].player1Points = points
            }else{
                games[gameIndex].player2Responded = true
                games[gameIndex].player2Points = points
            }
            if(games[gameIndex].player1Responded && games[gameIndex].player2Responded){
                if(round===games[gameIndex].currentRound){
                    games[gameIndex].currentRound++
                    console.log('Now next round' + games[gameIndex].currentRound)
                }else{
                    if(games[gameIndex].currentRound===7){ //ended
                        console.log('Game Ended')
                        res.json(games[gameIndex])
                        tooglePlayerInGameStatus(games[gameIndex].player_1.id)
                        tooglePlayerInGameStatus(games[gameIndex].player_2.id)
                        games.splice(gameIndex, 1)
                        //gameEnded()
                        return
                    }
                    games[gameIndex].player1Responded = false
                    games[gameIndex].player2Responded = false
                }
            }
        }
    }else{
        games[gameIndex].started = 1;
        const questions = await questionsController.getQuizQuestions()
        games[gameIndex].currentQuestion = 0
        games[gameIndex].questions = questions
        //console.log(JSON.stringify(game))
    }  
    res.json(games[gameIndex])
})

async function getPlayer(playerObj){
    var output = -1
    const now = new Date().getTime()
    await players.map((player, index) => {
        if(player.id === playerObj.id){
            player.updatedAt = now
            output = index
            return
        }   
    })
    if(output === -1){
        output = players.push({
            ...playerObj,
            updatedAt: new Date().getTime(),
            inGame: false,
        })
    }
    return output - 1
}

async function tooglePlayerInGameStatus(playerId){
    players.map(player => {
        if(player.id === playerId)
            player.inGame = !player.inGame
    })
}


async function getGame(playerId){
    var output = -1
    games.map((game, index) => {
        if((game.player_1!==null && game.player_1.id === playerId) || (game.player_2!==null && game.player_2.id === playerId)){
            output = index
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