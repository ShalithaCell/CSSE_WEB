import React, { useState, useEffect  } from 'react';
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
import Link from '@material-ui/core/Link';
import Navbar from './navbar';
import Container from '@material-ui/core/Container';
import { getBranchInformation, updateBranch } from '../redux/branchActions';
import * as map from 'rxjs';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { ToastContainer } from './dialogs/ToastContainer';
import { TOAST_ERROR, TOAST_WARN } from '../config';
import { useHistory } from 'react-router-dom';

function Copyright() {
	return (
    <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:3000/storeDashboard">
            Aplus Web
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root : {
		height : '100vh'
	},
	image : {
		backgroundImage  : 'url(https://cdn2.vectorstock.com/i/1000x1000/42/56/business-people-meeting-team-discussion-vector-26464256.jpg)',
		backgroundRepeat : 'no-repeat',
		backgroundColor  :
			theme.palette.type === 'light' ? theme.palette.grey[ 50 ] : theme.palette.grey[ 900 ],
		backgroundSize     : 'cover',
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
		marginTop : theme.spacing(5)
	},
	submit : {
		margin : theme.spacing(6, 0, 2)
	}
}));

const initialFieldValues = {
	branchnameWarning   : '',
	orgNameWarning      : '',
	locationWarning     : '',
	tpNoWarning         : '',
	locationError       : '',
	noofEmployeeWarning : ''

}

const StoreUpdate = ( props ) => {

	const classes = useStyles();
	//const [ currentbranch, setcurrentbranch ] = useState({ branch: null });
	const history = useHistory();
	// eslint-disable-next-line react/prop-types
	const [ update, setupdate ] = useState({ bName: props.location.state.branchName, location: props.location.state.branchLocation, tpNo: props.location.state.branchPhone, noofEmployees: props.location.state.noofEmployees });

	const Updatebranch = (id) => {
		console.log(id);

		if (update.bName.length === 0 || initialFieldValues.branchnameWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Branch Name');
			return;
		}
		if (update.location.length === 0 || initialFieldValues.locationWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Branch location');
			return;
		}

		if (update.tpNo.length === 0 || initialFieldValues.tpNoWarning.length !== 0)
		{
			ToastContainer(TOAST_ERROR, 'Please enter Branch TelePhone Number ');
			return;
		}

		if (update.tpNo.length !== 10 )
		{
			ToastContainer(TOAST_WARN, 'Invalid TelePhone Number ');
			return;
		}

		const branchView = {
			BranchName     : update.bName,
			OrgName        : 1,
			BranchLocation : update.location,
			BranchPhone    : update.tpNo,
			NoofEmployees  : update.noofEmployees,
			Id             : props.location.state.id
		};

		props.updateBranch(branchView);
		props.getBranchInformation();
		// eslint-disable-next-line no-use-before-define
		handleClickOpen();
	}
	const [ open, setOpen ] = React.useState(false);
	const handleClose = () =>
	{
		setOpen(false);
	};
	const handleClickOpen = () =>
	{
		setOpen(true);
	};
	const storeRoute = () => {
		// eslint-disable-next-line no-use-before-define

		const path = 'storeDashboard';
		history.push(path);
	}

	const onChange = (e) =>
	{
		e.persist();
		setupdate({ ...update, [ e.target.name ]: e.target.value })

	}

	useEffect(() => {
		console.log(props.location.state);
		// props.updateBranch();
		// props.getBranchInformation();
		}, [ props.location.state ]);

	return (
    <div>
        <Navbar/>
        <div className={ 'top-5pres' }>
            <Container fixed>
                <Grid container component="main" className={ classes.root }>
                    <CssBaseline />
                    <Grid item xs={ false } sm={ 10 } md={ 7 } className={ classes.image } />
                    <Grid item xs={ 12 } sm={ 10 } md={ 5 } component={ Paper } elevation={ 20 } square>
                        <div className={ classes.paper }>
							
                            <Avatar className={ classes.avatar }>
                                <HouseTwoToneIcon />
                            </Avatar>

                            <Typography component="h1" variant="h5">
                                Update Existing Branch
                            </Typography>

                            <div className={ classes.form } >

                                <TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="bName"
							label="Branch Name"
							name="bName"
							autoComplete="bName"
							value={ update.bName  }
							onChange={ onChange }

						/>
                                <TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="location"
							label="Location"
							type="location"
							id="location"
							value={ update.location }
							onChange={ onChange }

						/>
                                <TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="tpNo"
							label="Phone No"
							type="tpNo"
							id="tpNo"
							value={ update.tpNo }
							onChange={ onChange }
						/>
                                <TextField
							variant="outlined"
							margin="normal"
							fullWidth
							name="noofEmployees"
							label="No of Employees"
							type="noofEmployees"
							id="noofEmployees"
							value={ update.noofEmployees }
							onChange={ onChange }
						/>
						
                                <Button
							type="submit"
							variant="contained"
							color="primary"
							className={ classes.submit }
							onClick={ Updatebranch.bind(null, location.id) }
						>
                                    Update Branch
                                </Button>
                                <Dialog
									open={ open }
									onClose={ handleClose }
									aria-labelledby="alert-dialog-title"
									aria-describedby="alert-dialog-description"
								>
                                    <DialogTitle id="alert-dialog-title">{'Successfully Updated!!'}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">

                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={ storeRoute } color="primary">
                                            OK
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                <Box mt={ 8 }>
                                    <Copyright />
                                </Box>
									
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    </div>
	);

}
const mapStateToProps = (state) => ({
	branchList : state.branch.branchList
})
export default connect(mapStateToProps, { getBranchInformation, updateBranch })(StoreUpdate);