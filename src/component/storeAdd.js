import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import MuiAlert from '@material-ui/lab/Alert'
import Grid from '@material-ui/core/Grid';
import HouseTwoToneIcon from '@material-ui/icons/HouseTwoTone';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
//import { Copyright } from '@material-ui/icons';
import Navbar from './navbar';
import { GetSession } from '../services/sessionManagement';
import { decrypt } from '../services/EncryptionService';
import axios from 'axios';
import { ADD_BRANCH_ENDPOINT, TOAST_ERROR, TOAST_WARN } from '../config';
import { SET_SESSION_EXPIRED } from '../redux/actionTypes';
import { useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { ToastContainer } from './dialogs/ToastContainer';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TableRow from '@material-ui/core/TableRow';

function Copyright() {
	return (
    <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:3000/storeDashboard">
            Aplus Web
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root : {
		height : '100vh'
	},
	image : {
		backgroundImage  : 'url(https://www.netclipart.com/pp/m/8-83998_meeting-png-clipart-business-meeting-png-transparent.png)',
		backgroundRepeat : 'no-repeat',
		backgroundColor  :
			theme.palette.type === 'light' ? theme.palette.grey[ 50 ] : theme.palette.grey[ 900 ],
		backgroundSize     : 'cover',
		backgroundPosition : 'center'
	},
	paper : {
		margin        : theme.spacing(8, 4),
		display       : 'flex',
		flexDirection : 'column',
		alignItems    : 'center'
	},
	avatar : {
		margin          : theme.spacing(1),
		backgroundColor : theme.palette.info.main
	},
	form : {
		width     : '100%', // Fix IE 11 issue.
		marginTop : theme.spacing(5)
	},
	submit : {
		margin : theme.spacing(6, 0, 2)
	}
}));

const initialFieldValues = {
	branchnameWarning   : '',
	orgNameWarning      : '',
	locationWarning     : '',
	tpNoWarning         : '',
	locationError       : '',
	noofEmployeeWarning : '',
	emailWarning        : ''

}

function storeAdd() {

	// eslint-disable-next-line
	const dispatch = useDispatch();
	// eslint-disable-next-line
	const classes = useStyles();
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const history = useHistory();
	// eslint-disable-next-line
	const [ add, setadd ] = useState({ bName: '', orgName: '', location: '', tpNo: '', noofEmployees: '' });

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [ open, setOpen ] = React.useState(false);

	const storeRoute = () => {
		// eslint-disable-next-line no-use-before-define

		const path = 'storeDashboard';
		history.push(path);
	}
	const handleClickOpen = () =>
	{
		setOpen(true);
	};

	const handleClose = () =>
	{
		setOpen(false);
	};

	const onChange = (e) =>
	{

		e.persist();
		setadd({ ...add, [ e.target.name ]: e.target.value } );

	}

	async function Insertbranch(){

		if (add.bName.length === 0 || initialFieldValues.branchnameWarning.length !== 0 )
		{
			ToastContainer(TOAST_ERROR, 'Please enter Branch Name');
			return;
		}

		if (add.orgName.length === 0 || initialFieldValues.orgNameWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Organization Name');
			return;
		}
		if (add.location.length === 0 || initialFieldValues.locationWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Branch location');
			return;
		}

		if (add.tpNo.length === 0 || initialFieldValues.tpNoWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Branch TelePhone Number ');
			return;
		}

		if (add.tpNo.length !== 10)
		{
			ToastContainer(TOAST_WARN, 'Invalid TelePhone Number ');
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
				B_Name     : add.bName,
				Org_Name   : add.orgName,
				B_Location : add.location,
				B_Phone    : add.tpNo,
				B_Employee : add.noofEmployees
			}

			//API call
			await axios({
				method  : 'post',
				url     : ADD_BRANCH_ENDPOINT,
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
                <Grid container component="main" className={ classes.root }>

                    <CssBaseline />
                    <Grid item xs={ false } sm={ 10 } md={ 7 } className={ classes.image } />
                    <Grid item xs={ 12 } sm={ 10 } md={ 5 } component={ Paper } elevation={ 20 } square>
                        <div className={ classes.paper } >
                            <Avatar className={ classes.avatar }>
                                <HouseTwoToneIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Add New Branch
                            </Typography>
                            <div className={ classes.form } >

                                <TextField
							variant="outlined"
							margin="normal"
							fullWidth
							id="bName"
							label="Branch Name"
							name="bName"
							autoComplete="bName"
							required
							helperText={ initialFieldValues.branchnameWarning }
							error={ initialFieldValues.branchnameWarning.length !== 0 }
							onChange={ onChange }
							value={ add.bName }

						/>
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
							name="location"
							label="Location"
							type="location"
							id="location"
							onChange={ onChange }
							value={ add.location }

						/>
                                <TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="tpNo"
							label="Phone No"
							type="tpNo"
							id="tpNo"
							onChange={ onChange }
							value={ add.tpNo }
					/>

                                <TextField
						variant="outlined"
						margin="normal"
						fullWidth
						required
						name="noofEmployees"
						label="No of Employees"
						type="noofEmployees"
						id="noofEmployees"
						onChange={ onChange }
						value={ add.noofEmployees }
					/>

                                <Button
							type="submit"
							variant="contained"
							color="primary"
							className={ classes.submit }
							onClick={ Insertbranch }
						>
                                    Add Branch
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
                                <Box mt={ 4 }>
                                    <Copyright />
                                </Box>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    </div>
	);
}

export default storeAdd ;
