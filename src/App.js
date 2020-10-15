/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";
import './assets/css/style-custom.css';

class App extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { };
    }

    render()
    {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/admin' component={Admin} />
                    <Route path='/auth' component={Auth} />
                    <Redirect from='/' to='/admin/index' />
                </Switch>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => ({
    loader : state.system.loader,
});

export default connect(mapStateToProps, null)(App);
