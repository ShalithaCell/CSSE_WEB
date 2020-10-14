import React, { useState, useEffect } from 'react';
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
import { getSupplier, updateSupplier } from '../redux/supplierActions';
import { useDispatch } from 'react-redux';
import { GetSession } from '../services/sessionManagement';
import { decrypt } from '../services/EncryptionService';
import axios from 'axios';
import { ADD_SUPPLIER_ENDPOINT } from '../config';
import { SET_SESSION_EXPIRED } from '../redux/actionTypes';
import { connect } from 'react-redux';

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

const SupplierUpdate = ( props ) =>
{

	const classes = useStyles();
	const dispatch = useDispatch();

	const [ update, setupdate ] = useState({ 
		firstName   : props.location.state.fname,
		lastName    : props.location.state.lname, 
		email       : props.location.state.email, 
		category    : props.location.state.category,
		area        : props.location.state.area,
		PhoneNumber : props.location.state.phoNumber });

	const UpdateSupplier = () =>
	{
		console.log();

		const supplierdetails = {
			Finame    : update.firstName,
			Laname    : update.lastName,
			email     : update.email,
			CAtegory  : update.category,
			ARea      : update.area,
			PHoNumber : update.PhoneNumber,
			ID        : props.location.state.id
		};

		props.updateSupplier(supplierdetails);
		props.getSupplier();
	}

	const onChangeSupplier = (e) =>
	{
		e.persist();
		setupdate({ ...update, [ e.target.name ]: e.target.value })

	}

	useEffect(() =>
	{
		console.log(props.location.state);
		// props.updateBranch();
		// props.getBranchInformation();
	}, [ props.location.state ]);

	return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Navbar />
        <div className={ classes.paper }>
            <Avatar className={ classes.avatar }>
                <PersonAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Update Supplier
            </Typography>
            <div>
                <Grid container spacing={ 2 }>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								fullWidth
								id="firstName"
								label="First Name"
								value={ update.firstName }
								onChange={ onChangeSupplier }
								autoFocus
							/>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField
								variant="outlined"
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								value={ update.lastName }
								onChange={ onChangeSupplier }
								autoComplete="lname"
							/>
                    </Grid>
                    <Grid item xs={ 12 }>
                        <TextField
								variant="outlined"
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								value={ update.email }
								onChange={ onChangeSupplier }
								autoComplete="email"
							/>
                    </Grid>
                    <Grid item xs={ 12 }>
                        <TextField
								variant="outlined"
								fullWidth
								name="category"
								label="Category"
								type="category"
								id="category"
								value={ update.category }
								onChange={ onChangeSupplier }
							/>
                    </Grid>
                    <Grid item xs={ 12 }>
                        <TextField
								variant="outlined"
								fullWidth
								name="area"
								label="area"
								type="area"
								id="area"
								value={ update.area }
								onChange={ onChangeSupplier }
							/>
                    </Grid>
                    <Grid item xs={ 12 }>
                        <TextField
								variant="outlined"
								fullWidth
								name="PhoneNumber"
								label="Phone Number"
								type="Phone Number"
								id="PhoneNumber"
								value={ update.PhoneNumber }
								onChange={ onChangeSupplier }
							/>
                    </Grid>
                </Grid>
                <Button
						type="submit"
						variant="contained"
						color="primary"
						href={ 'http://localhost:3000/SupplierList' }
						onClick={ UpdateSupplier }
					>
                    Update Supplier
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    </Grid>
                </Grid>
            </div>
        </div>
        <Box mt={ 5 }>
            <Copyright />
        </Box>
    </Container>
	);
}
const mapStateToProps = (state) => ({
	supplierLists : state.supplier.supplierLists
})
export default connect(mapStateToProps, { getSupplier, updateSupplier })(SupplierUpdate);
