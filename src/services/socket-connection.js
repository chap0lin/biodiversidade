import io from 'socket.io-client'

export default class SocketConnection{
    constructor(){
        if(!!SocketConnection.instance){
            return SocketConnection.instance
        }
        SocketConnection.instance = this
        this.connection = io('ws://localhost:3333')
    }
    conn(){
        return this.connection
    }
}