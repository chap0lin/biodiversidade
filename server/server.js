const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')
const routes = require('./routes')

const app = express()
const server = http.Server(app)
const io = socketio(server)

app.use(express.json());

app.use(express.static(path.resolve(__dirname, '..','build')))
app.use(routes)

server.listen(3000, ()=>{
    console.log('> Server listening on port: 3000')
})