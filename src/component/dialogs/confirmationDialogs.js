import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { AddCircle } from '@material-ui/icons';
import CardContent from '@material-ui/core/CardContent';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Typography from '@material-ui/core/Typography';
import { confirmUserEmail, checkPasswordResetToken, resetPassword } from '../../redux/userActions';
import TextField from '@material-ui/core/TextField';
import { ToastContainer } from './ToastContainer';
import { TOAST_ERROR, TOAST_SUCCESS, TOAST_WARN } from '../../config';

const useStyles  = (theme) =>  ({
	root : {
		minWidth : 275
	},
	bullet : {
		display   : 'inline-block',
		margin    : '0 2px',
		transform : 'scale(0.8)'
	},
	title : {
		fontSize : 14
	},
	pos : {
		marginBottom : 12
	}
});

class ConfirmationDialogs extends Component{
	constructor(props)
	{
		super(props);
		this.state = {
			accountConfirmDialog   : true,
			passwordConfirmDialog  : false,
			userID                 : null,
			token                  : null,
			resetToken             : null,
			redirect               : false,
			notFound               : false,
			success                : false,
			password               : '',
			passwordWarning        : '',
			confirmPassword        : '',
			passwordConfirmWarning : ''
		}
	}

	GetUrlVars()
	{
		let vars = [], hash;
		const hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(let i = 0; i < hashes.length; i++)
		{
			hash = hashes[ i ].split('=');
			vars.push(hash[ 0 ]);
			vars[ hash[ 0 ] ] = hash[ 1 ];
		}
		return vars;
	}

	componentDidMount()
	{
		console.log(this.GetUrlVars());
		//for password reset
		const restToken = this.GetUrlVars()[ 'token' ] ? this.GetUrlVars()[ 'token' ] : null;

		//for account verification
		const userID = this.GetUrlVars()[ 'userId' ] ? this.GetUrlVars()[ 'userId' ] : null ;
		const token = this.GetUrlVars()[ 'code' ] ? this.GetUrlVars()[ 'code' ] : null;
		console.log(restToken);

		if(userID !== null && token !== null){
			this.setState({
				...this.state,
				accountConfirmDialog : true,
				userID               : userID,
				token                : token
			});

			this.EmailConfirmation(userID, token);

		}
		else if(restToken !== null){
			this.setState({
				...this.state,
				accountConfirmDialog  : false,
				passwordConfirmDialog : true,
				resetToken            : restToken
			});

			this.CheckPasswordResetToken(restToken);

		}else
		{
			this.setState({
				accountConfirmDialog  : false,
				passwordConfirmDialog : false,
				redirect              : true
			});
		}
	}

	async CheckPasswordResetToken(restToken){
		const result = await this.props.checkPasswordResetToken(restToken);

		if(result === 1){
			this.setState({
				notFound : false,
				success  : true
			});
		}else{
			this.setState({
				notFound : true,
				success  : false
			});
		}
	}

	async EmailConfirmation(userID, token)
	{
		const result = await this.props.confirmUserEmail(userID, token);

		if(result === 4){
			this.setState({
				notFound : true,
				success  : false
			});
		}else if(result.res){
			this.setState({
				notFound : false,
				success  : true
			});
		}else {
			this.setState({
				notFound : false,
				success  : false
			});
		}
	}
	
	textOnChange= (e) => {

		this.setState({
			...this.state,
			[ e.target.id ] : e.target.value
		});

		if(e.target.id === 'password'){
			//check password field is empty?
			if(e.target.value === ''){
				this.setState({
					passwordWarning : 'password cannot be empty.'
				});
				return;
			}

			//meter the password strength
			let strength = 1;
			const arr = [ /.{5,}/, /[a-z]+/, /[0-9]+/, /[A-Z]+/ ];
			jQuery.map(arr, function(regexp) {
				if(e.target.value.match(regexp))
					strength++;
			});

			//show the message
			switch (strength)
			{
				case 1:
					this.setState({
						passwordWarning : 'Your password will be brute-forced with an average home computer in approximately 1 second.'
					});
					return;
				case 2:
					this.setState({
						passwordWarning : 'Your password is very short. The longer a password is the more secure it will be'
					});
					return;
				case 3:
					this.setState({
						passwordWarning : 'Does not meet the minimum standards'
					});
					return;
				case 4:
					this.setState({
						passwordWarning : 'here are widely used combinations.Try more little bit'
					});
					return;
				case 5:
					this.setState({
						passwordWarning : ''
					});
					return;
			}
		}else if(e.target.id === 'confirmPassword'){
			//check password field is empty?
			if(e.target.value !== this.state.password){
				this.setState({
					passwordConfirmWarning : 'The password confirmation does not match.'
				});
			}else{
				this.setState({
					passwordConfirmWarning : ''
				});
			}
		}
	}

	BackToLogIn = (e) => {
		this.setState({
			redirect : true
		});

	}

	ResetPassword = () =>
	{
		if (this.state.passwordWarning.length !== 0)
		{
			return;
		}

		if (this.state.passwordConfirmWarning.length !== 0)
		{
			return;
		}

		if (this.state.password.length === 0 || this.state.confirmPassword.length === 0)
		{
			return;
		}

		this.doReset(this.state.resetToken, this.state.password);
	}
	
	async doReset(token, password)
	{
		const result = await this.props.resetPassword(token, password);

		if (result === 1)
		{
			ToastContainer(TOAST_SUCCESS, 'Password Reset Successfully !');
		}
		else if (result === 0)
		{
			ToastContainer(TOAST_WARN, 'Invalid token. Please try again');
		}
		else
		{
			ToastContainer(TOAST_ERROR, 'Token Expired ! Please try again or contact support!');
		}

		this.setState({
			redirect : true
		});
	}

	render()
	{
		const { classes  } = this.props;
		if (this.state.redirect) {
			return <Redirect push to="/login" />;
		}else if ( this.state.accountConfirmDialog ){
			return (
    <div>
        <div className={ 'top-5pres' }>
            <Container fixed>
                <Card className={ classes.root }>
                    <CardHeader
									title={ this.state.success ? 'Membership registration confirmed !' : 'Membership registration' }
									className={ 'text-center' }

								/>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.state.success ?
											'You have successfully verified your email and completed your account set-up.'
											:
											'Seems like Your Token is not valid. Contact your system administrator.'
										}
                        </Typography>
                        <Button id='btnLogIn' variant="contained" color="primary" onClick={ this.BackToLogIn }>
                            LOG IN
                        </Button>
                    </CardContent>

                </Card>
            </Container>
        </div>
    </div>
			);
		}
		else if(this.state.passwordConfirmDialog){
			return (
    <div>
        <div className={ 'top-5pres' }>
            <Container fixed>
                <Card className={ classes.root }>
                    <CardHeader
									title="Reset Your Password"
									className={ 'text-center' }

								/>
                    <CardContent>
                        {this.state.success ?
                            <div className="center-password">
                                <TextField id="password" label="Password" type="password" value={ this.state.password } autoComplete="current-password"
										   helperText={ this.state.passwordWarning }
										   onChange={ this.textOnChange }
										   error={ this.state.passwordWarning.length !== 0 }/>
                                <TextField id="confirmPassword" label="Re-Enter Password" type="password" value={ this.state.confirmPassword }
										   helperText={ this.state.passwordConfirmWarning }
										   onChange={ this.textOnChange }
										   error={ this.state.passwordConfirmWarning.length !== 0 }/>
                                <Button id='btnResetPassword' className="mt-2" variant="contained" color="primary" onClick={ this.ResetPassword }>
                                    RESET
                                </Button>
                            </div>
							:
                            <div>
                                <h4>Seems like Your Token is not valid or Expired.</h4>
                                <Button id='btnLogIn' variant="contained" color="primary" onClick={ this.BackToLogIn }>
                                    LOG IN
                                </Button>
                            </div>
							
						}

                    </CardContent>

                </Card>
            </Container>
        </div>
    </div>
			);
		}else {
			return <Redirect push to="/login" />;
		}
		
	}
}

ConfirmationDialogs.propTypes = {
	classes : PropTypes.object.isRequired
};

export default connect(null, { confirmUserEmail, checkPasswordResetToken, resetPassword } )(withStyles(useStyles)(ConfirmationDialogs));
