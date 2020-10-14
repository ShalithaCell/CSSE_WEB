import React from 'react';
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
import Navbar from '../navbar';
import { useState, useEffect } from 'react';
import { addTrans } from '../../redux/transactionActions'
import { useDispatch } from 'react-redux'
import { GetSession } from '../../services/sessionManagement';
import { decrypt } from '../../services/EncryptionService';
import axios from 'axios';
import { ADD_TRANSACTION_ENDPOINT } from '../../config';
import { SET_SESSION_EXPIRED } from '../../redux/actionTypes';
import { connect } from 'react-redux';
import { transactionReducer } from '../../redux/reducers/transactionReducer';
import withStyles from '@material-ui/core/styles/withStyles';
import { useToasts } from 'react-toast-notifications';
import { ToastContainer } from '../../component/dialogs/ToastContainer';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { useHistory } from 'react-router-dom';

function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://material-ui.com/">
              Aplus 
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
  form : {
    width     : '100%', // Fix IE 11 issue.
    marginTop : theme.spacing(3)
  },
  submit : {
    margin : theme.spacing(1, 0, 1)
  },
  table : {
    width      : '100%',
    paddingTop : '2%',
    padding    : '5%' 
  }
}));

///////////////////////////////////////

const initialValues ={
  description : '',
  userid      : '',
  qty         : '0', 
  unit        : '0',
  total       : '0'
}

const AddTransaction = ({ ...props }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [ values, setvalues ] = useState (initialValues) 
  const [ errors, seterrors ] = useState({})

  const transObj = {
    Description : values.description,
    User_ID     : values.userid,
    Quantity    : values.qty,
    Unit_price  : values.unit,
    Total       : values.total
  }
  const validate = (fieldValues = values) => {
    const temp = {}
    temp.description = fieldValues.description?'':'This field is required.'
    temp.userid = fieldValues.userid?'':'This field is required.'
    temp.total = fieldValues.total?'':'This field is required.'
    seterrors({
      ...temp
    })
if(fieldValues == values)
    { return Object.values(temp).every((x) => x == '') }
  }

  const OnChange = (e) => {
    e.persist();
     const { name, value } = e.target
    const fieldValue = { [ name ]: value }
    setvalues({ ...values, ...fieldValue
       
      })
    validate(fieldValue)
  }

  const handleClick = (e) => {
    e.preventDefault()
    // props.addTrans(userObj);
    props.addTrans(values);
    console.log(values) ;
    if(validate()){
      window.alert('Validation Succeeded.')
    }
    
  }

  return (
      <Container component="main" maxWidth="xs">
          <Navbar/>
          <Container maxWidth="xs" >
              // eslint-disable-next-line react/jsx-indent
              <Typography component="div" className={ classes.table } />
              <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <div className={ classes.paper }>
                      <Typography component="h1" variant="h5">
                          Add Transaction
                      </Typography>
                      <div className={ classes.form } noValidate onSubmit={ handleClick }>
                          <Grid container spacing={ 2 }>
                             
                              <Grid container spacing={ 2 }>
                                  { <Grid item xs={ 12 } sm={ 6 }>
                                      { <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                value = { values.description }
                onChange = { OnChange }
                { ...(errors.description && { error: true, helperText: errors.description }) }
              /> }
                                  </Grid> }
                                  <Grid item xs={ 12 } sm={ 6 }>
                                      <TextField
                variant="userid"
                required
                fullWidth
                id="userid"
                variant="outlined"
                label="User ID"
                name="userid"
                autoComplete="userid"
                value = { values.userid }
                onChange = { OnChange }
                { ...(errors.userid && { error: true, helperText: errors.userid }) }

              />
                                  </Grid>
                                  
                                  <Grid item xs={ 12 } sm={ 6 }>
                                      <TextField
                variant="outlined"
                required
                fullWidth
                id="qty"
                label=" Quantity"
                name="qty"
                outputFormat="integer"
                autoComplete="Quantity"
                value = { values.qty }
                onChange = { OnChange }
              />
                                  </Grid>
                                  <Grid item xs={ 12 } sm={ 6 }>
                                      <CurrencyTextField
                variant="outlined"
                required
                fullWidth
                id="unit"
                label="Unit Price"
                name="unit"
                currencySymbol="$"
                outputFormat="string"
                decimalCharacter="."
		            digitGroupSeparator="," 
                autoComplete="unit"
                value = { values.unit }
                onChange = { OnChange }
              />
                                  </Grid>
                                  <Grid item xs={ 12 }>    
                                      <CurrencyTextField
                variant="outlined"
                required
                fullWidth
                id="total"
                label="Total"
                name="total"
                currencySymbol="$"
                outputFormat="string"
                decimalCharacter="."
		            digitGroupSeparator=","
                autoComplete="total"
                value = {  values.unit * values.qty }
                onChange = { OnChange }
                { ...(errors.total && { error: true, helperText: errors.total }) }

              />
                                  </Grid>
                              </Grid>
                              <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={ handleClick }
            className={ classes.submit }
          >
                                  Add
                              </Button>
                              <Grid container justify="flex-end">
                              </Grid>
                          </Grid>
                      </div>
                  </div>
                  <Box mt={ 5 }>
                      <Copyright />
                  </Box>
              </Container>
          </Container>
      </Container> 
  );
}

export default connect(null, { addTrans })(withStyles(useStyles)(AddTransaction));