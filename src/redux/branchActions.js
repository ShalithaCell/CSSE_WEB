import { GetSession } from '../services/sessionManagement';
import {
	POPUP_SPINNER,
	SET_SESSION_EXPIRED,
	UPDATE_BRANCH_DETAILS_LIST
} from './actionTypes';

import { decrypt } from '../services/EncryptionService';
import axios from 'axios';
import {
	ADD_BRANCH_ENDPOINT, GET_BRANCH_ENDPOINT, REMOVE_BRANCH_ENDPOINT,
	UPDATE_BRANCH_DETAILS_ENDPOINT,
	UPDATE_BRANCH_ENDPOINT
} from '../config';

export const addBranchDetails = ()  => async (dispatch) =>
{
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	let success = false;
	let resData;

	const user = {
		B_Name     : add.bName,
		Org_Name   : add.orgName,
		B_Location : add.location,
		B_Phone    : add.tpNo,
		B_Employee : add.noofEmployee
	}

	await axios({
		method  : 'post',
		url     : ADD_BRANCH_ENDPOINT,
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

export const updateBranchDetails = ()  => async (dispatch) =>
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
		url     : UPDATE_BRANCH_DETAILS_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token }
	})
		.then(function(response)
		{
			dispatch({
				type    : UPDATE_BRANCH_DETAILS_LIST,
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

export const updateBranch = (branchData) => async (dispatch) =>
{
	console.log(branchData);
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	//API call
	await axios({
		method  : 'post',
		url     : UPDATE_BRANCH_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : branchData
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

export const getBranchInformation = (branchId) => async (dispatch) => {

	console.log('abcd');
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	let responseData;

	//API call
	axios({
		method  : 'get',
		url     : GET_BRANCH_ENDPOINT,
		headers : {
			Authorization : 'Bearer ' + token
		}
	})
		.then(function(response)
		{
			dispatch({
				type    : UPDATE_BRANCH_DETAILS_LIST,
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

export const removeBranch = (branchId) => async (dispatch) => {
	console.log('test');
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	let responseData;

	//API call
	await axios({
		method  : 'post',
		url     : REMOVE_BRANCH_ENDPOINT,
		headers : {
			Authorization : 'Bearer ' + token
		},
		data : { branchId }
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
