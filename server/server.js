const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')
const routes = require('./routes')
const cors = require('cors')
const QuestionsController = require('./Controllers/QuestionsController')
const questionsController = new QuestionsController()


const app = express()
const server = http.Server(app)
const io = socketio(server)
app.use(cors())
app.use(express.json());

//app.use(express.static(path.resolve(__dirname, '..','build')))
app.use(routes)

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

var players = []

var game = {
    player_1: null,
    player_2: null,
    questions: null,
    player1Responded: false,
    player2Responded: false,
    player1Points: 0,
    player2Points: 0
}
var gameStarted = 0

io.on('connection', (socket) => {
    //socket.emit('titleMessage', titleObject)//to user
    console.log(`[${socket.id}] just joined the aplication`)
    //socket.broadcast.emit()//to all - the specific user
    socket.broadcast.emit('message', 'A user has join the aplication')
    //io.emit()//to all
    socket.on('titleRequest', message=>{
        if(message!={}){
            players.push({
                socketId: socket.id,
                ...message
            })
            console.log(`New player: ${message.login}`)
        }
        socket.emit('titleMessage', titleObject)
        console.log(`[${socket.id}]: requested TitleObject`)
    })

    socket.on('roomRequest', message=>{
        socket.emit('roomMessage', {
            id: 1,
            name: 'Sala Geral 1',
            players
        })
    })

    socket.on('enterRoom', message => {
        socket.join(`room 1`)
        titleObject.rooms[0].n_players+=1
        titleObject.rooms[0].players.push(getPlayerBySocketId(socket.id))
        console.log(`[${socket.id}] just joined the room: ${message.roomId}`)
        io.to('room 1').emit('message', 'Messagem para room 1')
    })

    socket.on('playerReady', async()=>{
        console.log('received playerReady')
        if(game.player_1===null){
            socket.join('game 1')
            game.player_1 = await getPlayerBySocketId(socket.id)
            //console.log('1:' + JSON.stringify(game.player_1))
        }else{
            socket.join('game 1')
            game.player_2 = await getPlayerBySocketId(socket.id)
            //console.log('2:' + JSON.stringify(game))
            io.to('game 1').emit('GameFound')
        }
    })

    socket.on('gameRequest', async()=>{
        if(gameStarted == 1){ // segunda requisicao recebida
            const questions = await questionsController.getQuizQuestions()
            //console.log(JSON.stringify(questions))
            game.currentQuestion = 0
            game.questions = questions
            io.to('game 1').emit('GameStarted', game)
        }else{
            gameStarted = 1;
        }
    })

    socket.on('playerResponded', message => {
        console.log(`${socket.id} responded wining ${message.points} points`)
        if(game.player_1.socketId === socket.id){
            game.player1Responded = true
            game.player1Points = message.points
        }else{
            game.player2Responded = true
            game.player2Points = message.points
        }
        socket.to('game 1').emit('playerResponded', game)
        if(game.player1Responded && game.player2Responded){
            console.log('Both Responded, starting 2s delay')
            setTimeout(()=>{
                console.log('2s later, sending message to next round')
                io.to('game 1').emit('NextRound', game)
            }, 
            2000)
        }
        
    })

    socket.on('disconnect', ()=>{
        io.emit('message', 'a user has left the aplication')
        var auxPlayers = []
        players.map(player=>{
            if(player.socketId !== socket.id){
                auxPlayers.push(player)
            }
        })
        players = auxPlayers
        console.log(`[${socket.id}] just left the aplication`)
    })
})

async function getPlayerBySocketId(id){
    //console.log('chamou funcao')
    var output
    players.map(player => {
        if(player.socketId === id){
            //console.log('GetPlayer: ' + JSON.stringify(player))
            output = player
            return
        }
    })
    return output
}

server.listen(3333, ()=>{
    console.log('> Server listening on port: 3333')
})

// nova alternativa
// receber todos os eventos alterar e passar o objeto do jogo completo pros jogadores.