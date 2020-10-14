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
import { ADD_ATTENDANCE, TOAST_ERROR } from '../config';
import { makeStyles } from '@material-ui/core/styles';
import { ToastContainer } from './dialogs/ToastContainer';
import { GetSession } from '../services/sessionManagement';
import { decrypt } from '../services/EncryptionService';
import axios from 'axios';
import { SET_SESSION_EXPIRED } from '../redux/actionTypes';
import { connect } from 'react-redux';
import { updateAttendance, getAttendanceInformation } from '../redux/AttendanceAction';
import { useHistory } from 'react-router-dom';
import { TOAST_SUCCESS } from '../config';

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
 // hourWarning         : ''
}

 const AttendanceUpdate = ( props ) => {

	const classes = useStyles();
	const [ update, setupdate ] = useState({ 
    name         : props.location.state.name,
    role         : props.location.state.role,
    date         : props.location.state.registedDate,
    clockOnTime  : props.location.state.clockOnTime,
    clockOutTime : props.location.state.clockOutTime });

	const UpdateAttendance = () => {
    console.log();
    if (update.name.length === 0 || initialFieldValues.firstnameWarning .length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter First Name');
			return;
    }
    if (update.role.length === 0 || initialFieldValues.roleWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Role');
			return;
    }
    if (update.registedDate.length === 0 || initialFieldValues.timeWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Date');
			return;
    }
    if (update.clockOnTime.length === 0 || initialFieldValues.clockOnTimeWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Clock On Time');
			return;
    }
    if (update.clockOutTime.length === 0 || initialFieldValues.clockOutTimeWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter  Clock Out Time');
			return;
    }
    ToastContainer(TOAST_SUCCESS, "Successfully Updateted Attendnce")
	const attendanceView = {
			Name         : update.name,
      Role         : update.role,
      Date         : update.date,
			ClockOnTime  : update.clockOnTime,
			ClockOutTime : update.clockOutTime,
			WorkingHours : update.hours,
			ID           : props.location.state.id
		};

		props.updateAttendance(attendanceView);
		props.getAttendanceInformation();
	}

	const onChangeAttendance = (e) =>
	{
		e.persist();
		setupdate({ ...update, [ e.target.name ]: e.target.value })

	}

	useEffect(() => {
    console.log(props.location.state);
		}, [ props.location.state ]);
   
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
            id="name"
            name="name"
            label="First name"
            fullWidth
            autoComplete="name"
            value={ update.name }
                onChange={ onChangeAttendance }
          />
                  </Grid>
                  <Grid item xs={ 12 } sm={ 6 }>
                      <TextField
            id="role"
            name="role"
            label="Role"
            fullWidth
            autoComplete="role"
            value={ update.role }
                onChange={ onChangeAttendance }
          />
                  </Grid>
                  <Grid item xs={ 12 }>
                      <TextField
            id="clockOnTime"
            name="clockOnTime"
            label="Clock On Time"
            fullWidth
            autoComplete="clockOnTime"
            autoComplete="date"
            type="datetime-local"
            className={ classes.textField }
            InputLabelProps={ {
              shrink : true
            } }
            value={ update.clockOnTime }
                onChange={ onChangeAttendance }
          />
                  </Grid>
                  <Grid item xs={ 12 }>
                      <TextField
            id="clockOutTime"
            name="clockOutTime"
            label="Clock Out Time"
            fullWidth
            autoComplete="clockOutTime"
            autoComplete="date"
            label="Alarm clock"
            type="datetime-local"
            className={ classes.textField }
            InputLabelProps={ {
              shrink : true
            } }
            value={ update.clockOutTime }
                onChange={ onChangeAttendance }
          />
                  </Grid>
                  <Button 
            fullWidth
            variant="contained"
            color="primary"
            onClick={ UpdateAttendance }
          >
                      UPDATE
                  </Button>
              </Grid>
          </Container>
      </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
	attendanceList : state.attendance.attendanceList
})
export default connect(mapStateToProps, { getAttendanceInformation, updateAttendance })(AttendanceUpdate);