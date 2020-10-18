import { combineReducers } from 'redux';
import userReducer from "./userReducer";
import systemReducer from "./systemReducer";
import supplierReducer from "./supplierReducer";
import itemReducer from "./itemReducer";

const reducers = combineReducers(
    {
        user     : userReducer,
        system   : systemReducer,
        supplier : supplierReducer,
        items    : itemReducer,
    },
);

export default reducers;
