/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";
import './assets/css/style-custom.css';
import IsAuthenticated from "./services/authenticationService";
import { setUserState } from "./redux/action/userAction";

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
                {/* eslint-disable-next-line react/destructuring-assignment */}
                {IsAuthenticated(this.props.setUserState)
                    ? <Switch>
                        <Route path='/admin' component={Admin} />
                        <Route path='/auth' component={Auth} />
                        <Redirect from='/' to='/admin/index' />
                        {/* eslint-disable-next-line indent,react/jsx-closing-tag-location */}
                    </Switch>
                    : <Switch>
                        <Route path='/' component={Auth} />
                        {/* eslint-disable-next-line indent,react/jsx-closing-tag-location */}
                    </Switch>}
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => ({
    loader : state.system.loader,
});

export default connect(mapStateToProps, { setUserState })(App);
