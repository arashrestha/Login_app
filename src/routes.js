import React from 'react'
import { HashRouter, Route, Switch } from "react-router-dom";
import App from './App'
import Login from "./components/Login"

const Routes = (props) => {
    return (
        <HashRouter>
            <Switch>
                <Route path='/login' render={(props) => <div><Login {...props} /></div>} />
                <Route path='/' render={(props) => <div><App {...props} /></div>} />
            </Switch>
        </HashRouter>
    )

}



export default Routes