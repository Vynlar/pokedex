import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import 'normalize.css';

import Pokedex from './Pokedex';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact component={Pokedex} />
                        <Route path="/page/:page" component={Pokedex} />
                        <Route path="/pokemon/:id" component={Pokedex} />
                    </Switch>
                </div>
            </Router>
        );
    }
}