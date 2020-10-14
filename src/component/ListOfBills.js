import React, { useState, useEffect  } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
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
import { getbill, removebill } from '../redux/billActions';
import { useDispatch } from 'react-redux';
import Navbar from './navbar';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ToastContainer } from './dialogs/ToastContainer';
import { TOAST_ERROR, TOAST_SUCCESS } from '../config';

// Generate Order Data
function createData(id, Description, Qty, UnitPrice, Sum, SubTotal, Discount, Total, Delete) {
	return { id, Description, Qty, UnitPrice, Sum, SubTotal, Discount, Total, Delete };
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

const BillList = ( props ) => {
	const [ open, setOpen ] = React.useState(false);

	const handleclosebillwarning = () => {
		setOpen(false);
	};

	const handleClickOpenBillWarning= () =>
	{
		setOpen(true);
	};
	const classes = useStyles();

	const Deletebill = (id) => {
		console.log(id);
		props.removebill(id);
		props.getbill();
		handleclosebillwarning();
		ToastContainer(TOAST_SUCCESS, "Successfully Deleted Bill")
	}

	useEffect(() => {
		//console.log('Hi');
		props.getbill();
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
                                        <IconButton color="inherit" href={ 'http://localhost:3000/home' }>
                                            <Fab size="small" color="secondary" aria-label="add" className={ classes.margin }>
                                                <AddIcon />
                                            </Fab>
                                        </IconButton>
                                        <Typography className={ classes.title } variant="h6" noWrap>
                                            List of All Bills
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
                                        <TableCell>ID</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Qty</TableCell>
                                        <TableCell>UnitPrice</TableCell>
                                        <TableCell>Sum</TableCell>
                                        <TableCell>SubTotal</TableCell>
                                        <TableCell>Discount</TableCell>
                                        <TableCell>Total</TableCell>
                                        <TableCell>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { props.billLists.map((row) => (
                                        <TableRow key={ row.id }>
                                            <TableCell>{ row.id }</TableCell>
                                            <TableCell>{ row.description }</TableCell>
                                            <TableCell>{ row.qty }</TableCell>
                                            <TableCell>{ row.unitPrice }</TableCell>
                                            <TableCell>{ row.sum }</TableCell>
                                            <TableCell>{ row.subTotal }</TableCell>
                                            <TableCell>{ row.discount }</TableCell>
                                            <TableCell>{ row.total }</TableCell>
                                            <TableCell align='left'>{ <Button
								variant="contained"
								color="secondary"
								tooltip = 'Click here to remove bill'
								className={ classes.button }
								startIcon={ <DeleteIcon /> }
								onClick={ handleClickOpenBillWarning }
							>

                                            </Button>
							} </TableCell>
                                            <Dialog
												open={ open }
												onClose={ handleclosebillwarning }
												aria-labelledby="alert-dialog-title"
												aria-describedby="alert-dialog-description"
											>
                                                <DialogTitle id="alert-dialog-title">{'Delete with Super-Admin Permission?'}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">

                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={ Deletebill.bind(null, row.id) } color="primary">
                                                        Yes
                                                    </Button>
                                                    <Button onClick={ handleclosebillwarning } color="primary" autoFocus>
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
	billLists : state.bill.billLists
})

export default connect(mapStateToProps, { removebill, getbill })(BillList);
