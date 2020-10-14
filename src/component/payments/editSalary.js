/* eslint-disable react-hooks/rules-of-hooks */
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
import { viewSalary, updateSal } from '../../redux/salaryActions';
import { useDispatch } from 'react-redux';
import { GetSession } from '../../services/sessionManagement';
import { decrypt } from '../../services/EncryptionService';
import axios from 'axios';
import { UPDATE_SALARY_ENDPOINT } from '../../config';
import { SET_SESSION_EXPIRED } from '../../redux/actionTypes';
import { connect } from 'react-redux';
import { salaryReducer } from '../../redux/reducers/salaryReducer';
import withStyles from '@material-ui/core/styles/withStyles';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

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
     name        : '',
     eid         : '',
     basic       : '',
     bonus       : '',
     designation : '',
     attendance  : '',
     for_month   : '',
     total       : ''
 }

const editSalaries = ({ ...props }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [ errors, seterrors ] = useState({})
  const [ values, setvalues ] = useState (initialValues) 
  const [ update, setupdate ] = useState({ name: props.location.state.name, eid: props.location.state.eid, basic: props.location.state.basic, bonus: props.location.state.bonus, designation: props.location.state.designation, attendance: props.location.state.attendance, for_month: props.location.state.for_month, total: props.location.state.total })
   const updateSal = (id) => {
    console.log(id);

    const salView = {
      Name        : update.name,
      Eid         : update.eid,
      Basic       : update.basic,
      Bonus       : update.bonus,
      Designation : update.designation,
      Attendance  : update.attendance,
      For_month   : update.for_month,
      Total       : update.total,
      ID          : props.location.state.id
    };
  props.updateSal(salView);
}
 
  const validate = () => {
    const temp = {}
    temp.name = values.name?'':'This field is required.'
    temp.designation = values.designation?'':'This field is required.'
    temp.eid = values.eid?'':'This field is required.'
    temp.basic = values.basic?'':'This field is required.'
    temp.for_month = values.for_month?'':'This field is required.'
    temp.attendance = values.attendance?'':'This field is required.'
    temp.total = values.total?'':'This field is required.'

    seterrors({
      ...temp
    })
     return Object.values(temp).every((x) => x == '') 
  }

  const OnChange = (e) => {
    e.persist();
    const { name, value } = e.target
     setvalues({ ...values, 
       [ e.target.name ] : e.target.value })
      setupdate({ ...update, [ e.target.name ]: e.target.value })

    validate(value)
  }
  useEffect( () => {
    console.log(props.location.state);
    props.updateSal();
  
  }, [ props ])

  const handleClick = (e) => {
    e.preventDefault()
    // props.addTrans(userObj);
    props.addSalary(values);
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
                          Update Salary
                      </Typography>
                      <div className={ classes.form } noValidate onSubmit={ handleClick }>
                          <Grid container spacing={ 2 }>
                             
                              <Grid container spacing={ 2 }>
                                  <Grid item xs={ 12 } sm={ 6 }>
                                      { <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={ update.name }
                onChange = { OnChange }
                { ...(errors.name && { error: true, helperText: errors.name }) }
              /> }
                                  </Grid> 
                                  <Grid item xs={ 12 } sm={ 6 }>
                                      <TextField
                required
                fullWidth
                id="designation"
                variant="outlined"
                label="Designation"
                name="designation"
                autoComplete="designation"
                value={ update.designation }
                onChange = { OnChange }
                { ...(errors.designation && { error: true, helperText: errors.designation }) }
              />
                                  </Grid>
                                  <Grid item xs={ 12 }>    
                                      <TextField
                variant="outlined"
                required
                fullWidth
                id="eid"
                label="Employee ID"
                name="eid"
                autoComplete="eid"
                value={ update.eid }
                onChange = { OnChange }
                { ...(errors.eid && { error: true, helperText: errors.eid }) }
              />
                                  </Grid>
                                  
                                  <Grid item xs={ 12 } sm={ 6 }>
                                      <CurrencyTextField
                variant="outlined"
                required
                fullWidth
                currencySymbol="$"
                outputFormat="string"
                decimalCharacter="."
		            digitGroupSeparator=","
                id="basic"
                label="Basic"
                name="basic"
                autoComplete="basic"
                value={ update.basic }
                onChange = { OnChange }
                { ...(errors.basic && { error: true, helperText: errors.basic }) }
              />
                                  </Grid>
                                  <Grid item xs={ 12 } sm={ 6 }>
                                      <CurrencyTextField
                variant="outlined"
                required
                fullWidth
                currencySymbol="$"
                outputFormat="string"
                decimalCharacter="."
		            digitGroupSeparator=","
                id="bonus"
                label="Bonus"
                name="bonus"
                autoComplete="bonus"
                value={ update.bonus }
                onChange = { OnChange }
              />
                                  </Grid> <Grid item xs={ 12 }>    
                                      <TextField
                variant="outlined"
                required
                fullWidth
                id="attendance"
                label="Attendance"
                name="attendance"
                autoComplete="attendance"
                value={ update.attendance }
                onChange = { OnChange }
                { ...(errors.attendance && { error: true, helperText: errors.attendance }) }
              />
                                  </Grid>
                                  <Grid item xs={ 12 }>    
                                      <TextField
                variant="outlined"
                required
                fullWidth
                name="total"
                currencySymbol="$"
                outputFormat="string"
                decimalCharacter="."
		            digitGroupSeparator=","
                id="for_month"
                label="For_month"
                name="for_month"
                autoComplete="for_month"
                value={ update.for_month }
                onChange = { OnChange }
                { ...(errors.for_month && { error: true, helperText: errors.for_month }) }
              />
                                  </Grid>
                                  <Grid item xs={ 12 }>    
                                      <CurrencyTextField
                variant="outlined"
                required
                fullWidth
                name="total"
                currencySymbol="$"
                outputFormat="string"
                decimalCharacter="."
		            digitGroupSeparator=","
                id="total"
                label="Total"
                name="total"
                currencySymbol="$"
                decimalCharacter="."
		            digitGroupSeparator=","
                autoComplete="total"
                value={ update.total }
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
            onClick={ updateSal }
          >
                                  Update
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
const mapStateToProps = (state) => {
  return { list: state.salary.list }
}
export default connect(mapStateToProps, { viewSalary, updateSal })(withStyles(useStyles)(editSalaries));