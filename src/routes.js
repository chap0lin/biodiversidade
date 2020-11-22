import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './pages/Login'
import Title from './pages/Title'
import Room from './pages/Room'
import Game from './pages/Game'
import { SocketProvider } from './services/socket-connection'


function Routes(){
    return(
        <SocketProvider id={0}>
            <BrowserRouter>
                <Route path="/" exact component={Login} />
                <Route path="/title" component={Title} />
                <Route path="/room" component={Room} />
                <Route path="/game" component={Game} />
            </BrowserRouter>
        </SocketProvider>
    )
}

export default Routes