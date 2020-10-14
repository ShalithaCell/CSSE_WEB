import React, { useState, useEffect } from 'react'; 
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import HouseTwoToneIcon from '@material-ui/icons/HouseTwoTone';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Copyright } from '@material-ui/icons';
import Navbar from './navbar';
import { GetSession } from '../services/sessionManagement';
import { decrypt } from '../services/EncryptionService';
import axios from 'axios';
import { getcustomerDetails, updateCustomer } from '../redux/CustomerAction';
import { SET_SESSION_EXPIRED } from '../redux/actionTypes';
import { useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import { TOAST_SUCCESS } from '../config';

const useStyles = makeStyles((theme) => ({
	root : {
		height : '100vh'
	},
	image : {
		//backgroundImage  : 'url(http://www.iconarchive.com/show/oxygen-icons-by-oxygen-icons.org/Actions-list-add-user-icon.html)',
		//backgroundRepeat : 'no-repeat',
		//backgroundColor  :
			//theme.palette.type === 'light' ? theme.palette.grey[ 50 ] : theme.palette.grey[ 900 ],
		//backgroundSize     : 'cover',
    backgroundPosition : 'center'
	},
	paper : {
		margin        : theme.spacing(8, 4),
		display       : 'flex',
		flexDirection : 'column',
		alignItems    : 'center'
	},
	avatar : {
		margin          : theme.spacing(1),
		backgroundColor : theme.palette.info.main
	},
	form : {
		width     : '100%', // Fix IE 11 issue.
		marginTop : theme.spacing(1)
	},
	submit : {
		margin : theme.spacing(6, 0, 2)
	}
}));

const Customerupdate = ( props ) => {

	const classes = useStyles();
	
	const [ update, setupdate ] = useState({ 
		fName        : props.location.state.fname, 
		lname        : props.location.state.lname, 
		email        : props.location.state.email, 
		id_number    : props.location.state.id_number, 
		phone_number : props.location.state.phone_number });

	const UpdateCustomer = () => {
        console.log();

		const customerUpdate = {
            fname        : update.fName,
            lname        : update.lname,
            email        : update.email,
            // eslint-disable-next-line camelcase
            id_number    : update.id_number,
            // eslint-disable-next-line camelcase
            phone_number : update.phone_number,
            // eslint-disable-next-line react/prop-types
            ID           : props.location.state.id
        };

        // eslint-disable-next-line react/prop-types
        props.updateCustomer(customerUpdate);
        // eslint-disable-next-line react/prop-types
        props.getcustomerDetails();
    }

    const onChangeCustomer = (e) =>
    {
        e.persist();
        setupdate({ ...update, [ e.target.name ]: e.target.value })

    }
    
    useEffect(() => {
        console.log(props.location.state);

    }, [ props.location.state ]);
	return (
		
    <Container component="main" maxWidth="xs">
        <Navbar/>
        <CssBaseline />
       
        <div className={ classes.paper }>
            <Avatar className={ classes.avatar }>
                <HouseTwoToneIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                UPDATE CUSTOMER 
            </Typography>
            <div className={ classes.form } >
                <Grid container spacing={ 2 }>
                    <Grid item xs={ 12 } >

                        <TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="fname"
							label="Frist Name"
							name="fName"
							autoComplete="fName"
							onChange={ onChangeCustomer }
							value={ update.fName }

						/></Grid>
                    <Grid item xs={ 12 } >
                        <TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="lname"
						label="Last Name"
						name="lname"
						autoComplete="lname"
						onChange={ onChangeCustomer }
						value={ update.lname }

					/></Grid>
                    <Grid item xs={ 12 } >
                        <TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="email"
							label="E_MAIL"
							//type="email"
							id="email"
							onChange={ onChangeCustomer }
							value={ update.email }

						/></Grid>
                    <Grid item xs={ 12 } >
                        <TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="id_number"
							label="ID Number"
							//type="id"
							id="id_number"
							onChange={ onChangeCustomer }
							value={ update.id_number }
					/></Grid>
                    <Grid item xs={ 12 } ></Grid>
                    <TextField
						variant="outlined"
						margin="normal"
						fullWidth
						name="phone_number"
						label="Phone Number"
						//type="phoneno"
						id="phone_number"
						onChange={ onChangeCustomer }
						value={ update.phone_number }
					/>
                </Grid>
					
                <Button
							type="submit"
							variant="contained"
							color="primary"
							className={ classes.update }
							onClick={ UpdateCustomer }
						>
                    Update Customer
                </Button>

                <Box mt={ 8 }>
                    <Copyright />
                </Box>
            </div>
        </div>
        
    </Container>
	);
}
const mapStateToProps = (state) => ({
	customerlist : state.customer.customerlist
})
export default connect(mapStateToProps, { getcustomerDetails, updateCustomer })(Customerupdate)
