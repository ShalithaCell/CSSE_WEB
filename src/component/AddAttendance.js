import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Navbar from './navbar';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { useDispatch } from 'react-redux';
import { ADD_ATTENDANCE } from '../config';
import { makeStyles } from '@material-ui/core/styles';
import { ToastContainer } from './dialogs/ToastContainer';
import { GetSession } from '../services/sessionManagement';
import { decrypt } from '../services/EncryptionService';
import axios from 'axios';
import { SET_SESSION_EXPIRED } from '../redux/actionTypes';
import { TOAST_ERROR, TOAST_SUCCESS } from '../config';

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
	firstnameWarning    : '',
	roleWarning         : '',
	timeWarning         : '',
	clockOnTimeWarning  : '',
  clockOutTimeWarning : ''
}

export default function AddAttendance() {
 
  const dispatch = useDispatch();
  const classes = useStyles();
  const [ add, setadd ] = useState( { afname: '', arole: '', adate: '', aclockOnTime: '', aclockOutTime: '', aHours: ''  });
  const onChangeAddAttendance = (event) => {
    event.persist();
    setadd({ ...add, [ event.target.name ]: event.target.value });
     };
    
   async function AddAttendances()
  {
    if (add.afname.length === 0 || initialFieldValues.firstnameWarning .length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter First Name');
			return;
    }
    if (add.arole.length === 0 || initialFieldValues.roleWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Role');
			return;
    }
    if (add.adate.length === 0 || initialFieldValues.timeWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Date');
			return;
    }
    if (add.aclockOnTime.length === 0 || initialFieldValues.clockOnTimeWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Clock On Time');
			return;
    }
    if (add.aclockOutTime.length === 0 || initialFieldValues.clockOutTimeWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter  Clock Out Time');
			return;
    }
  
      const localData = JSON.parse(GetSession());
      let token = localData.sessionData.token;
      token = decrypt(token);
      ToastContainer(TOAST_SUCCESS, "Successfully Added Attendnce")

      //console.log('ABC');
      let success = false;
      let resData;

      console.log(token);

      const userObj = {
        name    : add.afname,
        role    : add.arole,
        date    : add.adate,
        onTime  : add.aclockOnTime,
        outTime : add.aclockOutTime
       // wHours  : add.aHours
      }

      //API call
      await axios({
        method  : 'post',
        url     : ADD_ATTENDANCE,
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
      <React.Fragment>
          <CssBaseline />
          <Container  component="main" maxWidth="xs">
              <Navbar/>
              <Typography component="h5" variant="h2" >
                  //        Form   Attendance
              </Typography>
              <Grid container spacing={ 5 }>
                  <Grid item xs={ 12 } sm={ 6 }>
                      <TextField
            required
            id="firstName"
            name="afname"
            label="First name"
            fullWidth
            autoComplete="fname"
            value={ add.afname }
                onChange={ onChangeAddAttendance }
          />
                  </Grid>
                  <Grid item xs={ 12 } sm={ 6 }>
                      <TextField
            required
            id="role"
            name="arole"
            label="Role"
            fullWidth
            autoComplete="role"
            value={ add.arole }
                onChange={ onChangeAddAttendance }
          />
                  </Grid>
                  <Grid item xs={ 12 }>
                      <TextField
            required
            id="date"
            name="adate"
            label="Date"
            fullWidth
            autoComplete="date"
            type="date"
            defaultValue="2017-05-24"
            className={ classes.textField }
            InputLabelProps={ {
            shrink : true
          } }
            value={ add.adate }
                onChange={ onChangeAddAttendance }
          />
                  </Grid>
                  <Grid item xs={ 12 }>
                      <TextField
            required
            id="time"
            name="aclockOnTime"
            label="Clock On Time"
            fullWidth
            autoComplete="clockOnTime"
            label="Alarm clock"
            type="time"
            defaultValue="07:30"
            className={ classes.textField }
            InputLabelProps={ {
            shrink : true
    } }
           inputProps={ {
      step : 300 // 5 min
    } }
            value={ add.aclockOnTime }
                onChange={ onChangeAddAttendance }
          />
                  </Grid>
                  <Grid item xs={ 12 }>
                      <TextField
            required
            id="time"
            name="aclockOutTime"
            label="Clock Out Time"
            fullWidth
            autoComplete="date"
            label="Alarm clock"
            type="time"
            defaultValue="07:30"
            className={ classes.textField }
            InputLabelProps={ {
            shrink : true
    } }
           inputProps={ {
      step : 300 // 5 min
    } }
            value={ add.aclockOutTime }
                onChange={ onChangeAddAttendance }
          />
                  </Grid>
                  <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={ classes.submit }
            onClick={ AddAttendances }
          >
                      ADD
                  </Button>
              </Grid>
          </Container>
      </React.Fragment>
  );
}