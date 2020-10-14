import {
	DO_LOGIN,
	DO_LOGOUT,
	POPUP_SPINNER,
	SET_PERMISSON_LIST,
	SET_SESSION_EXPIRED,
	UPDATE_USER_LIST
} from './actionTypes';
import axios from 'axios';
import {
	CONFIRM_EMAIL_USER_ENDPOINT, CONFIRM_PASSWORD_RESET_TOKEN_ENDPOINT, GET_PERMISSON_LEVELS__ENDPOINT,
	GET_USER_ENDPOINT,
	LOGIN_ENDPOINT,
	PASSWORD_RESET_ENDPOINT,
	REGISTER_USER_ENDPOINT, REMOVE_USER_ENDPOINT, RESET_USER_PASSWORD_ENDPOINT,
	SYNC_USER_LIST_ENDPOINT, UPDATE_USER_ENDPOINT
} from '../config';
import { GetSession } from '../services/sessionManagement';
import { decrypt, encrypt } from '../services/EncryptionService';
import app from '../base';

export const doLogin = (email, password) => async (dispatch) =>
{
	let success = false;
	debugger;
	await app.auth().signInWithEmailAndPassword(email, password).then(function (user){
		if(user){
			success = true;
		}else
		{
			success = false;
		}
	});

	if(success){
		const user = app.auth().currentUser;

		const userObj= {
			authenticated : true,
			userID        : user.uid,
			userName      : user.email,
			roleID        : 1,
			role          : 'admin',
			email         : user.email,
			orgID         : 1,
			phone         : null,
			token         : user.uid
		}

		dispatch({
			type    : DO_LOGIN,
			payload : userObj
		});

		return { 'success': true, 'data': userObj, 'error': false };
	}else{
		return { 'success': success, 'data': null, 'error': true };
	}

}

export const doLogOut = () => (dispatch) => {
	
	app.auth().signOut().then((r) => {
		dispatch({
			type    : DO_LOGOUT,
			payload : null
		});
	});
}

export const setUserState = ( data ) => (dispatch) =>
{
	dispatch({
		type    : DO_LOGIN,
		payload : data
	});
}

export const resetUserPassword = (email) => async (dispatch) => {
	//API call
	let success = false;
	let message = '';
	await axios.post(PASSWORD_RESET_ENDPOINT, { 'Email': email } )
		.then((response) => {
			success = true;
			message = response.data;
		})
		.catch((error) => {
			console.log(error.response);
			success = false;
			message = response.data;
		});
	
	return { 'success': success, 'message': message };
}

export const updateUserList = (currentUserRole) => async (dispatch) => {

	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	//spinner
	dispatch({
		type    : POPUP_SPINNER,
		payload : true
	});
	console.log('syncing');
	//API call
	axios({
		method  : 'post',
		url     : SYNC_USER_LIST_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : { 'roleId': currentUserRole }
	})
		.then(function(response)
		{
			dispatch({
				type    : UPDATE_USER_LIST,
				payload : response.data
			});

			//spinner
			dispatch({
				type    : POPUP_SPINNER,
				payload : false
			});
		})
		.catch(function(error)
		{
			//spinner
			dispatch({
				type    : POPUP_SPINNER,
				payload : false
			});

			if(error.response.status === 401){
				dispatch({
					type    : SET_SESSION_EXPIRED,
					payload : true
				});

			}
			throw error;
		});
}

export const createNewUser = (userObj) => async (dispatch) => {

	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	//spinner
	dispatch({
		type    : POPUP_SPINNER,
		payload : true
	});

	let result = false;

	//API call
	await axios({
		method  : 'post',
		url     : REGISTER_USER_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : userObj 
	})
		.then(function(response)
		{
			//spinner
			dispatch({
				type    : POPUP_SPINNER,
				payload : false
			});

			result = response.data;
		})
		.catch(function(error)
		{
			//spinner
			dispatch({
				type    : POPUP_SPINNER,
				payload : false
			});

			if(error.response.status === 401){
				dispatch({
					type    : SET_SESSION_EXPIRED,
					payload : true
				});

			}
			throw error;
		});

	return result;
}

export const updateUser = (userObj) => async (dispatch) => {

	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	//spinner
	dispatch({
		type    : POPUP_SPINNER,
		payload : true
	});

	let result = false;

	//API call
	await axios({
		method  : 'post',
		url     : UPDATE_USER_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : userObj
	})
		.then(function(response)
		{
			//spinner
			dispatch({
				type    : POPUP_SPINNER,
				payload : false
			});

			result = response.data;
		})
		.catch(function(error)
		{
			//spinner
			dispatch({
				type    : POPUP_SPINNER,
				payload : false
			});

			if(error.response.status === 401){
				dispatch({
					type    : SET_SESSION_EXPIRED,
					payload : true
				});
			}
			throw error;
		});

	return result;
}

export const getUser = (userID) => async (dispatch) => {

	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	//spinner
	dispatch({
		type    : POPUP_SPINNER,
		payload : true
	});

	let result ;

	//API call
	await axios({
		method  : 'post',
		url     : GET_USER_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : { userID }
	})
		.then(function(response)
		{
			//spinner
			dispatch({
				type    : POPUP_SPINNER,
				payload : false
			});

			result = response.data;
		})
		.catch(function(error)
		{
			//spinner
			dispatch({
				type    : POPUP_SPINNER,
				payload : false
			});

			if(error.response.status === 401){
				dispatch({
					type    : SET_SESSION_EXPIRED,
					payload : true
				});

			}
			throw error;
		});

	return result;
}

export const removeUser = (userID) => async (dispatch) => {

	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	//spinner
	dispatch({
		type    : POPUP_SPINNER,
		payload : true
	});

	let result = false;

	//API call
	await axios({
		method  : 'post',
		url     : REMOVE_USER_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : { userID }
	})
		.then(function(response)
		{
			//spinner
			dispatch({
				type    : POPUP_SPINNER,
				payload : false
			});

			result = response.data;
		})
		.catch(function(error)
		{
			//spinner
			dispatch({
				type    : POPUP_SPINNER,
				payload : false
			});

			if(error.response.status === 401){
				dispatch({
					type    : SET_SESSION_EXPIRED,
					payload : true
				});

			}
			throw error;
		});

	return result;
}

export const confirmUserEmail = (userID, code) => async (dispatch) => {

	//spinner
	dispatch({
		type    : POPUP_SPINNER,
		payload : true
	});

	let result = false;

	//API call
	await axios({
		method : 'post',
		url    : CONFIRM_EMAIL_USER_ENDPOINT,
		data   : { userID, code }
	})
		.then(function(response)
		{
			//spinner
			dispatch({
				type    : POPUP_SPINNER,
				payload : false
			});

			result = response.data;
		})
		.catch(function(error)
		{
			//spinner
			dispatch({
				type    : POPUP_SPINNER,
				payload : false
			});

			if(error.response.status === 401){
				dispatch({
					type    : SET_SESSION_EXPIRED,
					payload : true
				});

			}else if(error.response.status === 404){
				return 0;
			}
			console.log(error);
			return error;
		});

	return result;
}

export const checkPasswordResetToken = (token) => async (dispatch) => {

	//spinner
	dispatch({
		type    : POPUP_SPINNER,
		payload : true
	});

	let result = false;

	//API call
	await axios({
		method : 'post',
		url    : CONFIRM_PASSWORD_RESET_TOKEN_ENDPOINT,
		data   : { token }
	})
		.then(function(response)
		{
			//spinner
			dispatch({
				type    : POPUP_SPINNER,
				payload : false
			});

			result = response.data.valid;
		})
		.catch(function(error)
		{
			//spinner
			dispatch({
				type    : POPUP_SPINNER,
				payload : false
			});
			console.log(error);
			return error;
		});

	return result;
}

export const resetPassword = (token, password) => async (dispatch) => {

	//spinner
	dispatch({
		type    : POPUP_SPINNER,
		payload : true
	});

	let result ;

	//API call
	await axios({
		method : 'post',
		url    : RESET_USER_PASSWORD_ENDPOINT,
		data   : { token, password }
	})
		.then(function(response)
		{
			//spinner
			dispatch({
				type    : POPUP_SPINNER,
				payload : false
			});

			result = response.data.status;
		})
		.catch(function(error)
		{
			//spinner
			dispatch({
				type    : POPUP_SPINNER,
				payload : false
			});
			console.log(error);
			return error;
		});

	return result;
}

export const getPermissonLevels = (userID) => async (dispatch) => {

	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	//API call
	await axios({
		method  : 'post',
		url     : GET_PERMISSON_LEVELS__ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : { userID }
	})
		.then(function(response)
		{

			dispatch({
				type    : SET_PERMISSON_LIST,
				payload : response.data[ 0 ]
			});
		})
		.catch(function(error)
		{
			//spinner
			dispatch({
				type    : POPUP_SPINNER,
				payload : false
			});

			if(error.response.status === 401){
				dispatch({
					type    : SET_SESSION_EXPIRED,
					payload : true
				});

			}
			throw error;
		});

}
