import { combineReducers } from 'redux';
import userReducer from "./userReducer";
import systemReducer from "./systemReducer";
import supplierReducer from "./supplierReducer";

const reducers = combineReducers(
    {
        user     : userReducer,
        system   : systemReducer,
        supplier : supplierReducer,
    },
);

export default reducers;
