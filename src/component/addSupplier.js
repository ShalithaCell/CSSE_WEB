import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Navbar from './navbar';
import { useDispatch } from 'react-redux';
import { GetSession } from '../services/sessionManagement';
import { decrypt } from '../services/EncryptionService';
import axios from 'axios';
import { ADD_SUPPLIER_ENDPOINT, TOAST_SUCCESS } from '../config';
import { SET_SESSION_EXPIRED } from '../redux/actionTypes';
import { ToastContainer } from './dialogs/ToastContainer';

function Copyright() {
  return (
      <Typography variant ="body2" color ="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="">
              A Plus
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
      </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper : { 
    marginTop : theme.spacing(8), 

    display : 'flex',

    flexDirection : 'column',

    alignItems : 'center'
  },
  avatar : {    
    margin : theme.spacing(1),

    backgroundColor : theme.palette.secondary.main
  },
  form : {
    width : '100%', // Fix IE 11 issue.

    marginTop : theme.spacing(3)
  },
  submit : {
    margin : theme.spacing(3, 0, 2)
  }
}));

export default function AddSupplier() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [ add, addSup ] = useState({ firstName: '', lastName: '', email: '', category: '', Area: '', PhoneNumber: '' })

  const  onsupplierchange = (e) => {
      e.persist();
      addSup( { ...add, [ e.target.name ]: e.target.value });
  };

  async function InsertSupplier()
  {
      const localData = JSON.parse(GetSession());
      let token = localData.sessionData.token;
      token = decrypt(token); //decrypt the token
      ToastContainer(TOAST_SUCCESS, "Successfully Added Supplier")

      const success = false;
      let resData;

      console.log(token)

      const supplierObj = {
          Finame    : add.firstName,
          Laname    : add.lastName,
          email     : add.email,
          CAtegory  : add.category,
          ARea      : add.Area,
          PHoNumber : add.PhoneNumber
      }

      //API call
      await axios({
          method  : 'post',
          url     : ADD_SUPPLIER_ENDPOINT,
          headers : { Authorization: 'Bearer ' + token },
          data    : supplierObj
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
                  })
              }
              throw error;
          });
  }

  return (
      <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Navbar />
          <div className={ classes.paper }>
              <Avatar className={ classes.avatar }>
                  <PersonAddIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                  Add Supplier
              </Typography>
              <form className={ classes.form } Validate>
                  <Grid container spacing={ 2 }>
                      <Grid item xs={ 12 } sm={ 6 }>
                          <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={ add.firstName }
                onChange={ onsupplierchange }
                autoFocus
              />
                      </Grid>
                      <Grid item xs={ 12 } sm={ 6 }>
                          <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={ add.lastName }
                onChange={ onsupplierchange }
                autoComplete="lname"
              />
                      </Grid>
                      <Grid item xs={ 12 }>
                          <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={ add.email }
                onChange={ onsupplierchange }
                autoComplete="email"
              />
                      </Grid>
                      <Grid item xs={ 12 }>
                          <TextField
                variant="outlined"
                required
                fullWidth
                name="category"
                label="category"
                type="category"
                id="category"
                value={ add.category }
                onChange={ onsupplierchange }
              />
                      </Grid>
                      <Grid item xs={ 12 }>
                          <TextField
                variant="outlined"
                required
                fullWidth
                name="Area"
                label="Area"
                type="Area"
                id="Area"
                value={ add.Area }
                onChange={ onsupplierchange }
              />
                      </Grid>
                      <Grid item xs={ 12 }>
                          <TextField
                variant="outlined"
                required
                fullWidth
                name="PhoneNumber"
                label="Phone Number"
                type="Phone Number"
                id="Phone Number"
                value={ add.PhoneNumber }
                onChange={ onsupplierchange }
              />
                      </Grid>
                  </Grid>
                  <Button
            type="submit"
            variant="contained"
            color="primary"
            className={ classes.submit }
            onClick={ InsertSupplier }
          >
                      Add Supplier
                  </Button>
                  <Grid container justify="flex-end">
                      <Grid item>
                      </Grid>
                  </Grid>
              </form>
          </div>
          <Box mt={ 5 }>
              <Copyright />
          </Box>
      </Container>
  );
}
