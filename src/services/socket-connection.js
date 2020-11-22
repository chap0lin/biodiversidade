// import io from 'socket.io-client'

// export default class SocketConnection{
//     constructor(){
//         if(!!SocketConnection.instance){
//             return SocketConnection.instance
//         }
//         SocketConnection.instance = this
//         this.connection = io('ws://localhost:3333')
//     }
//     conn(){
//         return this.connection
//     }
// }

import React, {useContext, useEffect, useState} from 'react'
import io from 'socket.io-client'
const SocketContext = React.createContext()

export function useSocket(){
    return useContext(SocketContext)
}

export function SocketProvider({id, children}){
    const [socket, setSocket] = useState()
    useEffect(()=>{
        const newSocket = io(
            'http://localhost:3333'
        )
        setSocket(newSocket)
        return ()=>newSocket.close()
    }, [id])

    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}