import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import { ToastContainer } from './dialogs/ToastContainer';
import { ADD_BRANCH_ENDPOINT, ADD_ORG_ENDPOINT, TOAST_ERROR } from '../config';
import { GetSession } from '../services/sessionManagement';
import { decrypt } from '../services/EncryptionService';
import axios from 'axios';
import { SET_SESSION_EXPIRED } from '../redux/actionTypes';
import Navbar from './navbar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { useHistory } from 'react-router-dom';

function Copyright() {
	return (
    <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
            A Plus
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper : {
		marginTop     : theme.spacing(8),
		display       : 'flex',
		flexDirection : 'column',
		alignItems    : 'center'
	},
	avatar : {
		margin          : theme.spacing(1),
		backgroundColor : theme.palette.secondary.main
	},
	form : {
		width     : '100%', // Fix IE 11 issue.
		marginTop : theme.spacing(1)
	},
	submit : {
		margin : theme.spacing(3, 0, 2)
	}
}));
const initialFieldValues = {
	orgLocationWarning : '',
	orgNameWarning     : ''
}

function addOrg () {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const classes = useStyles();
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const dispatch = useDispatch();
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [ add, setadd ] = useState({ orgName: '',  orgLocation: '' });
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [ open, setOpen ] = React.useState(false);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const history = useHistory();
	const handleClose = () =>
	{
		setOpen(false);
	};
	const handleClickOpen = () =>
	{
		setOpen(true);
	};
	const storeRoute = () => {
		// eslint-disable-next-line no-use-before-define

		const path = 'orgTable';
		history.push(path);
	}

	const onChange = (e) =>
	{
		e.persist();
		setadd({ ...add, [ e.target.name ]: e.target.value })

	}
	async function InsertOrg(){

		if (add.orgName.length === 0 || initialFieldValues.orgNameWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Organization Name');
			return;
		}
		if (add.orgLocation.length === 0 || initialFieldValues.orgLocationWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Organization Location');
			return;
		}
		const localData = JSON.parse(GetSession());
		let token = localData.sessionData.token;
		token = decrypt(token);

		//console.log('ABC');
		const success = false;
		let resData;

		console.log(token);

		const userObj = {

			Org_Name     : add.orgName,
			Org_Location : add.orgLocation
			
		}

		//API call
		await axios({
			method  : 'post',
			url     : ADD_ORG_ENDPOINT,
			headers : { Authorization: 'Bearer ' + token },
			data    : userObj
		})
			.then(function(response)
			{
				console.log('ok');

			})
			.catch(function(error)
			{
				if(error.response.status === 401){
					dispatch({
						type    : SET_SESSION_EXPIRED,
						payload : true
					});
				}
				throw error;
			});
		handleClickOpen();
	}
	return (
    <div>
        <Navbar/>
        <div className={ 'top-5pres' }>
            <Container fixed>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={ classes.paper }>
                        <Avatar className={ classes.avatar }>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Add Organization
                        </Typography>
                        <div className={ classes.form } >
                            <TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="orgName"
						label="Organization Name"
						name="orgName"
						autoComplete="orgName"
						onChange={ onChange }
						value={ add.orgName }

					/>
                            <TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="orgLocation"
						label="Organization Location"
						type="orgLocation"
						id="orgLocation"
						onChange={ onChange }
						value={ add.orgLocation }
					/>

                            <Button
						type="submit"
						variant="contained"
						color="primary"
						className={ classes.submit }
						onClick={ InsertOrg }
					>
                                Add
                            </Button>
                            <Dialog
								open={ open }
								onClose={ handleClose }
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
							>
                                <DialogTitle id="alert-dialog-title">{'Successfully Added'}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">

                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={ storeRoute } color="primary">
                                        OK
                                    </Button>
                                </DialogActions>
                            </Dialog>

                        </div>
                    </div>
                    <Box mt={ 8 }>
                        <Copyright />
                    </Box>
                </Container>
            </Container>
        </div>
    </div>
	);
}
export default addOrg ;