import React from 'react'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'

import Login from './pages/Login'
import Title from './pages/Title'
import Room from './pages/Room'
import Game from './pages/Game'
import Training from './pages/Training'

function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/title" component={Title} />
            <Route path="/room" component={Room} />
            <Route path="/game" component={Game} />
            <Route path="/training" component={Training} />
            <Route render={()=> <Redirect to={{pathname:"/"}} />}/>
        </BrowserRouter>
    )
}

export default Routes