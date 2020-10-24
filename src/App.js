/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";
import './assets/css/style-custom.css';
import IsAuthenticated from "./services/AuthenticationService";
import { setUserState } from "./redux/action/UserAction";
import 'rsuite/dist/styles/rsuite-default.css';
import NewSupplierDialog from "./components/Dialogs/NewSupplierDialog";
import NewItemDialog from "./components/Dialogs/NewItemDialog";
import NewOrderDialog from "./components/Dialogs/NewOrderDialog";
import ViewOrderDialog from "./components/Dialogs/ViewOrderDialog";
import PaymentDialog from "./components/Dialogs/PaymentDialog";
import ErrorBoundary from "./components/ErrorBoundary";

/**
 * Application main entry point and the handling point
 */
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
                <ErrorBoundary>
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
                    <NewSupplierDialog />
                    <NewItemDialog />
                    <NewOrderDialog />
                    <ViewOrderDialog />
                    <PaymentDialog />
                </ErrorBoundary>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => ({
    loader : state.system.loader,
});

export default connect(mapStateToProps, { setUserState })(App);
