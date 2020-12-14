const express = require('express')
const cors = require('cors')

const routes = require('./routes')

const QuestionsController = require('./Controllers/QuestionsController')
const RankingController = require('./Controllers/RankingController')
const questionsController = new QuestionsController()
const rankingController = new RankingController()

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

    if(hasGamePendent!==-1){
        const a = await getPlayer(games[hasGamePendent].player_1, false)
        if(a>=0){
            console.log(`Ainda tem jogo disk: ${players[a].login}`)
        }else{
            //nao tem jogo
            games.splice(hasGamePendent-1,1)
            hasGamePendent = -1;
        }
        //const p = await 
        //console.log('player: ' + players[p].updatedAt)
    }

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
    //console.log(`[${user_object.login}] gi:${gameIndex} - ${gameIndex!==-1?JSON.stringify(games[gameIndex].generated):'nulo'}`)
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

        // verificar se o outro player saiu
        if(games[gameIndex].player_1.id === user_object.id){
            const a = await getPlayer(games[gameIndex].player_2, false)
            if(a>=0){ //jogador ainda está ativo na lista de players
                //console.log(`Ainda tem jogo disk: ${players[a].login}`)
            }else{ //senao ele saiu
                //nao tem jogo
                console.log('Game Ended')
                games[gameIndex].abandoned = true
                res.json(games[gameIndex])
                gameEnded(gameIndex, true)
            }
        }else{
            const a = await getPlayer(games[gameIndex].player_1, false)
            if(a>=0){ //jogador ainda está ativo na lista de players
                //console.log(`Ainda tem jogo disk: ${players[a].login}`)
            }else{ //senao ele saiu
                console.log('Game Ended')
                games[gameIndex].abandoned = true
                res.json(games[gameIndex])
                gameEnded(gameIndex, true)
            }
        }


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
                        gameEnded(gameIndex)
                        
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

    var updatedPlayers = []
    var now = new Date().getTime()
    players.map(player => {
        if( (now - player.updatedAt)<=5000){
            updatedPlayers.push(player)
        }
    })
    players = updatedPlayers
})

async function getPlayer(playerObj, update = true){
    var output = -1
   // console.log(`GetPlayer: [${playerObj.login}] - (${update})`)
    const now = new Date().getTime()
    await players.map((player, index) => {
        if(player.id === playerObj.id){
            if(update){
                player.updatedAt = now
                console.log(`UPDATED: [${player.login}] - ${player.updatedAt}`)
            }
            output = index
            return
        }   
    })
    if(update){
        if(output === -1){
            output = -1 + players.push({
                ...playerObj,
                updatedAt: new Date().getTime(),
                inGame: false,
            }) 
        }
    }else{
        console.log(`Checking [${playerObj.login}]`)
    }
    return output
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

function updatPlayerScore(id, points){
    var output = -1
    players.map((player, index) => {
        if(player.id === id){
            player.points_t+=points
            output = player.points_t
            return
        }   
    })
    return output
}

function gameEnded(gameIndex, gameFailed = false){
    //const today = new Date()
    // if(today.getUTCDate()===0){//check if is the first day of the week
        
    // }
    // if(today.getUTCDate()===0){//check if is the first day of the month

    // }

    if(!gameFailed){
        const p1 = updatPlayerScore(games[gameIndex].player_1.id, games[gameIndex].player1Points)
        const p2 = updatPlayerScore(games[gameIndex].player_2.id, games[gameIndex].player2Points)
        rankingController.updatePlayerPoints(games[gameIndex].player_1.id, p1)
        rankingController.updatePlayerPoints(games[gameIndex].player_2.id, p2)    
    }
    tooglePlayerInGameStatus(games[gameIndex].player_1.id)
    tooglePlayerInGameStatus(games[gameIndex].player_2.id)  
    games.splice(gameIndex, 1)
    
}

app.listen(3333, ()=>{
    console.log('> Server listening on port: 3333')
})