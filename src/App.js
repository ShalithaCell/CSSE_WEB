import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import logo from './logo.svg';
import { connect } from 'react-redux';
import { setUserState } from './redux/userActions';
import { IsAuthenticated } from './services/authenticationService';
import Loader from 'react-loader-spinner'
import './App.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import home from './component/home'
import login from './component/login'
import checkout from './component/payments/checkout'
import ViewTransaction from './component/payments/transactions'
import payment_form from './component/payments/payment_form'
import review from './component/payments/review'
import salary_management from './component/payments/salary_management'
import addSupplier from './component/addSupplier'
import informSupplier from './component/informSupplier'
import Attendance from './component/Attendance'
import EmployeeRequest from './component/EmployeeRequest'
import AddRequest from './component/AddRequest'
import UpdateRequest from './component/UpdateRequest'
import Customeradd from './component/customeradd'
import CustomerLlist from './component/customer_list'
import storeAdd from './component/storeAdd'
import storeChart from './component/store/storeChart'
import storeUpdate from './component/storeUpdate';
import Register from './component/user/register';
import RegisterRole from './component/role/registerRole';
import SessionExpire from './component/sessionExpire';
import InventoryList from './component/updateinventory';
import dashboard from './component/dashboard'
import storeDashboard from './component/storeDashboard';
import map from './component/store/map';
import storePlan from './component/storePlan';
import addinventory from './component/addinventory';
import listOfRoles from './component/role/listOfRoles';
import listOfUsers from './component/user/listOfUsers';
import { ToastContainer } from 'react-toastify';
import SupplierList from './component/SupplierList';
import attendance_Dashbord from './component/attendance_Dashbord';
import Absent_Attendance from './component/Absent_Attendance';
import Latecomers_Attendance from './component/Latecomers_Attendance';
import EarlyLevers_Attendance from './component/EarlyLevers_Attendance';
import ConfirmationDialogs from './component/dialogs/confirmationDialogs';
import UserProfile from './component/user/userProfile';
import editTrans from './component/payments/editTrans'
import addTrans from './component/payments/addTrans'
import deleteTrans from './component/payments/deleteTrans'
import inventoryUpdateTable from './component/inventoryUpdateTable';
import storeTable from './component/store/storeTable';
import storepie from './component/store/storepie';
import storeBar from './component/store/storeBar';
import ListOfBills from './component/ListOfBills';
import addSalary from './component/payments/addSalary';
import editSalary from './component/payments/editSalary'
import orgTable from './component/store/orgTable';
import addOrg from './component/addOrg';
import AddAttendance from './component/AddAttendance'
import UpdateAttendance from './component/UpdateAttendance'
import updateSupplier from './component/updateSupplier';
import orgUpdate from './component/store/orgUpdate';
import CustomerUpdate from './component/CustomerUpdate'

class App extends Component {

	constructor(props) {
		super(props)
		this.state = { auth: false }
	}

	render(){
		return (
    <BrowserRouter>
        <div className="App">
            { IsAuthenticated(this.props.setUserState) ?
                <Switch>
                    <Route exact path='/login' component={ login } />
                    <Route exact path= '/storeAdd' component={ storeAdd }/>
                    <Route exact path= '/storeChart' component={ storeChart }/>
                    <Route exact path= '/storeUpdate' component={ storeUpdate } />
                    <Route exact path='/' component={ home } />
                    <Route exact path='/home' component={ home }/>
                    <Route exact path='/register' component={ Register }/>
                    <Route exact path='/registerRole' component={ RegisterRole }/>
                    <Route exact path='/roles' component={ listOfRoles }/>
                    <Route exact path='/customeradd' component={ Customeradd } />
                    <Route exact path='/EmployeeRequest' component={ EmployeeRequest } />
                    <Route exact path='/AddRequest' component={ AddRequest } />
                    <Route exact path='/UpdateRequest' component={ UpdateRequest } />
                    <Route exact path='/Attendance' component={ Attendance } />
                    <Route exact path='/addinventory' component={ addinventory } />
                    <Route exact path ='/storePlan' component={ storePlan }/>
                    <Route exact path='/addSupplier' component={ addSupplier } />
                    <Route exact path='/informSupplier' component={ informSupplier } />
                    <Route exact path='/updateinventory' component={ InventoryList } />
                    <Route exact path='/dashboardInventory' component={ dashboard } />
                    <Route exact path= '/storeDashboard' component={ storeDashboard } />
                    <Route exact path= '/storePlan' component={ map } />
                    <Route exact path='/checkout' component={ checkout } />
                    <Route exact path='/payment_form' component={ payment_form } />
                    <Route exact path='/review' component={ review } />
                    <Route exact path='/transactions' component={ ViewTransaction } />
                    <Route exact path='/salary_management' component={ salary_management } />
                    <Route exact path='/SupplierList' component={ SupplierList } />
                    <Route exact path='/users' component={ listOfUsers } />
                    <Route exact path='/customeradd' component={ Customeradd } />
                    <Route exact path='/customer_list' component={ CustomerLlist } />
                    <Route exact path='/attendance_Dashbord' component={ attendance_Dashbord } />
                    <Route exact path='/Absent_Attendance' component={ Absent_Attendance } />
                    <Route exact path='./Latecomers_Attendance' component={ Latecomers_Attendance } />
                    <Route exact path='./EarlyLevers_Attendance' component={ EarlyLevers_Attendance } />
                    <Route exact path='/confirm' component={ ConfirmationDialogs } />
                    <Route exact path='/userProfile' component={ UserProfile } />
                    <Route exact path='/editTrans' component={ editTrans } />
                    <Route exact path='/deleteTrans' component={ deleteTrans } />
                    <Route exact path='/addTrans' component={ addTrans } />
                    <Route exact path='/addSalary' component={ addSalary } />
                    <Route exact path='/tableInventory' component={ inventoryUpdateTable }/>
                    <Route exact path= '/storeBar' component={ storeBar }/>
                    <Route exact path= '/storepie' component={ storepie }/>
                    <Route exact path= '/ListOfBills' component={ ListOfBills }/>
                    <Route exact path= '/editSalary' component={ editSalary }/>
                    <Route exact path= '/organization' component={ addOrg }/>
                    <Route exact path= '/orgTable' component={ orgTable }/>
                    <Route exact path= '/AddAttendance' component={ AddAttendance }/>
                    <Route exact path= '/UpdateAttendance' component={ UpdateAttendance }/>
                    <Route exact path= '/updateSupplier' component={ updateSupplier }/>
                    <Route exact path= '/updateOrganization' component={ orgUpdate } />
                    <Route exact path='/customerupdate' component={ CustomerUpdate } />
                </Switch>
						:
                <Switch>
                    <Route exact path='/confirm' component={ ConfirmationDialogs } />
                    <Route component={ login } />
                </Switch>
					}
            {this.props.loader ?
                <div className="to-center">
                    <Loader
								type="Triangle"
								color="#00BFFF"
								height={ 200 }
								width={ 200 }
								visible={ true }
							/>
                </div>
						:
                <div></div>
					}
            <SessionExpire />
            <ToastContainer />
        </div>
    </BrowserRouter>
		);
	}
}

const mapStateToProps = (state) => ({
	loader : state.system.loader
})

export default connect(mapStateToProps, { setUserState })(App);
