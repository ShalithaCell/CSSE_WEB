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
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core';
import { getBranchInformation, removeBranch, updateBranch } from '../../redux/branchActions';
import { useHistory } from 'react-router-dom';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { ToastContainer } from '../dialogs/ToastContainer';
import { TOAST_ERROR, TOAST_SUCCESS } from '../../config';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Navbar from '../navbar';

// Generate Order Data
function createData(id, BranchName, Location, PhoneNo, NoofEmployees, Update, Delete) {
	return { id, BranchName, Location, PhoneNo, NoofEmployees, Update, Delete };
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

const StoreChart = ( props ) => {

	const classes = useStyles();
	const history = useHistory();
	const [ open, setOpen ] = React.useState(false);
	//const navigateTo = () => history.push('/storeUpdate');

	const updateRoute = (data) => {
		console.log(data);
		const path = 'storeUpdate';
		history.push(path, data);
	}

	const handleClickOpen = () =>
	{
		setOpen(true);
	};

	const handleClose = () =>
	{
		setOpen(false);
	};

	const Deletebranch = (id) => {
		console.log(id);
		props.removeBranch(id);
		props.getBranchInformation();
		handleClose();
		ToastContainer(TOAST_SUCCESS, 'Successfully Deleted!');
	}

	useEffect(() => {
		console.log('DDDD');
	 	props.getBranchInformation();
	}, [ history ]);

	return (

    <React.Fragment>
        <Grid container component="main" className={ classes.root }>
            <div className={ classes.root }>
                <AppBar color="primary" position="relative">

                    <Toolbar>

                        <Typography className={ classes.title } variant="h6" noWrap>
                            Branch Details
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
                        <TableCell>Branch ID</TableCell>
                        <TableCell>Branch Name</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>No of Employees</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { props.branchList.map((row) => (
                        <TableRow key={ row.id }>
                            <TableCell>{ row.id }</TableCell>
                            <TableCell>{ row.branchName }</TableCell>
                            <TableCell>{ row.branchLocation }</TableCell>
                            <TableCell>{ row.branchPhone }</TableCell>
                            <TableCell>{ row.noofEmployees }</TableCell>
                            <TableCell>{
                                <Button
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
								onClick={ handleClickOpen }
							>

                            </Button>
							} </TableCell>
                            <Dialog
							open={ open }
							onClose={ handleClose }
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
						>
                                <DialogTitle id="alert-dialog-title">{'Are you sure you want delete this Branch?'}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">

                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={ Deletebranch.bind(null, row.id) } color="primary">
                                        Yes
                                    </Button>
                                    <Button onClick={ handleClose } color="primary" autoFocus>
                                        No
                                    </Button>
                                </DialogActions>
                            </Dialog>

                        </TableRow>
					))
					}
                </TableBody>
            </Table>
        </Grid>
    </React.Fragment>
            );
}
const mapStateToProps = (state) => ({
	branchList : state.branch.branchList
})

export default connect(mapStateToProps, { removeBranch, getBranchInformation })(StoreChart);
