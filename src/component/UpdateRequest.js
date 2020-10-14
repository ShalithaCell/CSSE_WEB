import React, { useState, useEffect } from 'react';
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
import Navbar from './navbar';
import { GetSession } from '../services/sessionManagement';
import { decrypt } from '../services/EncryptionService';
import axios from 'axios';
import { ADD_REQUEST } from '../config';
import { useDispatch } from 'react-redux';
import { REMOVE_REQUEST_ENDPOINT } from '../config';
import { getRequestInformation, updateRequest } from '../redux/requestActions';
import { connect } from 'react-redux';
import { ToastContainer } from './dialogs/ToastContainer';
import { TOAST_ERROR, TOAST_SUCCESS } from '../config';
function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://material-ui.com/">
              Your Website
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
    marginTop : theme.spacing(3)
  },
  submit : {
    margin : theme.spacing(3, 0, 2)
  }
}));
const initialFieldValues = {
	firstnameWarning   : '',
	lastNameWarning    : '',
	emailWarning       : '',
	addressWarning     : '',
  phoneNumberWarning : '',
  roleWarning        : '',
  passwordWarning    : ''

}

const RequestUpdate = ( props ) => {

	const classes = useStyles();
  const [ update, setupdate ] = useState({ 
    firstName   : props.location.state.firstName,
    lastName    : props.location.state.lastName, 
    email       : props.location.state.email,
    address     : props.location.state.address,
    phoneNumber : props.location.state.phoneNumber,
    role        : props.location.state.role, 
    id          : props.location.state.id });

	const UpdateRequest = () => {
    console.log();
    if (update.firstName.length === 0 || initialFieldValues.firstnameWarning .length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter First Name');
			return;
    }
    if (update.lastName.length === 0 || initialFieldValues.lastNameWarning.length !== 0)
		{
      ToastContainer(TOAST_ERROR, 'Please enter Last Name');
      return;
    }
    if (update.email.length === 0 || initialFieldValues.emailWarning .length !== 0)
		{
      ToastContainer(TOAST_ERROR, 'Please enter Email ');
    }
  
    if (update.address.length === 0 || initialFieldValues.addressWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Address');
			return;
    }
    	
    if (update.phoneNumber.length === 0 || initialFieldValues.phoneNumberWarning .length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Phone Number');
      return;
     }
    if (update.role.length === 0 || initialFieldValues.roleWarning .length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Role Name');
			return;
    }
    //if (add.remail.length !== /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test) {
    //  ToastContainer(TOAST_WARN, 'Please enter valid Email');
    //  return;
   // }
    if (update.phoneNumber.length !== 10)
		{
			ToastContainer(TOAST_WARN, 'Invalid TelePhone Number ');
			return;
    }   
		const requestView = {
			FirstName   : update.firstName,
      LastName    : update.lastName,
      Email       : update.email,
			Address     : update.address,
			PhoneNumber : update.phoneNumber,
			Role        : update.role,
			ID          : update.id
		};

		props.updateRequest(requestView);
		props.getRequestInformation();
	}

	const onChangeRequest = (e) =>
	{
		e.persist();
		setupdate({ ...update, [ e.target.name ]: e.target.value })

	}

	useEffect(() => {
		console.log(props.location.state);
		// props.updateBranch();
		// props.getBranchInformation();
		}, [ props.location.state ]);
   
  return (
      <Container component="main" maxWidth="xs">
          <Navbar/>
          <CssBaseline />
          <div className={ classes.paper }>
              <Avatar className={ classes.avatar }>
                  <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                  Update Employee
              </Typography>
              <div>
                  <Grid container spacing={ 2 }>
                      <Grid item xs={ 12 } sm={ 6 }>
                          <TextField
                autoComplete="firstName"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={ update.firstName }
                onChange={ onChangeRequest }
              />
                      </Grid>
                      <Grid item xs={ 12 } sm={ 6 }>
                          <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                value={ update.lastName }
                onChange={ onChangeRequest }
              />
                      </Grid>
                      <Grid item xs={ 12 }>
                          <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={ update.email }
                onChange={ onChangeRequest }
              />
                      </Grid>
                      <Grid item xs={ 12 }>
                
                      </Grid>
                      <Grid item xs={ 12 }>
                          <TextField
                variant="outlined"
                fullWidth
                name="address"
                label="Address"
                type="address"
                id="address"
                autoComplete="address"
                value={ update.address }
                onChange={ onChangeRequest }
              />
              
                      </Grid>
                      <Grid item xs={ 12 }>
                          <TextField
                variant="outlined"
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                type="Phone Number"
                id="phoneNumber"
                autoComplete="phoneNumber"
                value={ update.phoneNumber }
                onChange={ onChangeRequest }
              />
              
                      </Grid>
                      <Grid item xs={ 12 }>
                          <TextField
                variant="outlined"
                fullWidth
                name="role"
                label="Role"
                type="role"
                id="role"
                autoComplete="role"
                value={ update.role }
                onChange={ onChangeRequest }
              />
                      </Grid>
                     
                  </Grid>
                  <Button
            type="submit"
            maxWidth="50sp"
            variant="contained"
            color="primary"
            onClick={ UpdateRequest }
          >
                      UPDATE
                  </Button>
              
              </div>
          </div>
          
      </Container>
  );
}
const mapStateToProps = (state) => ({
	requestList : state.request.requestList
})
export default connect(mapStateToProps, { getRequestInformation, updateRequest })(RequestUpdate);
