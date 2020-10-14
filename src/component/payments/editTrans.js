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
import { updateTrans, viewTrans } from '../../redux/transactionActions'
import { useDispatch } from 'react-redux'
import { GetSession } from '../../services/sessionManagement';
import { decrypt } from '../../services/EncryptionService';
import axios from 'axios';
import { UPDATE_TRANSACTION_ENDPOINT } from '../../config';
import { SET_SESSION_EXPIRED } from '../../redux/actionTypes';
import { connect } from 'react-redux';
import { transactionReducer } from '../../redux/reducers/transactionReducer';
import withStyles from '@material-ui/core/styles/withStyles';
import   transactions  from './transactions';
import { useHistory } from "react-router-dom";

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
const EditTransaction = ({ ...props }) => { 
  const history = useHistory();

  const [ values, setvalues ] = useState()
   const [ update, setupdate ] = useState({

     description : props.location.state.description,
     user_ID     : props.location.state.user_ID, 
     quantity    : props.location.state.quantity, 
     unit_price  : props.location.state.unit_price,
     total       : props.location.state.total

   })
    const updateTrans = (id) => {
	 	console.log(id);

	 	const transView = {
      Description : update.description,
	 		User_ID     : update.user_ID,
	 		Quantity    : update.quantity,
      Unit_price  : update.unit_price,
      Total       : update.total,
	 	  ID          : props.location.state.id
	 	};
 	props.updateTrans(transView);
   const updateRoute = () => {
    console.log();
    const path = 'transactions';
    history.push(path);
}

 }
  
  const classes = useStyles();

const onChange = (e) => {
  e.persist();
  setupdate({ ...update, [ e.target.name ]: e.target.value })
}
useEffect( () => {
  console.log(props.location.state);
  // props.updateTrans();
}, [  ])

  return (
      <Container component="main" maxWidth="sx">
          <Navbar/>
          <Container maxWidth="$" >
              // eslint-disable-next-line react/jsx-indent
              <Typography component="div" className={ classes.table } />
              <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <div className={ classes.paper }>
                      <Typography component="h1" variant="h5">
                          Edit Transaction
                      </Typography>
                      <div >
                          <Grid container spacing={ 2 }>
                             
                              <Grid container spacing={ 2 }>
                                  <Grid item xs={ 12 } sm={ 6 }>
                                      <TextField
                autoComplete="description"
                name="description"
                variant="outlined"
                required
                fullWidth
                id="description"                                                       
                label="Description"
                value={ update.description }
                onChange={ onChange }
                autoFocus
              />
                                  </Grid>
                                  <Grid item xs={ 12 } sm={ 6 }>
                                      <TextField
                variant="userid"
                required
                fullWidth
                id="userid"
                variant="outlined"
                label="User ID"
                name="user_ID"
                autoComplete="userid"
                value={ update.user_ID }
                onChange={ onChange }
              />
                                  </Grid>
                                  
                                  <Grid item xs={ 12 } sm={ 6 }>
                                      <TextField
                autoComplete="qty"
                name="quantity"
                variant="outlined"
                required
                fullWidth
                id="quantity"                                                       
                label="Quantity"
                autoFocus
                value={ update.quantity }
                onChange={ onChange }
              />
                                  </Grid>
                                  <Grid item xs={ 12 } sm={ 6 }>
                                      <TextField
                variant="unit"
                required
                fullWidth
                id="unit"
                variant="outlined"
                label="Unit Price"
                name="unit_price"
                autoComplete="unit"
                value={ update.unit_price }
                onChange={ onChange }
              />
                                  </Grid>
                                  <Grid item xs={ 12 }>    
                                      <TextField
                variant="outlined"
                required
                fullWidth
                name="total"
                label="Total"
                id="total"
                value={ update.total }
                onChange={ onChange }
              />
                                  </Grid>
                              </Grid>
                              <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={ updateTrans }
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
  return { list: state.transaction.list }
}
export default connect(mapStateToProps, { viewTrans, updateTrans })(withStyles(useStyles)(EditTransaction));