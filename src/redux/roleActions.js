import { POPUP_SPINNER, SET_SESSION_EXPIRED, UPDATE_ROLE_LIST } from './actionTypes';
import axios from 'axios';
import { GET_ROLE_LIST_ENDPOINT, REGISTER_NEW_ROLE_ENDPOINT, GET_ROLE_ENDPOINT, UPDATE_ROLE_ENDPOINT, REMOVE_ROLE_ENDPOINT } from '../config';
import { decrypt } from '../services/EncryptionService';
import { GetSession } from '../services/sessionManagement';
import { SetSessionExpiredStatus } from './systemActions';
import { popupSpinner } from './systemActions';

export const updateRoleDetails = ()  => async (dispatch) =>
{

	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	//spinner
	dispatch({
		type    : POPUP_SPINNER,
		payload : true
	});

	//API call
	axios({
		method  : 'get',
		url     : GET_ROLE_LIST_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token }
	})
		.then(function(response)
		{
			dispatch({
				type    : UPDATE_ROLE_LIST,
				payload : response.data
			});

			//spinner
			dispatch({
				type    : POPUP_SPINNER,
				payload : false
			});

			return response.data;
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
				return
			}
			throw error;
		});
}

export const addNewRole = (roleData) => async (dispatch) => {
	
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	//API call
	await axios({
		method  : 'post',
		url     : REGISTER_NEW_ROLE_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : roleData
	})
		.then(function(response)
		{
			return true;
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

export const updateRole = (roleData) => async (dispatch) => {

	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	//API call
	await axios({
		method  : 'post',
		url     : UPDATE_ROLE_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : roleData
	})
		.then(function(response)
		{
			return true;
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

export const getRoleInformation = (roleId) => async (dispatch) => {

	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	let responseData;

	//API call
	await axios({
		method  : 'post',
		url     : GET_ROLE_ENDPOINT,
		headers : { 
			Authorization : 'Bearer ' + token
		},
		data : { "roleID": roleId }
	})
		.then(function(response)
		{
			responseData = response.data;
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

	return responseData;

}

export const removeRole = (roleId) => async (dispatch) => {

	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	let responseData;

	//API call
	await axios({
		method  : 'post',
		url     : REMOVE_ROLE_ENDPOINT,
		headers : {
			Authorization : 'Bearer ' + token
		},
		data : { roleId }
	})
		.then(function(response)
		{
			responseData = true;
		})
		.catch(function(error)
		{
			if(error.response.status === 401){
				dispatch({
					type    : SET_SESSION_EXPIRED,
					payload : true
				});

			}else if(error.response.status === 409){
				responseData = false;
			}
			throw error;
		});

	return responseData;

}
