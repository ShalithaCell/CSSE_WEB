import React, { useState, useEffect  } from 'react';
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
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core';
import { getSupplier, removeSupplier } from '../redux/supplierActions';
import Navbar from './navbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

// Generate Order Data
function createData(id, FirstName, LastName, Email, Category, Area, PhoneNo, Update, Delete) {
	return { id, FirstName, LastName, Email, Category, Area, PhoneNo, Update, Delete };
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

 const SupplierList = ( props ) => {
	const classes = useStyles();
	 const history = useHistory();

	const DeleteSupplier = (id) => {
		console.log(id);
		props.removeSupplier(id);
		props.getSupplier();
	}
	 const updateRouteSupplier = (data) => {
		 console.log(data);
		 const path = 'updateSupplier';
		 history.push(path, data);
	 }

	useEffect(() => {
		//console.log('Hi');
		props.getSupplier();
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
                                        <IconButton color="inherit" href={ 'http://localhost:3000/addSupplier' }>
                                            <Fab size="small" color="secondary" aria-label="add" className={ classes.margin }>
                                                <AddIcon />
                                            </Fab>
                                        </IconButton>

                                        <Typography className={ classes.title } variant="h6" noWrap>
                                            Supplier Details
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
                                        <TableCell>Supplier ID</TableCell>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Category</TableCell>
                                        <TableCell>Area</TableCell>
                                        <TableCell>Phone Number</TableCell>
                                        <TableCell>Edit</TableCell>
                                        <TableCell>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { props.supplierLists.map((row) => (
                                        <TableRow key={ row.id }>
                                            <TableCell>{ row.id }</TableCell>
                                            <TableCell>{ row.fname }</TableCell>
                                            <TableCell>{ row.lname }</TableCell>
                                            <TableCell>{ row.email }</TableCell>
                                            <TableCell>{ row.category }</TableCell>
                                            <TableCell>{ row.area }</TableCell>
                                            <TableCell>{ row.phoNumber }</TableCell>
                                            <TableCell>{
                                                <Button
										variant="contained"
										color="primary"
										className={ classes.button }
										startIcon={ <EditIcon /> }
														onClick={ () => updateRouteSupplier(row) }
												>

                                                </Button>
							}</TableCell>
                                            <TableCell>{ <Button
								variant="contained"
								color="secondary"
								tooltip = 'Click here to remove supplier'
								className={ classes.button }
								startIcon={ <DeleteIcon /> }
								onClick={ DeleteSupplier.bind(null, row.id) }
							>

                                            </Button>
							} </TableCell>

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
	supplierLists : state.supplier.supplierLists
})

export default connect(mapStateToProps, { removeSupplier, getSupplier })(SupplierList);
