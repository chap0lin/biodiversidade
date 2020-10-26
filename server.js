const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.Server(app)
const io = socketio(server)

app.use(express.static('build'))

server.listen(3000, ()=>{
    console.log('> Server listening on port: 3000')
})