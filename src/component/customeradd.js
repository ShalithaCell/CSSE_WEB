import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import HouseTwoToneIcon from '@material-ui/icons/HouseTwoTone';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Copyright } from '@material-ui/icons';
import Navbar from './navbar';
import { GetSession } from '../services/sessionManagement';
import { decrypt } from '../services/EncryptionService';
import axios from 'axios';
import { ADD_CUSTOMER, TOAST_ERROR } from '../config';
import { SET_SESSION_EXPIRED } from '../redux/actionTypes';
import { useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import { Background } from 'devextreme-react/range-selector';
import { ToastContainer } from './dialogs/ToastContainer';
import {  TOAST_WARN, TOAST_SUCCESS } from '../config';

const useStyles = makeStyles((theme) => ({
	root : {
		height : '100vh'

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
		marginTop : theme.spacing(1)
	},
	submit : {
		margin : theme.spacing(6, 0, 2)
	}
}));
const initialFieldValues = {
	firstnameWarning   : '',
	lastnameWarning    : '',
	emailWarning       : '',
	nicWarning         : '',
  	phonenumberWarning : ''
}
export default function Customeradd() {

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const dispatch = useDispatch();
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const classes = useStyles();
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [ add, setadd ] = useState({ cfName: '', clName: '', cemail: '', cidnumber: '', cphonenumber: '' });

	const onChange = (e) =>
	{
		e.persist();
		setadd({ ...add, [ e.target.name ]: e.target.value })
	}

	async function Insertcustomer(){
  
    if (add.cfName.length === 0 || initialFieldValues.firstnameWarning .length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter First Name');
			return;
    }
    if (add.clName.length === 0 || initialFieldValues.lastnameWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Last Name');
			return;
    }
    if (add.cemail.length === 0 || initialFieldValues.emailWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter E-Mail');
			return;
    }
    if (add.cidnumber.length === 0 || initialFieldValues.nicWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter NIC Number');
			return;
    }
    if (add.cphonenumber.length === 0 || initialFieldValues.phonenumberWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter  Phone Number');
			return;
	}
	if (add.cphonenumber.length !== 10)
	{
		ToastContainer(TOAST_WARN, 'Invalid Phone Number ');
		return;
	}
	if (add.cidnumber.length !== 9)
	{
		ToastContainer(TOAST_WARN, 'Invalid NIC Number ');
		return;
	}

			const localData = JSON.parse(GetSession());
			let token = localData.sessionData.token;
			token = decrypt(token);

			ToastContainer(TOAST_SUCCESS, "Customer Added Successfully")

			console.log('ABC');
			const success = false;
			let resData;

			console.log(token);

			const customerObj = {
				Fname        : add.cfName,
				Lname        : add.clName,
				Email        : add.cemail,
				// eslint-disable-next-line camelcase
				Id_number    : add.cidnumber,
				// eslint-disable-next-line camelcase
				Phone_number : add.cphonenumber
			}
			console.log(customerObj);

			//API call
			await axios({
				method  : 'post',
				url     : ADD_CUSTOMER,
				headers : { Authorization: 'Bearer ' + token },
				data    : customerObj 
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
			
	}

	return (
    <Container component="main" maxWidth="xs">
        <Navbar/>
        <CssBaseline />
        
        <div className={ classes.paper }>
            <Avatar className={ classes.avatar }>
                <HouseTwoToneIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                ADD CUSTOMER 
            </Typography>
            <div className={ classes.form } >
                <Grid container spacing={ 2 }>
                    <Grid item xs={ 12 } >
						
                        <TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="fname"
							label="Frist Name"
							name="cfName"
							autoComplete="fName"
							onChange={ onChange }
							value={ add.cfName }

						/></Grid>
                    <Grid item xs={ 12 } >
                        <TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="lname"
						label="Last Name"
						name="clName"
						autoComplete="lname"
						onChange={ onChange }
						value={ add.clName }

					/></Grid>
                    <Grid item xs={ 12 } >
                        <TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="cemail"
							label="E_MAIL"
							type="email"
							id="email"
							onChange={ onChange }
							value={ add.cemail }

						/></Grid>
                    <Grid item xs={ 12 } >
                        <TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="cidnumber"
							label="ID Number"
							type="id"
							id="id"
							onChange={ onChange }
							value={ add.cidnumber }
					/></Grid>
                    <Grid item xs={ 12 } >
                        <TextField
						variant="outlined"
						margin="normal"
						fullWidth
						name="cphonenumber"
						label="Phone Number"
						type="phoneno"
						id="phoneno"
						onChange={ onChange }
						value={ add.cphonenumber }
					/>
                    </Grid>
                </Grid>
                <Button
							variant="contained"
							color="primary"
							onClick={ Insertcustomer }
						>
                    Add Customer
                </Button>

                <Box mt={ 8 }>
                    <Copyright />
                </Box>
            </div>
        </div>
        
    </Container>
	);
}
