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

var games = []
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

    socket.on('playerReady', ()=>{
        if(games.length===0){
            socket.join('game 1')
            games.push({
                player_1: getPlayerBySocketId(socket.id)
            })
        }else{
            var auxgames = []
            socket.join('game 1')
            games.map(game=>{
                auxgames.push({
                    player_2: getPlayerBySocketId(socket.id),
                    ...game
                })
            })
            games = auxgames
            io.to('game 1').emit('GameFound')
        }
    })

    socket.on('gameRequest', async()=>{
        if(gameStarted == 1){ // segunda requisicao recebida
            const questions = await questionsController.getQuizQuestions()
            console.log(JSON.stringify(questions))
            io.to('game 1').emit('GameStarted', {
                players: games[0],
                questions: questions
            })
        }else{
            gameStarted = 1;
        }
    })

    socket.on('playerResponded', message => {
        socket.to('game 1').emit('playerResponded', message)
        console.log(`${socket.id} responded wining ${message.points} points`)
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

function getPlayerBySocketId(id){
    players.map(player => {
        if(player.socketId === id){
            return player
        }
    })
}

server.listen(3333, ()=>{
    console.log('> Server listening on port: 3333')
})

// nova alternativa
// receber todos os eventos alterar e passar o objeto do jogo completo pros jogadores.