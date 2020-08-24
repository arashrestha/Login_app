import React from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import App from './App'
import Login from "./components/Login"

function Routes(props) {
    return (
        <HashRouter>
            <Switch>
                <Redirect exact from="/" to="/homepage" />
                <Route path='/login' render={(props) => <div><Login {...props} /></div>} />
                <Route path='/homepage' render={(props) => <div><App {...props} /></div>} />
            </Switch>
        </HashRouter>
    )

}



export default Routes