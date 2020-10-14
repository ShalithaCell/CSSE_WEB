/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Title from './title'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, Container } from '@material-ui/core';
import Navbar from '../navbar';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/EditTwoTone';
import DeleteIcon from '@material-ui/icons/DeleteTwoTone';
import purple from '@material-ui/core/colors/purple';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { ADD_TRANS, VIEW_TRANS, UPDATE_TRANS, DELETE_TRANS } from '../../redux/actionTypes';
import { addTrans, deleteTrans, viewTrans, updateTrans } from '../../redux/transactionActions';
import { transactionReducer } from '../../redux/reducers/transactionReducer';
import { useEffect, useState } from 'react';
import '../../redux/reducers/index';
import Router, { useRouter }  from 'react';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import './editTrans';
const TAX_RATE = 0.07;

const useStyles = makeStyles((theme) => ({
    table : {
        width      : '100%',
        paddingTop : '2%',
        padding    : '5%'
    },
    title : {
        align : 'left',
        width : theme.spacing(35)
    },
    root : {
        flexGrow  : 5,
        marginTop : theme.spacing(-5)

    },
    search : {
        position        : 'relative',
        borderRadius    : theme.shape.borderRadius,
        backgroundColor : fade(theme.palette.common.white, 0.15),
        '&:hover'       : {
            backgroundColor : fade(theme.palette.common.white, 0.25)
        },
        marginLeft                     : theme.spacing(5),
        width                          : '100%',
        [ theme.breakpoints.up('sm') ] : {
            marginLeft : theme.spacing(155),
            width      : 'auto'
        }
    },
    searchIcon : {
        padding        : theme.spacing(2),
        height         : '100%',
        position       : 'absolute',
        pointerEvents  : 'none',
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center'
    },
    inputRoot : {
        color : 'inherit'
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
    },
    button : {
        marginTop : theme.spacing(1)
    }
}));

const steps = [ 'Edit', 'Delete' ];

function getStepContent(step) {
    <editTrans />
}

function ccyFormat(num) {
    //return `${ num.toFixed(2) }`;
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(transid, desc, userid, date, time, qty, unit) {
    const price = priceRow(qty, unit);
    return { transid, desc, userid, date, time, qty, unit, price };
}

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const ViewTransaction = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [ activeStep, setActiveStep ] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const deleteTrans = (id) => {
        console.log(id);
        props.deleteTrans(id);
        props.viewTrans();
    }

    const updateRoute = (data) => {
           console.log(data);
           const path = 'editTrans';
           history.push(path, data);
    }

    useEffect(() => {
        console.log('aaa');
        props.viewTrans();
    }, [  ])

    return (

        <Container component="main" maxWidth="sx">
            <Navbar />
            <Container maxWidth="$" >
                // eslint-disable-next-line react/jsx-indent
                <Typography component="div" className={ classes.table } />
                <React.Fragment >
                    <div className={ classes.root }>
                        <AppBar position="relative">
                            <div>
                                <navbar />
                            </div>
                            <Toolbar>
                                <Typography className={ classes.title } variant="h7" noWrap>
                                    Transactions
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
                                <Button
                                                        variant="contained"
                                                        color="purple"
                                                        onClick={ (event) =>  window.location.href='/addTrans' }
                                                        className={ classes.button }>
                                    <AddIcon/>
                                </Button>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <TableContainer component={ Paper } >
                        <Table className={ classes.table } aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" colSpan={ 5 }>
                                        Details
                                    </TableCell>
                                    <TableCell align="right" colSpan={ 5 }>Price</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell>Edit / Delete</TableCell>
                                    <TableCell>Trans_ID</TableCell>
                                    <TableCell>Des</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>User ID</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell align="right">Qty.</TableCell>
                                    <TableCell align="right">Unit</TableCell>
                                    <TableCell align="right">Sum</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { props.list.map((row) => {
                                    return(
                                        <TableRow  key= { row.id }>
                                            <TableCell>
                                                <React.Fragment>
                                                    {getStepContent(activeStep)}
                                                    <div className={ classes.buttons }>

                                                        <Button
                                                        variant="contained"
                                                        color="purple"
                                                        onClick = { () => updateRoute(row) }
                                                        className={ classes.button }>
                                                            <EditIcon />
                                                        </Button>

                                                        <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={ deleteTrans.bind(null, row.id) }
                                                        className={ classes.button }>
                                                            <DeleteIcon />
                                                        </Button>
                                                    </div>
                                                </React.Fragment>
                                            </TableCell>

                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.description}</TableCell>
                                            <TableCell>{row.registedDate}</TableCell>
                                            <TableCell>{row.user_ID}</TableCell>
                                            <TableCell>{row.registedDate}</TableCell>
                                            <TableCell align="right">{row.quantity}</TableCell>
                                            <TableCell align="right">{row.unit_price}</TableCell>
                                            <TableCell align="right">{row.quantity * row.unit_price}</TableCell>
                                        </TableRow>)
                                }
                                )}

                                {/* <TableRow align="right">
                                    <TableCell rowSpan={ 3 } />
                                    <TableCell colSpan={ 6 } align="right">Subtotal</TableCell>
                                    <TableCell colSpan={ 5 } align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                                </TableRow>
                                <TableRow align="right">
                                    <TableCell colSpan={ 6 } align="right">Tax</TableCell>
                                    <TableCell colSpan={ 1 } align="right">{`${ (TAX_RATE * 100).toFixed(0) } %`}</TableCell>
                                    <TableCell colSpan={ 3 } align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                                </TableRow>
                                <TableRow align="right">
                                    <TableCell colSpan={ 6 } align="right">Total</TableCell>
                                    <TableCell colSpan={ 5 } align="right" >{ccyFormat(invoiceTotal)}</TableCell>
                                </TableRow> */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </React.Fragment>
            </Container>
        </Container>
    );
}
const mapStateToProps = (state) => {
    return { list: state.transaction.list }
}
// mapActionToProps = {
//     viewTrans : ViewTransaction
// }
export default connect(mapStateToProps, { viewTrans, deleteTrans })(ViewTransaction);