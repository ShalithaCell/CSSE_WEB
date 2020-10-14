import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Navbar from '../navbar';
import { fade, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles =  makeStyles((theme) => ({
    table : {
      width      : '100%',
      paddingTop : '2%',
      padding    : '5%' 
    },
    title : {
      align : 'left'
    }
  }));

export default function DeleteTransaction() {
    const classes = useStyles();

  return (
      <Container component="main" maxWidth="sx">
          <Navbar/>
          <Container maxWidth="$" >
              <Typography component="div" className={ classes.table } />
              <React.Fragment>
                  <Typography variant="h6" gutterBottom>
                      Payment method
                  </Typography>
                  <Grid container spacing={ 3 }>
                      <Grid item xs={ 12 } md={ 6 }>
                          <TextField required id="cardName" label="Name on card" fullWidth />
                      </Grid>
                      <Grid item xs={ 12 } md={ 6 }>
                          <TextField required id="cardNumber" label="Card number" fullWidth />
                      </Grid>
                      <Grid item xs={ 12 } md={ 6 }>
                          <TextField required id="expDate" label="Expiry date" fullWidth />
                      </Grid>
                      <Grid item xs={ 12 } md={ 6 }>
                          <TextField
                req
                uired
                id="cvv"
                label="CVV"
                helperText="Last three digits on signature strip"
                fullWidth
                />
                      </Grid>
                      <Grid item xs={ 12 }>
                          <FormControlLabel
                control={ <Checkbox color="secondary" name="saveCard" value="yes" /> }
                label="Remember credit card details for next time"
                />
                      </Grid>
                  </Grid>
              </React.Fragment>
          </Container>
      </Container> 
  );
}
