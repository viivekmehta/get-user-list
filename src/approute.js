import React, { Component } from 'react';
import Update from './updateUser';
import Create from './createUser';
import GetUserByID from './getUserByID';
import Home from './home';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
class AppRoutes extends Component {
    render() {
        return (
            <Router>
                <Route exact path='/' component={Home} />
                <Route exact path='/home' component={Home} />
                <Route exact path='/update/:id/:firstName/:lastName/:email/:address'
                render = {props=>(
                    <Update {...props} />
                )} 
                />
                <Route path='/create' component={Create} />
                <Route path='/getUserByID' component={GetUserByID} />
            </Router >
        );
    }
}
export default AppRoutes;