import React, { UseState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Navbar from './navbar';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core';
import { getcustomerDetails, removecustomer } from '../redux/CustomerAction';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ToastContainer } from './dialogs/ToastContainer';
import { TOAST_ERROR, TOAST_SUCCESS } from '../config';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';

// Generate Order Data
function createData(id, FirstName, LastName, Email, nicnum,  PhoneNo, Update, Delete) {
	return { id, FirstName, LastName, Email, nicnum, PhoneNo, Update, Delete };
}

function preventDefault(event) {
	event.preventDefault();
}

function Copyright() {
	return (
    <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
            A Plus Web
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	seeMore : {
		marginTop : theme.spacing(3)
	},
	root : {
		flexGrow : 5

	},
	paper : {
		padding   : theme.spacing(2),
		textAlign : 'center',
		color     : '#95a5a6'
	},
	menuButton : {
		marginRight : theme.spacing(2)
	},
	title : {
		flexGrow                       : 1,
		display                        : 'none',
		[ theme.breakpoints.up('sm') ] : {
			display : 'block'
		}
	},
	search : {
		position        : 'relative',
		borderRadius    : theme.shape.borderRadius,
		backgroundColor : fade(theme.palette.common.white, 0.15),
		'&:hover'       : {
			backgroundColor : fade(theme.palette.common.white, 0.25)
		},
		marginLeft                     : 0,
		width                          : '100%',
		[ theme.breakpoints.up('sm') ] : {
			marginLeft : theme.spacing(1),
			width      : 'auto'
		}
	},
	searchIcon : {
		padding        : theme.spacing(0, 2),
		height         : '100%',
		position       : 'absolute',
		pointerEvents  : 'none',
		display        : 'flex',
		alignItems     : 'center',
		justifyContent : 'center'
	},
	inputRoot : {
		color : '#95a5a6'

	},

	inputInput : {
		padding                        : theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft                    : `calc(1em + ${ theme.spacing(4) }px)`,
		transition                     : theme.transitions.create('width'),
		width                          : '100%',
		[ theme.breakpoints.up('sm') ] : {
			width     : '12ch',
			'&:focus' : {
				width : '20ch'
			}
		}
	}

}));

 const CustomerLlist = ( props ) => {
  const classes = useStyles();
  const history = useHistory();
  const [ open, setOpen ] = React.useState(false);

  const updateRoute = (data) => {
	console.log(data);
	const path = 'customerupdate';
	history.push(path, data);
}

	const handleCloseCustomerRequest = () => {
		setOpen(false);
	};

	const handleClickOpenCustomerRequest = () =>
	{
		setOpen(true);
	};

	const removecustomer = (customerId) => {
		console.log(customerId);
		// eslint-disable-next-line react/prop-types
		props.removecustomer(customerId);
		// eslint-disable-next-line react/prop-types
		props.getcustomerDetails();
		handleCloseCustomerRequest();
        ToastContainer(TOAST_SUCCESS, 'Successfully Deleted')
	}

	useEffect(() => {
		console.log('Hi');
		props.getcustomerDetails();
	}, [ props ]);

	return (
    <div>
        <Navbar/>
        <div className={ 'top-5pres' }>
            <Container fixed>
                <Grid item xs={ 12 }>
                    <Paper className={ classes.paper }>
                        <React.Fragment>

                            <div className={ classes.root }>
                                <AppBar color="primary" position="relative">

                                    <Toolbar>
                                        <IconButton color="inherit" href={ 'http://localhost:3000/customeradd' }>
                                            <Fab size="small" color="secondary" aria-label="add" className={ classes.margin }>
                                                <AddIcon />
                                            </Fab>
                                        </IconButton>
                                        <Typography className={ classes.title } variant="h6" noWrap>
                                            Customers 
                                        </Typography>
                                        <div className={ classes.search }>
                                            <div className={ classes.searchIcon }>
                                                <SearchIcon />
                                            </div>
                                            <InputBase
								placeholder="Search…"
								classes={ {
									root  : classes.inputRoot,
									input : classes.inputInput
								} }
								inputProps={ { 'aria-label': 'search' } }
							/>
                                        </div>
                                    </Toolbar>
                                </AppBar>
                            </div>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Customet ID</TableCell>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>NIC</TableCell>
                                        <TableCell>Phone Number</TableCell>
                                        <TableCell>Edit</TableCell>
                                        <TableCell>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { props.customerlist.map((row) => (
                                        <TableRow key={ row.id }>
                                            <TableCell>{ row.id }</TableCell>
                                            <TableCell>{ row.fname }</TableCell>
                                            <TableCell>{ row.lname }</TableCell>
                                            <TableCell>{ row.email }</TableCell>
                                            <TableCell>{ row.id_number}</TableCell>
                                            <TableCell>{ row.phone_number }</TableCell>
                                            <TableCell>{
                                                <Button href="http://localhost:3000/customerupdate"
										variant="contained"
										color="primary"
										className={ classes.button }
										startIcon={ <EditIcon /> }
										onClick={ () => updateRoute(row) }
								>

                                                </Button>
							}</TableCell>
                                            <TableCell>{ <Button
								variant="contained"
								color="secondary"
								tooltip = 'Click here to remove user'
								className={ classes.button }
								startIcon={ <DeleteIcon /> }
								onClick={ handleClickOpenCustomerRequest }
							>

                                            </Button>
							} </TableCell>
                                            <Dialog
								open={ open }
								onClose={ handleCloseCustomerRequest }
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
							>
                                                <DialogTitle id="alert-dialog-title">{'Are you sure you want delete this Customer?'}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">

                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={ removecustomer.bind(null, row.id) } color="primary">
                                                        Yes
                                                    </Button>
                                                    <Button onClick={ handleCloseCustomerRequest } color="primary" autoFocus>
                                                        No
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>

                                        </TableRow>
					))
					}
                                </TableBody>
                            </Table>
                        </React.Fragment>
                    </Paper>
                </Grid>
            </Container>
        </div>
    </div>
	);
}
const mapStateToProps = (state) => ({
	customerlist : state.customer.customerlist
})

export default connect(mapStateToProps, { removecustomer, getcustomerDetails })(CustomerLlist);