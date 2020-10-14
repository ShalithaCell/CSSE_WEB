import React, { Component } from 'react';
import '../../resources/styles/register.css';
import '../../resources/fonts/material-icon/css/material-design-iconic-font.min.css';
import imgLogo from '../../resources/images/signup-image.jpg'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateRoleDetails } from '../../redux/roleActions';
import { updateUsernameList } from '../../redux/systemActions';
import { createNewUser, getUser, updateUser } from '../../redux/userActions';
import { ToastContainer } from '../dialogs/ToastContainer';
import { TOAST_ERROR } from '../../config';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { updateUserList } from '../../redux/userActions';

class Register extends Component{

	constructor(props)
	{
		super(props);

		this.state = {
			email                  : '',
			emailWarning           : '',
			username               : '',
			usernameWarning        : '',
			role                   : '0',
			phone                  : '',
			password               : '',
			passwordConfirm        : '',
			passwordWarning        : '',
			passwordConfirmWarning : '',
			popupDialog            : false,
			checked                : false,
			editData               : null
		}
	}

	async componentDidMount()
	{
		this.props.updateRoleDetails(); //sync roles
		this.props.updateUsernameList(); //sync user's names

		if (this.props.editable)
		{
			const result = await this.props.getUser(this.props.userID);
			this.setState({
				...this.state,
				editData : result
			});

			this.setState({
				...this.state,
				email           : this.state.editData.email,
				emailWarning    : '',
				username        : this.state.editData.userName,
				usernameWarning : '',
				role            : this.state.editData.roleID,
				phone           : this.state.editData.phone,
				password        : '',
				passwordConfirm : ''
			});
		}

	}

	onTextChange = (e) => {

		this.setState({
			[ e.target.id ] : e.target.value
		});

		if(e.target.id === 'email'){

			this.setState({
				username : e.target.value
			});

			if(e.target.value === ''){
				this.setState({
					emailWarning : 'email address is required  !'
				});
				return;
			}

			let exists = false;

			this.props.usernames.map(function(item)
			{
				if(item.email.toLowerCase() === e.target.value.toLowerCase())
					exists = true;
			});

			if(exists){
				this.setState({
					emailWarning : 'email address is already in use'
				});
			}
			else if (/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(e.target.value))
			{
				this.setState({
					emailWarning : ''
				});
			}
			else{
				this.setState({
					emailWarning : 'email address is invalid !'
				});
			}
		}

		if(e.target.id === 'username'){
			if(e.target.value === ''){
				this.setState({
					usernameWarning : 'Username is required !'
				});
				return;
			}

			let exists = false;

			this.props.usernames.map(function(item)
			{
				if(item.userName.toLowerCase() === e.target.value.toLowerCase())
					exists = true;
			});

			if(exists){
				this.setState({
					usernameWarning : 'username is already taken'
				});
			}else{
				this.setState({
					usernameWarning : ''
				});
			}
		}

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

		}

		if(e.target.id === 'passwordConfirm')
		{
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

	onSelectChange = (e) => {
		this.setState({
			...this.state,
			role : e.target.value
		});
	}

	onSubmit = async (e) =>
	{
		e.preventDefault();
		if (this.state.role === '0')
		{
			ToastContainer(TOAST_ERROR, 'Please select a Role');
			return;
		}

		if (this.state.email.length === 0 || this.state.emailWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter valid Email address');
			return;
		}

		if (this.state.username.length === 0 || this.state.usernameWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter valid username');
			return;
		}

		if(this.props.editable ){
			if ((this.state.password.length !== 0 || this.state.passwordConfirm.length !== 0) && (this.state.passwordWarning.length !== 0 || this.state.passwordConfirmWarning.length !== 0))
			{
				ToastContainer(TOAST_ERROR, 'Please enter valid password');
				return;
			}
		}else{
			if (this.state.password.length === 0 || this.state.passwordConfirm.length === 0 || this.state.passwordWarning.length !== 0 || this.state.passwordConfirmWarning.length !== 0)
			{
				ToastContainer(TOAST_ERROR, 'Please enter valid password');
				return;
			}
		}

		if(!this.state.checked){
			ToastContainer(TOAST_ERROR, 'Please read and accept the terms and conditions to proceed with your account.');
			return;
		}

		//build the url
		const protocol = location.protocol;
		const slashes = protocol.concat('//');
		const host = slashes.concat(window.location.host);

		let result;

		if(!this.props.editable){
			const userObj = {
				Email       : this.state.email,
				Password    : this.state.password,
				RoleID      : this.state.role,
				UserName    : this.state.username,
				PhoneNumber : this.state.phone,
				OrgID       : this.props.currentUser.orgID,
				BaseUrl     : host
			};

			result = await this.props.createNewUser(userObj);
		}else{
			const userObj = {
				Email       : this.state.email,
				Password    : this.state.password,
				RoleID      : this.state.role,
				PhoneNumber : this.state.phone
			};

			result = await this.props.updateUser(userObj);
		}

		if(result.result === true){

			if(!this.props.editable){
				this.setState({
					popupDialog : true
				});
			}

			//update users
			this.props.updateUserList(this.props.currentUser.roleID);

			//close the registration dialog
			this.props.dialogClose();

		}else {
			//something went wrong
			ToastContainer(TOAST_ERROR, result.message.toString());
		}
		
	}

	dialogClose= () => {
		this.setState({
			popupDialog : false
		});
	}

	onCheckedChange = (e) => {
		this.setState({ checked: e.target.checked });
	}

	render()
	{
		return (
    <div>
        <section className="signup">
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form"><h2 className="form-title">{ !this.props.editable ? 'Sign up' : 'Edit User' }</h2>
                        <form method="POST" className="register-form" id="register-form">
                            <div className="form-group">
                                <TextField type="email" id="email" label="E-mail" onChange={ this.onTextChange } value={ this.state.email } helperText={ this.state.emailWarning }
										   error={ this.state.emailWarning.length !== 0 } disabled={ this.props.editable } required/>
                            </div>
                            <div className="form-group">
                                <TextField type="text" id="username" label="Username" value={ this.state.username } onChange={ this.onTextChange }
										   error={ this.state.usernameWarning.length !== 0 }
										   helperText={ this.state.usernameWarning }
										   autoComplete={ false }
										   disabled
										   required/>
                            </div>
                            <div className="form-group">
                                <InputLabel className="combo-style" id="demo-simple-select-helper-label">Role</InputLabel>
                                <Select
									labelId="demo-simple-select-helper-label"
									className="combo-style"
									id="role"
									value={ this.state.role }
									onChange={ this.onSelectChange }>
                                    <MenuItem value="0">
                                        <em>Select role</em>
                                    </MenuItem>
                                    {
                                    	//check the current user role and filter the roles that he can select
										this.props.roles.roleList.map((item) => {

											if ( item.id >= this.props.currentUser.roleID ){
												return <MenuItem key={ item.id } value={ item.id }>{ item.roleDisplayName }</MenuItem>
											}

										})
									}

                                </Select>
                            </div>
                            <div className="form-group">
                                <TextField id="phone" value={ this.state.phone } label="Phone" onChange={ this.onTextChange } type="tel" />
                            </div>
                            <div className="form-group">
                                <TextField id="password" value={ this.state.password } label="Password" onChange={ this.onTextChange } type="password"
										   helperText={ this.state.passwordWarning }
										   error={ this.state.passwordWarning.length !== 0 }
										   required/>
                            </div>
                            <div className="form-group">
                                <TextField id="passwordConfirm" value={ this.state.passwordConfirm } label="Re-Enter Password" onChange={ this.onTextChange } type="password"
										   helperText={ this.state.passwordConfirmWarning }
										   error={ this.state.passwordConfirmWarning.length !== 0 }
										   required/>
                            </div>

                            <div className="form-group">
                                <Checkbox
								icon={ <CheckBoxOutlineBlankIcon fontSize="small" /> }
								checkedIcon={ <CheckBoxIcon fontSize="small" /> }
								name="agree-term"
								value={ this.state.checked }
								onChange={ this.onCheckedChange }
							/> <label htmlFor="agree-term" className="label-agree-term"><span><span/></span>I agree all statements in <a href="#" className="term-service">Terms of
    service</a></label></div>
                            <div className="form-group form-button"><input type="submit" name="signup" id="signup"
																			   className="form-submit pull-right"
																		   onClick={ this.onSubmit }
																			   value="Register"/></div>
                        </form>
                    </div>
                    <div className="signup-image">
                        <figure><img src={ imgLogo } alt="sing up image"/></figure>
                        <NavLink tag={ Link } className="signup-image-link" to="/counter">I am already member</NavLink>
                    </div>
                </div>
            </div>
        </section>
        <Dialog
			open={ this.state.popupDialog }
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{ 'Registration Success' }</DialogTitle>
            <DialogContent>
                <div className="row">
                    <br/>
                    <h6>Congratulation! Welcome to APlus user. Your personal activation code has been sent to your Email address.</h6>
                </div>

            </DialogContent>
            <DialogActions>
                <Button id={ 'btnOk' } onClick={ this.dialogClose } color="secondary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    </div>
		);
	}
}
const mapStateToProps = (state) => ({
	roles       : state.role,
	currentUser : state.user,
	usernames   : state.system.userNameList
})

export default connect(mapStateToProps, { updateRoleDetails, updateUsernameList, createNewUser, updateUserList, getUser, updateUser } )(Register);
