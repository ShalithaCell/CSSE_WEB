import { combineReducers } from 'redux';
import userReducer from "./userReducer";
import systemReducer from "./systemReducer";
import supplierReducer from "./supplierReducer";
import itemReducer from "./itemReducer";
import configurationReducer from "./configurationReducer";
import orderReducer from "./orderReducer";

/**
 * all the reducers are combine together and export
 * @type {Reducer<CombinedState<{
 * supplier: ({suppliers}|{suppliers: []}|*),
 * user: ({authenticated: *, role: *, phone: *, roleID: *, userName: *,
 * userID: *, email: *, orgID: *, token: *}|{authenticated: boolean, role: null, roleID: null,
 * userName: null, userID: null, email: null, orgID: null, token: null}|{users: *}|*),
 * system: ({popupForgotpwDialog: *, supplierEditableID: null,
 *             ItemEditableID: null, viewOrdersType: number, loader: boolean,
 *             newSupplierDialog: boolean, newOrderDialog: boolean, sessionExpired: boolean,
 *             newItemDialog: boolean, orderEditableID: null, permissonLevels: null, userNameList: []}),
 * items: ({items}|*)}>>}
 */
const reducers = combineReducers(
    {
        user           : userReducer,
        system         : systemReducer,
        supplier       : supplierReducer,
        items          : itemReducer,
        configurations : configurationReducer,
        orders         : orderReducer,
    },
);

export default reducers;
