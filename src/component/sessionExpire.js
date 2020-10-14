import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { doLogOut } from '../redux/userActions';
import { DestroySession } from '../services/sessionManagement';
import { SetSessionExpiredStatus } from '../redux/systemActions';
import imgExpire from  '../resources/images/session_expired.png';

class SessionExpire extends Component {

	redirectTologin = (e) => {
		this.props.doLogOut();
		DestroySession();

		this.props.SetSessionExpiredStatus(false);

		this.props.history.push('/');
		window.location.reload();
	}
	
	render()
	{
		return (
    <div>
        <Dialog
					open={ this.props.sessionExpired }
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
            <DialogTitle id="alert-dialog-title">{'Session Expired !'}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <img src={ imgExpire } alt="session_expired.png" className="session-expire-cls"/>
                    <br/>
                    Your session has expired please login again.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={ this.redirectTologin } color="primary" autoFocus>
                    LOGIN
                </Button>
            </DialogActions>
        </Dialog>
    </div>
		);
	}
}

const mapStateToProps = (state) => ({
	sessionExpired : state.system.sessionExpired
})

export default connect(mapStateToProps, { doLogOut, SetSessionExpiredStatus } )(withRouter(SessionExpire));
