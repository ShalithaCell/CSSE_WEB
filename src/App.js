import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import logo from './logo.svg';
import { connect } from 'react-redux';
import { setUserState } from './redux/userActions';
import { IsAuthenticated } from './services/authenticationService';
import Loader from 'react-loader-spinner'
import './App.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import home from './component/home'
import login from './component/login'
import Register from './component/user/register';
import RegisterRole from './component/role/registerRole';
import SessionExpire from './component/sessionExpire';
import listOfRoles from './component/role/listOfRoles';
import listOfUsers from './component/user/listOfUsers';
import { ToastContainer } from 'react-toastify';
import ConfirmationDialogs from './component/dialogs/confirmationDialogs';
import UserProfile from './component/user/userProfile';
import ListOfSuppliers from './component/supplier/listOfSuppliers';
import ListOfOrganizations from './component/organizations/listOfOrganizations';

class App extends Component {

	constructor(props) {
		super(props)
		this.state = { auth: false }
	}

	render(){
		return (
    <BrowserRouter>
        <div className="App">
            { IsAuthenticated(this.props.setUserState) ?
                <Switch>
                    <Route exact path='/login' component={ login } />
                    <Route exact path='/' component={ home } />
                    <Route exact path='/home' component={ home }/>
                    <Route exact path='/register' component={ Register }/>
                    <Route exact path='/registerRole' component={ RegisterRole }/>
                    <Route exact path='/roles' component={ listOfRoles }/>
                    <Route exact path='/users' component={ listOfUsers } />
                    <Route exact path='/confirm' component={ ConfirmationDialogs } />
                    <Route exact path='/userProfile' component={ UserProfile } />
                    <Route exact path='/suppliers' component={ ListOfSuppliers } />
                    <Route exact path='/organizations' component={ ListOfOrganizations } />
                </Switch>
						:
                <Switch>
                    <Route exact path='/confirm' component={ ConfirmationDialogs } />
                    <Route component={ login } />
                </Switch>
					}
            {this.props.loader ?
                <div className="to-center">
                    <Loader
								type="Triangle"
								color="#00BFFF"
								height={ 200 }
								width={ 200 }
								visible={ true }
							/>
                </div>
						:
                <div></div>
					}
            <SessionExpire />
            <ToastContainer />
        </div>
    </BrowserRouter>
		);
	}
}

const mapStateToProps = (state) => ({
	loader : state.system.loader
})

export default connect(mapStateToProps, { setUserState })(App);
