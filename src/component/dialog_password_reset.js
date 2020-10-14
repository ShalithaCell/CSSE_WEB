import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { popupPasswordResetDialog, popupSpinner } from '../redux/systemActions';
import { resetUserPassword } from '../redux/userActions';

class PasswordResetDialog extends Component
{
	constructor(props) {
		super(props)
		this.state = { errorText: '', txtvalue: '' }
	}

	formClose = () => {
		this.props.popupPasswordResetDialog(false);
	}

	formSubmit = async (e) =>
	{
		//loader start
		this.props.popupSpinner(true);

		const valid = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.txtvalue);
		if (!valid)
		{
			this.setState({ errorText: 'Invalid email format' })
			return;
		}

		if (this.state.errorText.length != 0)
		{
			this.setState({ errorText: 'email is required' });
			return;
		}

		await this.props.resetUserPassword(this.state.txtvalue);

		this.props.popupSpinner(false);
		this.formClose();
	}

	onChange = (e) => {
		const valid = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(e.target.value);
		if (valid) {
			this.setState({ errorText: '' })
		} else {
			this.setState({ errorText: 'Invalid email format' })
		}
		
		this.setState({ txtvalue: e.target.value } );
	}

	render() {
		return (
    <div>

        <Dialog open={ this.props.forgotPwPop } aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the email address for your account. A password reset link will be sent to you. Once you have received the password reset link.
                    You will be able to choose a new password for your account. The link is valid for 10 minutes.
                </DialogContentText>
                <TextField
							autoFocus
							margin="dense"
							id="name"
							label="Email Address"
							type="email"
							fullWidth
							required
							error ={ this.state.errorText.length === 0 ? false : true }
							helperText={ this.state.errorText }
							onChange={ this.onChange.bind(this) }
						/>
            </DialogContent>
            <DialogActions>
                <Button id="btnClose" onClick={ this.formClose } color="primary">
                    Cancel
                </Button>
                <Button onClick={ this.formSubmit } color="primary">
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    </div>
		);
	}
}

const mapStateToProps = (state) => ({
	forgotPwPop : state.system.popupForgotpwDialog,
	loader      : state.system.loader
})

export default connect(mapStateToProps, { popupPasswordResetDialog, resetUserPassword, popupSpinner })(PasswordResetDialog);
