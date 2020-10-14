import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Navbar from './navbar';
import { connect } from 'react-redux';
import { REMOVE_REQUEST_ENDPOINT } from '../config';
import { removeRequest, getRequestInformation, updateRequest } from '../redux/requestActions';
import { ToastContainer } from './dialogs/ToastContainer';
import { TOAST_ERROR, TOAST_SUCCESS } from '../config';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles({
  table : {
    minWidth : 650
  }
});

function createData(name, lastName, email, Address, PhoneNumber, Role, Action) {
  return { name, lastName, email, Address, PhoneNumber, Role, Action };
}

 const EmployeeRequest = ( props ) => {
 const classes = useStyles();
 const history = useHistory();
    const [ open, setOpen ] = React.useState(false);
    const updateRouteRequest = (data) => {
		console.log(data);
		const path = 'UpdateRequest';
		history.push(path, data);
	}

	const handleCloseEmployeeRequest = () => {
		setOpen(false);
	};

	const handleClickOpenEmployeeRequest = () =>
	{
		setOpen(true);
	};
    const DeleteRequest = (id) => {
        console.log(id);
        props.removeRequest(id);
        props.getRequestInformation();
        handleCloseEmployeeRequest();
        ToastContainer(TOAST_SUCCESS, "Successfully Deleted")
    }
    useEffect( () => {
        console.log("DDDD");
        props.getRequestInformation();
     },  [] );
     
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
                                        <IconButton color="inherit" href={ 'http://localhost:3000/AddRequest' }>
                                            <Fab size="small" color="secondary" aria-label="add" className={ classes.margin }>
                                                <AddIcon />
                                            </Fab>
                                        </IconButton>
                                        <Typography className={ classes.title } variant="h6" noWrap>
                                            Employee Details
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
                                        <TableCell>First Name</TableCell>
                                        <TableCell >Last Name</TableCell>
                                        <TableCell >Email</TableCell>
                                        <TableCell >Address</TableCell>
                                        <TableCell >Phone Number</TableCell>
                                        <TableCell >Role</TableCell>
                                        <TableCell ></TableCell>
                                        <TableCell ></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.requestList.map((row) => (
                                        <TableRow key={ row.id }>
                                
                                            <TableCell >{row.firstName}</TableCell>
                                            <TableCell >{row.lastName}</TableCell>
                                            <TableCell >{row.email}</TableCell>
                                            <TableCell >{row.address}</TableCell>
                                            <TableCell >{row.phoneNumber}</TableCell>
                                            <TableCell >{row.role} </TableCell>
                                            <TableCell>{<Button variant="contained" color="primary" size="small" onClick={ handleClickOpenEmployeeRequest } >
                                                DELETE
                                            </Button>}</TableCell>
                                            <Dialog
								open={ open }
								onClose={ handleCloseEmployeeRequest }
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
							>
                                                <DialogTitle id="alert-dialog-title">{'Are you sure you want delete this order?'}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">

                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={ DeleteRequest.bind(null, row.id) } color="primary">
                                                        Yes
                                                    </Button>
                                                    <Button onClick={ handleCloseEmployeeRequest } color="primary" autoFocus>
                                                        No
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                            <TableCell>{ <Button variant="contained" color="primary" size="small" onClick={ () => updateRouteRequest(row) }
>
                                                UPDATE
                                            </Button>}</TableCell>
                                        </TableRow>

          ))}
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
//};
const mapStateToProps = (state) => ({
    requestList : state.request.requestList
})

export default connect(mapStateToProps, { removeRequest, getRequestInformation }) (EmployeeRequest);
