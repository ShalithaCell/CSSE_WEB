import { POPUP_DIALOG_FORGOTPASSWORD, POPUP_SPINNER, SET_SESSION_EXPIRED, UPDATE_USER_NAME_LIST } from './actionTypes';
import { GetSession } from '../services/sessionManagement';
import { decrypt } from '../services/EncryptionService';
import axios from 'axios';
import { SYNC_USER_Name_LIST_ENDPOINT } from '../config';

export const popupPasswordResetDialog = ( popuped ) => (dispatch) => {
	dispatch({
		type    : POPUP_DIALOG_FORGOTPASSWORD,
		payload : popuped
	});
}

export const popupSpinner = ( popuped ) => (dispatch) => {
	dispatch({
		type    : POPUP_SPINNER,
		payload : popuped
	});
}

export const SetSessionExpiredStatus = ( expired ) => (dispatch) => {
	//console.log('called SetSessionExpiredStatus');
	dispatch({
		type    : SET_SESSION_EXPIRED,
		payload : expired
	});
}

export const updateUsernameList = () => async (dispatch) => {

	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	//spinner
	dispatch({
		type    : POPUP_SPINNER,
		payload : true
	});

	//API call
	await axios({
		method  : 'get',
		url     : SYNC_USER_Name_LIST_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token }
	})
		.then(function(response)
		{
			dispatch({
				type    : UPDATE_USER_NAME_LIST,
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
			if(error.response.status === 401){
				dispatch({
					type    : SET_SESSION_EXPIRED,
					payload : true
				});

			}
			throw error;
		});
}
