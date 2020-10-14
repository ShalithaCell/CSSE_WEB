import React from 'react';
import MaterialTable from 'material-table';
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
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, Container } from '@material-ui/core';
import Navbar from '../navbar';
import { useEffect, useState } from 'react';
//import { connect } from 'formik';
import { connect } from 'react-redux';
import { ADD_SALARY, VIEW_SALARY, DELETE_SALARY } from '../../redux/actionTypes';
import { addSalary, viewSalary, deleteSal } from '../../redux/salaryActions';
import { salaryReducer } from '../../redux/reducers/salaryReducer';
import '../../redux/reducers/index';
import EditIcon from '@material-ui/icons/EditTwoTone';
import AddIcon from '@material-ui/icons/Add';
import './editTrans';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/DeleteTwoTone';
import { useHistory } from 'react-router-dom';

const useStyles =  makeStyles((theme) => ({
  table : {
    width     : '100%',
    marginTop : '2%',
    padding   : '5%' 
  },
  title : {
    align : 'left',
    width : '100px'
  },
  root : {
    flexGrow  : 5,
    marginTop : theme.spacing ( -15 )

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
		padding        : theme.spacing( 2 ),
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
	}
}));

const ViewSalaries = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [ activeStep, setActiveStep ] = React.useState(0);

  const handleNext = () => {
      setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
      setActiveStep(activeStep - 1);
  };

   const deleteSalary = (id) => {
       console.log(id);
       props.deleteSal(id);
       props.viewSalary();
   }
   const updateRoute = (data) => {
    console.log(data);
    const path = 'editSalary';
    history.push(path, data);
}
  const [ values, setvalues ] = useState ()

  useEffect(() => {
      console.log('aaa');
      props.viewSalary();
  }, [  ])

  return (

      <Container component="main" maxWidth="sx">
          <Navbar />
          <Container maxWidth="$" >
              // eslint-disable-next-line react/jsx-indent
              <Typography component="div" className={ classes.table } />
              <React.Fragment>
                  <div className={ classes.root }>
                      <AppBar position="relative">
                          <div>
                              <navbar />
                          </div>
                          <Toolbar>
                              <Typography className={ classes.title } variant="h7" noWrap>
                                  Salary Management Details
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
                                                        onClick={ (event) =>  window.location.href='/addSalary' }
                                                        className={ classes.button }>
                                  <AddIcon/>
                              </Button>
                          </Toolbar>
                      </AppBar>
                  </div>
                  <TableContainer component={ Paper }>
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
                                  <TableCell>Salary_id</TableCell>
                                  <TableCell>Name</TableCell>
                                  <TableCell>Designation</TableCell>
                                  <TableCell>Employee ID</TableCell>
                                  <TableCell align="right">Basic</TableCell>
                                  <TableCell>Attendance</TableCell>
                                  <TableCell align="right">Bonus</TableCell>
                                  <TableCell align="right">For_month</TableCell>
                                  <TableCell align="right">Paid_date</TableCell>
                                  <TableCell align="right">Total</TableCell>

                              </TableRow>
                          </TableHead>
                          <TableBody>
                              { props.list.map((row) => {
                                  return(
                                      <TableRow  key= { row.id }>
                                          <TableCell>
                                              <React.Fragment>
                                                  <Button
                                                      variant="contained"
                                                      color="purple"
                                                      onClick = { () => updateRoute(row) }
                                                      >
                                                      < EditIcon /> 
                                                  </Button>

                                                  <Button
                                                      variant="contained"
                                                      color="secondary"
                                                      onClick={ deleteSalary.bind(null, row.id) }
                                                      className={ classes.button }>
                                                      <DeleteIcon /> 
                                                  </Button>
                                                 
                                              </React.Fragment>
                                          </TableCell>

                                          <TableCell>{row.id}</TableCell>
                                          <TableCell>{row.name}</TableCell>
                                          <TableCell>{row.designation}</TableCell>
                                          <TableCell>{row.eid}</TableCell>
                                          <TableCell>{row.basic}</TableCell>
                                          <TableCell>{row.attendance}</TableCell>
                                          <TableCell>{row.bonus}</TableCell>
                                          <TableCell align="right">{row.for_month}</TableCell>
                                          <TableCell align="right">{row.registedDate}</TableCell>
                                          <TableCell align="right">{(row.total)}</TableCell>
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
  return { list: state.salary.list }
}
// mapActionToProps = {
//     viewTrans : ViewTransaction
// }
export default connect(mapStateToProps, { viewSalary, deleteSal })(ViewSalaries);