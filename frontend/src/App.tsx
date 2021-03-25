import React, { FunctionComponent } from 'react'
import { Route, Switch } from 'react-router'
import { CreateRoom } from './pages/CreateRoom'
import { Game } from './pages/Game'
import { Home } from './pages/Home'

interface Props {}

export const App: FunctionComponent<Props> = props => {
    return (
        <Switch>
            <Route path='/room' exact>
                <Game />
            </Route>
            <Route path='/create-room' exact>
                <CreateRoom />
            </Route>
            <Route path='/' exact>
                <Home />
            </Route>
        </Switch>
    )
}
