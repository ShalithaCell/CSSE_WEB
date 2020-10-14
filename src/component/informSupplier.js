import React from 'react';
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
import EmailIcon from '@material-ui/icons/Email';
import Navbar from './navbar';

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

export default function informSupplier() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles();

  return (
      <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Navbar />
          <div className={ classes.paper }>
              <Avatar className={ classes.avatar }>
                  <EmailIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                  Inform To Suppliers
              </Typography>
              <form className={ classes.form } noValidate>
                  <Grid container spacing={ 2 }>
                      <Grid item xs={ 12 }>
                          <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Supplier Email"
                name="email"
                autoComplete="email"
              />
                      </Grid>
                      <Grid item xs={ 12 }>
                          <TextField
                variant="outlined"
                required
                fullWidth
                name="Sender Name"
                label="Sender Name"
                type="Sender Name"
                id="Sender Name"
              />
                      </Grid>
                      <Grid item xs={ 12 }>
                          <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Sender Email"
                name="email"
                autoComplete="email"
              />
                      </Grid>
                      <Grid item xs={ 12 }>
                          <TextField
                variant="outlined"
                required
                fullWidth
                name="Message"
                label="Message"
                type="Message"
                id="Message"
              />
                      </Grid>
                  </Grid>
                  <Button
            type="submit"
            fullWidth
            variant="contained"
            color="#33FF52"
            className={ classes.submit }
          >
                      Send
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
