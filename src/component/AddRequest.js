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
import { Aggregation } from 'devextreme-react/chart';
import { GetSession } from '../services/sessionManagement';
import { decrypt } from '../services/EncryptionService';
import axios from 'axios';
import { ADD_REQUEST, TOAST_ERROR, TOAST_WARN } from '../config';
import { useDispatch } from 'react-redux';
import { ToastContainer } from './dialogs/ToastContainer';
import {  TOAST_SUCCESS } from '../config';
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

export default function AddRequest() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [ add, setadd ] = useState( { fname: '', lname: '', remail: '', rAddress: '', rPhonenumber: '', arole: '',  rpassword: '', rConfimpassword: '' });
 
  const onChangeAddRequest = (event) => {
    event.persist();
    setadd({ ...add, [ event.target.name ]: event.target.value });

     };
     
  async function AddRequests()
  {
    if (add.fname.length === 0 || initialFieldValues.firstnameWarning .length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter First Name');
			return;
    }
    if (add.lname.length === 0 || initialFieldValues.lastNameWarning.length !== 0)
		{
      ToastContainer(TOAST_ERROR, 'Please enter Last Name');
      return;
    }
    if (add.remail.length === 0 || initialFieldValues.emailWarning .length !== 0)
		{
      ToastContainer(TOAST_ERROR, 'Please enter Email ');
    }
  	
    if (add.rAddress.length === 0 || initialFieldValues.addressWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Address');
			return;
    }
    	
    if (add.rPhonenumber.length === 0 || initialFieldValues.phoneNumberWarning .length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Phone Number');
      return;
     }
    if (add.arole.length === 0 || initialFieldValues.roleWarning .length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Role Name');
			return;
    }
   
    if (add.rPhonenumber.length !== 10)
		{
			ToastContainer(TOAST_WARN, 'Invalid TelePhone Number ');
			return;
    }
  
      const localData = JSON.parse(GetSession());
      let token = localData.sessionData.token;
      token = decrypt(token);
      ToastContainer(TOAST_SUCCESS, "Successfully Added Request")

      //console.log('ABC');
      let success = false;
      let resData;

      console.log(token);

      const userObj = {
        fname   : add.fname,
        lname   : add.lname,
        email   : add.remail,
        address : add.rAddress,
        phoneno : add.rPhonenumber,
        role    : add.arole
       
      }
      //API call
      await axios({
        method  : 'post',
        url     : ADD_REQUEST,
        headers : { Authorization: 'Bearer ' + token },
        data    : userObj
    })
        .then(function(response)
        {
            console.log("ok");
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
                  <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                  New Employee
              </Typography>
              <div className={ classes.form } Validate>
                  <Grid container spacing={ 2 }>
                      <Grid item xs={ 12 } sm={ 6 }>
                          <TextField
                autoComplete="fname"
                name="fname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={ add.fname }
                onChange={ onChangeAddRequest }
              />
                      </Grid>
                      <Grid item xs={ 12 } sm={ 6 }>
                          <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lname"
                autoComplete="lname"
                value={ add.lname }
                onChange={ onChangeAddRequest }
              />
                      </Grid>
                      <Grid item xs={ 12 }>
                          <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email "
                name="remail"
                autoComplete="email"
                type="email"
                value={ add.remail }
                onChange={ onChangeAddRequest }
              /> 
                      </Grid>
                      <Grid item xs={ 12 }>
                          <TextField
                variant="outlined"
                required
                fullWidth
                name="rAddress"
                label="Address"
                type="Address"
                id="Address"
                autoComplete="Address"
                value={ add.rAddress }
                onChange={ onChangeAddRequest }
              />
              
                      </Grid>
                      <Grid item xs={ 12 }>
                          <TextField
                variant="outlined"
                required
                fullWidth
                name="rPhonenumber"
                label="Phone Number"
                type="Phone Number"
                id="Phone Number"
                autoComplete="Phone Number"
                value={ add.rPhonenumber }
                onChange={ onChangeAddRequest }
              />
              
                      </Grid>
                      <Grid item xs={ 12 }>
                          <TextField
                variant="outlined"
                required
                fullWidth
                name="arole"
                label="Role"
                type="Role"
                id="Role"
                autoComplete="Role"
                value={ add.arole }
                onChange={ onChangeAddRequest }
              />
                      </Grid>
                  </Grid>
                  <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={ classes.submit }
            onClick={ AddRequests }
          >
                      ADD
                  </Button>
                 
              </div>
          </div>
          
      </Container>
  );
  }
