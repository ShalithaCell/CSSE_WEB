import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DvrIcon from '@material-ui/icons/Dvr';
import Navbar from './navbar';
import { GetSession } from '../services/sessionManagement';
import { decrypt } from '../services/EncryptionService';
import axios from 'axios';
import { ADD_INVENTORY_ENDPOINT, TOAST_ERROR, TOAST_SUCCESS } from '../config';
import { SET_SESSION_EXPIRED } from '../redux/actionTypes';
import { useDispatch } from 'react-redux';
import { ToastContainer } from './dialogs/ToastContainer';

const useStyles = makeStyles((theme) => ({
  paper : {
    marginTop     : theme.spacing(10),
    display       : 'flex',
    flexDirection : 'column',
    alignItems    : 'center'
  },
  avatar : {
    margin          : theme.spacing(1),
    backgroundColor : theme.palette.secondary.main
  },
  form : {
    width     : '100%', 
    marginTop : theme.spacing(5)
  },
  submit : {
    margin : theme.spacing(3, 0, 2)
  }
}));

const initialFieldValues = {
    productnameWarning : '',
    productcodeWarning : '',
    qtycodeWarning     : '',
    upricecodeWarning  : '',
    snamecodeWarning   : '',
    semailcodeWarning  : ''
}

export default function AddInventory() {
    const dispatch = useDispatch();
  const classes = useStyles();
  const [ add, setadd ] =  useState({ pname: '', pcode: '', qty: '', uprice: '', sname: '', semail: '' });

    const onChangeInventory = (event) => {
      event.persist();
      setadd({ ...add, [ event.target.name ]: event.target.value });
        console.log(event);

    };

    async function InsertInventory()
    {

        if (add.pname.length === 0 || initialFieldValues.productnameWarning.length !== 0)
        {
            ToastContainer(TOAST_ERROR, 'Please Enter Product Name');
            return;
        }

        if (add.pcode.length === 0 || initialFieldValues.productcodeWarning.length !== 0)
        {
            ToastContainer(TOAST_ERROR, 'Please Enter Product Code');
            return;
        }

        if (add.qty.length === 0 || initialFieldValues.qtycodeWarning.length !== 0)
        {
            ToastContainer(TOAST_ERROR, 'Please Enter Quantity');
            return;
        }

        if (add.uprice.length === 0 || initialFieldValues.upricecodeWarning.length !== 0)
        {
            ToastContainer(TOAST_ERROR, 'Please Enter Unit Price');
            return;
        }

        if (add.sname.length === 0 || initialFieldValues.snamecodeWarning.length !== 0)
        {
            ToastContainer(TOAST_ERROR, 'Please Enter Supplier Name');
            return;
        }

        if (add.semail.length === 0 || initialFieldValues.semailcodeWarning.length !== 0)
        {
            ToastContainer(TOAST_ERROR, 'Please Enter Supplier Email');
            return;
        }

        const localData = JSON.parse(GetSession());
        let token = localData.sessionData.token;
        token = decrypt(token);
        ToastContainer(TOAST_SUCCESS, "Inventory Added Successfully!");

        console.log(token);

        const userObj = {
            PName  : add.pname,
            Pcode  : add.pcode,
            Qty_   : add.qty,
            Uprice : add.uprice,
            SName  : add.sname,
            SEmail : add.semail
        }

        //API call
        await axios({
            method  : 'post',
            url     : ADD_INVENTORY_ENDPOINT,
            headers : { Authorization: 'Bearer ' + token },
            data    : userObj
        })
            .then(function(response)
            {
                //return true;
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
          <div className={ classes.paper } >
              <Avatar className={ classes.avatar }>
                  <DvrIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                  Add Inventory
              </Typography>
              <div className={ classes.form } >
                  <Grid container spacing={ 2 }>
                      <Grid item xs={ 12 } sm={ 6 }>
                          <TextField
                autoComplete="pname"
                name="pname"
                variant="outlined"
                required
                fullWidth
                label="Product Name"
                //helperText={ add.inventoryWarning }
                value={ add.pname }
                autoFocus
                onChange={ onChangeInventory }
              />
                      </Grid>
                      <Grid item xs={ 12 } sm={ 6 }>
                          <TextField
                variant="outlined"
                required
                fullWidth
                label="Product Code"
                name="pcode"
                value={ add.pcode }
                onChange={ onChangeInventory }
              />
                      </Grid>
                      <Grid item xs={ 12 }>
                          <TextField
                variant="outlined"
                required
                fullWidth
                id="qty"
                label="Quantity"
                name="qty"
                value={ add.qty }
                onChange={ onChangeInventory }
              />
                      </Grid>
                      <Grid item xs={ 12 }>
                          <TextField
                variant="outlined"
                required
                fullWidth
                name="uprice"
                label="Unit Price"
                type="uprice"
                id="uprice"
                value={ add.uprice }
                onChange={ onChangeInventory }
              />
                      </Grid>
                      <Grid item xs={ 12 }>
                          <TextField
                variant="outlined"
                required
                fullWidth
                name="sname"
                label="Supplire Name"
                type="sname"
                id="sname"
                autoComplete="current-sname"
                value={ add.sname }
                onChange={ onChangeInventory }
              />
                      </Grid>
                      <Grid item xs={ 12 }>
                          <TextField
                variant="outlined"
                required
                fullWidth
                name="semail"
                label="Supplire Email"
                type="semail"
                id="semail"
                autoComplete="current-email"
                value={ add.semail }
                onChange={ onChangeInventory }
              />
                      </Grid>
                  </Grid>
                  <Button
            type="submit"
            variant="contained"
            color="primary"
            className={ classes.submit }
            onClick={ InsertInventory }
          >
                      ADD INVENTORY
                  </Button>
                  <Grid container justify="flex-end">
                  </Grid>
              </div>
          </div>
      </Container>
  );
}
