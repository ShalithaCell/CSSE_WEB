import { combineReducers } from 'redux';
import userReducer from "./userReducer";
import systemReducer from "./systemReducer";

const reducers = combineReducers(
    {
        user   : userReducer,
        system : systemReducer,
    },
);

export default reducers;
