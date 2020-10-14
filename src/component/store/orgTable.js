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
import { getBranchInformation, removeBranch } from '../../redux/branchActions';
import { useHistory } from 'react-router-dom';
import storeAdd from '../storeAdd';
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
import { getOrgInformation, removeOrg } from '../../redux/orgActions';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';

// Generate Order Data
function createData(id, OrgName, Location, Update, Delete) {
	return { id, OrgName, Location, Update, Delete };
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

const orgTable = ( props ) => {

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const classes = useStyles();
	// eslint-disable-next-line react-hooks/rules-of-hooks
	//const history = useHistory();
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [ open, setOpen ] = React.useState(false);
	//const navigateTo = () => history.push('/storeUpdate');

	// const updateRoute = () => {
	// 	const path = 'storeUpdate';
	// 	history.push(path);
	// }
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	const handleClickOpen = () =>
	{
		setOpen(true);
	};

	const handleClose = () =>
	{
		setOpen(false);
	};

	const DeleteOrg = (id) => {
		console.log(id);
		props.removeOrg(id);
		props.getOrgInformation();
		handleClose();
		ToastContainer(TOAST_SUCCESS, 'Successfully Deleted!');
	}
	const updateRoute = (data) => {
		console.log(data);
		const path = 'updateOrganization';
		history.push(path, data);
	}
	// const Updatebranch = (id) => {
	// 	console.log(id);
	// 	props.getOrgInformation();
	// }

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		console.log('DDDD');
		props.getOrgInformation();
	}, [ 1 ]);

	return (
    <div>
        <Navbar/>
        <div className={ 'top-5pres' }>
            <Container fixed>
                <Grid item xs={ 12 }  >
                    <Paper className={ fixedHeightPaper }>
                        <React.Fragment>
                            <Grid container component="main" className={ classes.root }>
                                <div className={ classes.root }>
                                    <AppBar color="primary" position="relative">

                                        <Toolbar>

                                            <Typography className={ classes.title } variant="h6" noWrap>
                                                Orgnization Details
                                            </Typography>
                                            <Button href="http://localhost:3000/organization"
											variant="contained"
											color="secondary"
									> Add</Button>
                                        </Toolbar>
                                    </AppBar>
                                </div>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Organization ID</TableCell>
                                            <TableCell>Organization Name</TableCell>
                                            <TableCell>Location</TableCell>

                                            <TableCell>Edit</TableCell>
                                            <TableCell>Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        { props.orgList.map((row) => (
                                            <TableRow key={ row.id }>
                                                <TableCell>{ row.id }</TableCell>
                                                <TableCell><Button href="http://localhost:3000/storeDashboard"
																   variant="contained">{ row.orgName }</Button></TableCell>
                                                <TableCell>{ row.orgLocation }</TableCell>

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
                                                        <Button onClick={ DeleteOrg.bind(null, row.id) } color="primary">
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
                    </Paper>
                </Grid>
            </Container>
        </div>
    </div>

	);
}
const mapStateToProps = (state) => ({
	orgList : state.org.orgList
})

export default connect(mapStateToProps, { removeOrg, getOrgInformation })(orgTable);
