import { combineReducers } from 'redux';
import userReducer from './userReducer'
import systemDefaults from './systemDefaults';

const reducers = combineReducers(
	{
		user   : userReducer,
		system : systemDefaults
	});

export default reducers;	
