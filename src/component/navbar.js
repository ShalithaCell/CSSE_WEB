import React, { Component, Fragment } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { NavbarBrand } from 'reactstrap';
import NavItem from 'reactstrap/es/NavItem';
import { connect } from 'react-redux';
import { doLogOut } from '../redux/userActions';
import { DestroySession } from '../services/sessionManagement';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import IconButton from '@material-ui/core/IconButton/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import Dialog from '@material-ui/core/Dialog/Dialog';
import UserProfile from './user/userProfile';

class Navbar extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            showProfileDialog : false
        }
    }

    logout = (e) => {
        e.preventDefault();

        this.props.doLogOut();
        DestroySession();

        this.props.history.push('/');
        window.location.reload();
    }

    btnProfileDialog = (e) => {
        if(e.currentTarget.id === 'btnClose'){
            this.setState({
                showProfileDialog : false
            });
        }else{
            this.setState({
                showProfileDialog : true
            });
        }

    }

	render()
	{
		return (
    <header>
        <ul id="gn-menu" className="gn-menu-main">
            <li className="gn-trigger">
                <a className="gn-icon gn-icon-menu"><span>Menu</span></a>
                <nav className="gn-menu-wrapper">

                    <div className="gn-scroller">
                        <ul className="gn-menu">
                            <li className="gn-search-item">
                                <input placeholder="Search" type="search" className="gn-search"/>
                                <a className="gn-icon gn-icon-search"><span>Search</span>
                                </a>
                            </li>
                            <li>
                                <NavLink tag={ Link } className="gn-icon" to="/"><i className="fa fa-home" aria-hidden="true"/> Home</NavLink>
                                <NavLink tag={ Link } className="gn-icon" to="/users"><i className="fa fa-users" aria-hidden="true"/> Users</NavLink>
                                <NavLink tag={ Link } className="gn-icon" to="/organizations"><i className="fa fa-university" aria-hidden="true"/> Organizations</NavLink>
                                <NavLink tag={ Link } className="gn-icon" to="/suppliers"><i className="fa fa-address-card-o" aria-hidden="true"/> Suppliers</NavLink>
                            </li>

                        </ul>
                    </div>

                </nav>
            </li>
            <li>
                <NavbarBrand tag={ Link } to="/">WebPortal</NavbarBrand>
            </li>
            <Fragment>
                <NavItem>
                    <a href={ null } onClick={ this.btnProfileDialog.bind(this) } className="text-dark" to={ '/' } >Hello { this.props.items.userName }</a>
                </NavItem>
                <NavItem>
                    <a className="text-dark" onClick={ this.logout } >Logout</a>
                </NavItem>
            </Fragment>
        </ul>
        <Dialog open={ this.state.showProfileDialog } aria-labelledby="form-dialog-title" fullWidth={ true } maxWidth={ 'md' }>
            <DialogTitle disableTypography >
                <IconButton id="btnClose"  onClick={ this.btnProfileDialog.bind(this) } className={ 'pull-right' }>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <UserProfile />
            </DialogContent>
        </Dialog>
    </header>
		);
	}
}

const mapStateToProps = (state) => ({
    items       : state.user,
    permissions : state.system
})

export default withRouter(connect(mapStateToProps, { doLogOut })(Navbar));
