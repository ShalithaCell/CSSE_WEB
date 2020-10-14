//api url
export const API_TARGET = 'https://localhost:44317/api/';

//Encryption secret key
export const SECRET_KEY = 'cbM2vLOTDUzL0nebSMH7Mutv7MY41HgOnzzF3VYv';

//local storage identification
export const IDENTIFICATION_STORAGE = '27761234452352463563452566';

//toast types
export const TOAST_SUCCESS = 'Success';
export const TOAST_ERROR = 'Error';
export const TOAST_WARN = 'Warning';
export const TOAST_INFO = 'Info';

//API end-points
export const LOGIN_ENDPOINT = API_TARGET +'users/authenticate';
export const PASSWORD_RESET_ENDPOINT = API_TARGET +'users/resetPassword';
export const GET_ROLE_LIST_ENDPOINT = API_TARGET +'roles/getRoles';
export const REGISTER_NEW_ROLE_ENDPOINT = API_TARGET +'roles/registerRole';
export const GET_ROLE_ENDPOINT = API_TARGET +'roles/getRoleInfomation';
export const UPDATE_ROLE_ENDPOINT = API_TARGET +'roles/updateRole';
export const REMOVE_ROLE_ENDPOINT = API_TARGET +'roles/removeRole';
export const GET_PERMISSON_LEVELS__ENDPOINT = API_TARGET +'users/getPermissonSet';

export const ADD_BILL_TRANSACTION_ENDPOINT = API_TARGET +'cashier/addBill';

export const ADD_SUPPLIER_ENDPOINT = API_TARGET +'supplier/addSupplier';
export const REMOVE_SUPPLIER_ENDPOINT = API_TARGET +'supplier/removeSupplier';
export const GET_SUPPLIER_ENDPOINT = API_TARGET +'supplier/getSupplier';
export const UPDATE_SUPPLIER_DETAILS_ENDPOINT = API_TARGET +'supplier/addSupplier';

export const ADD_TRANSACTION_ENDPOINT = API_TARGET + 'transaction/addTransaction';
export const VIEW_TRANSACTION_ENDPOINT = API_TARGET + 'transaction/getTransactionInfomation';
export const UPDATE_TRANSACTION_ENDPOINT = API_TARGET + 'transaction/updateTransactions';
export const DELETE_TRANSACTION_ENDPOINT = API_TARGET + 'transaction/deleteTransactions';

export const ADD_SALARY_ENDPOINT = API_TARGET + 'salary/addSalary';
export const VIEW_SALARY_ENDPOINT = API_TARGET + 'salary/getSalaryInfomation';
export const DELETE_SALARY_ENDPOINT = API_TARGET + 'salary/deleteSalaries';
export const UPDATE_SALARY_ENDPOINT = API_TARGET + 'salary/updateSalaries';

export const SYNC_USER_LIST_ENDPOINT = API_TARGET +'users/getAllUsers';
export const SYNC_USER_Name_LIST_ENDPOINT = API_TARGET +'users/getUserNames';
export const REGISTER_USER_ENDPOINT = API_TARGET +'users/registerUser';
export const GET_USER_ENDPOINT = API_TARGET +'users/getSpecificUser';
export const UPDATE_USER_ENDPOINT = API_TARGET +'users/updateUser';
export const REMOVE_USER_ENDPOINT = API_TARGET +'users/removeUser';
export const CONFIRM_EMAIL_USER_ENDPOINT = API_TARGET +'users/confirmEmailAddress';
export const CONFIRM_PASSWORD_RESET_TOKEN_ENDPOINT = API_TARGET +'users/checkPasswordResetToken';
export const RESET_USER_PASSWORD_ENDPOINT = API_TARGET +'users/resentUserPassword';

export const ADD_REQUEST = API_TARGET +'requestAdd/addRequests';
export const GET_REQUEST_ENDPOINT = API_TARGET +'requestAdd/getRequestInfomation';
//export const GET_REQUEST_ENDPOINT = API_TARGET +'requestAdd/addRequests';
export const UPDATE_REQUEST_ENDPOINT = API_TARGET +'requestAdd/updateRequest';
export const REMOVE_REQUEST_ENDPOINT = API_TARGET +'requestAdd/removeRequest';

export const ADD_ATTENDANCE = API_TARGET +'attendance/addAttendance';
export const GET_ATTENDANCE_ENDPOINT = API_TARGET +'attendance/getAttendanceInfomation';
export const UPDATE_ATTENDANCE_ENDPOINT = API_TARGET +'attendance/updateAttendance';
export const REMOVE_ATTENDANCE_ENDPOINT = API_TARGET +'attendance/removeAttendance';

export const ADD_BRANCH_ENDPOINT = API_TARGET+'branch/addBranch';
export const GET_BRANCH_ENDPOINT = API_TARGET+'branch/getBranch';
export const UPDATE_BRANCH_DETAILS_ENDPOINT = API_TARGET+ 'branch/updateBranch';
export const UPDATE_BRANCH_ENDPOINT = API_TARGET+ 'branch/updateBranch';
export const REMOVE_BRANCH_ENDPOINT = API_TARGET+ 'branch/deleteBranch';

export const ADD_ORG_ENDPOINT = API_TARGET+'org/addOrg';
export const GET_ORG_ENDPOINT = API_TARGET+'org/getOrg';
export const UPDATE_ORG_DETAILS_ENDPOINT = API_TARGET+ 'org/updateOrg';
export const REMOVE_ORG_ENDPOINT = API_TARGET+ 'org/deleteOrg';

export const ADD_BRANCH = API_TARGET+'branch/addBranch';
export const ADD_INVENTORY_ENDPOINT = API_TARGET +'inventory/addInventory';
export const UPDATE_INVENTORY_ENDPOINT = API_TARGET + 'inventory/updateInventory';
export const REMOVE_INVENTORY_ENDPOINT = API_TARGET + 'inventory/removeInventory';
export const GET_INVENTORY_ENDPOINT = API_TARGET + 'inventory/getInventoryList';
export const ADD_INVENTORY = API_TARGET +'inventory/addInventory';

export const ADD_CUSTOMER = API_TARGET+'customer/addcustomer';
export const LIST_CUSTOMER = API_TARGET+'customer/listcustomer';

export const GET_CUSTOMER_ENDPOINT = API_TARGET+'customer/getcustomer';
export const REMOVE_CUSTOMER_ENDPOINT = API_TARGET+'customer/removecustomer';

export const GET_BILL_ENDPOINT = API_TARGET+'cashier/getbill';
export const REMOVE_BILL_ENDPOINT = API_TARGET+'cashier/removebill';
export const UPDATE_SUPPLIER_ENDPOINT = API_TARGET+'supplier/updateSupplier';
