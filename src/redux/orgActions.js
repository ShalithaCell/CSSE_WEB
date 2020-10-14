import { GetSession } from '../services/sessionManagement';
import {
	POPUP_SPINNER,
	SET_SESSION_EXPIRED,
	UPDATE_ORG_DETAILS_LIST
} from './actionTypes';

import { decrypt } from '../services/EncryptionService';
import axios from 'axios';
import {
	ADD_ORG_ENDPOINT, GET_ORG_ENDPOINT, REMOVE_ORG_ENDPOINT,
	UPDATE_ORG_DETAILS_ENDPOINT

} from '../config';

export const addOrgDetails = ()  => async (dispatch) =>
{
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	let success = false;
	let resData;

	const user = {
		
		Org_Name     : add.orgName,
		Org_Location : add.location
		
	}

	await axios({
		method  : 'post',
		url     : ADD_ORG_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : user
	})
		.then(function(response)
		{
			resData = response.data;
			success = true;
		})
		.catch(function(error)
		{
			resData = error;
			console.log(error);
		});
}

export const updateOrgDetails = ()  => async (dispatch) =>
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
		method  : 'post',
		url     : UPDATE_ORG_DETAILS_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token }
	})
		.then(function(response)
		{
			dispatch({
				type    : UPDATE_ORG_DETAILS_LIST,
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

			if (error.response.status === 401)
			{
				dispatch({
					type    : SET_SESSION_EXPIRED,
					payload : true
				});
				return
			}
			throw error;
		});
}

export const updateOrg = (OrgData) => async (dispatch) =>
{
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	//API call
	await axios({
		method  : 'post',
		url     : UPDATE_ORG_DETAILS_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : OrgData
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

export const getOrgInformation = (orgId) => async (dispatch) => {

	console.log('abcd');
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	let responseData;

	//API call
	axios({
		method  : 'get',
		url     : GET_ORG_ENDPOINT,
		headers : {
			Authorization : 'Bearer ' + token
		}
	})
		.then(function(response)
		{
			dispatch({
				type    : UPDATE_ORG_DETAILS_LIST,
				payload : response.data
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
	return responseData;
}

export const removeOrg = (orgId) => async (dispatch) => {
	console.log('test');
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	let responseData;

	//API call
	await axios({
		method  : 'post',
		url     : REMOVE_ORG_ENDPOINT,
		headers : {
			Authorization : 'Bearer ' + token
		},
		data : { orgId }
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
