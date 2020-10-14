import {
	SET_SESSION_EXPIRED,
	UPDATE_SUPPLIER_DETAILS_LIST
} from './actionTypes';

import { GetSession } from '../services/sessionManagement';
import { decrypt } from '../services/EncryptionService';
import axios from 'axios';
import {
	ADD_SUPPLIER_ENDPOINT, GET_SUPPLIER_ENDPOINT, REMOVE_SUPPLIER_ENDPOINT,
	UPDATE_SUPPLIER_ENDPOINT
} from '../config';

export const addsupplier = ()  => async (dispatch) =>
{
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	let success = false;
	let resData;

	const user = {
		Finame    : add.firstName,
		Laname    : add.lastName,
		email     : add.email,
		CAtegory  : add.category,
		ARea      : add.Area,
		PHoNumber : add.PhoneNumber
	}

	await axios({
		method  : 'post',
		url     : ADD_SUPPLIER_ENDPOINT,
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

export const getSupplier = () => async (dispatch) => {

	console.log('abcd');
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	let responseData;

	//API call
	axios({
		method  : 'get',
		url     : GET_SUPPLIER_ENDPOINT,
		headers : {
			Authorization : 'Bearer ' + token
		}
	})
		.then(function(response)
		{
			dispatch({
				type    : UPDATE_SUPPLIER_DETAILS_LIST,
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

}

export const removeSupplier = (supplierId) => async (dispatch) =>
{
	console.log('test');
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	let responseData;

	//API call
	await axios({
		method  : 'post',
		url     : REMOVE_SUPPLIER_ENDPOINT,
		headers : {
			Authorization : 'Bearer ' + token
		},
		data : { supplierId }
	})
		.then(function(response)
		{
			responseData = true;
		})
		.catch(function(error)
		{
			if (error.response.status === 401)
			{
				dispatch({
					type    : SET_SESSION_EXPIRED,
					payload : true
				});

			}
			else if (error.response.status === 409)
			{
				responseData = false;
			}
			throw error;
		});

	return responseData;
}

export const updateSupplier = (supplierData) => async (dispatch) =>
{
	console.log(supplierData);
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	//API call
	await axios({
		method  : 'post',
		url     : UPDATE_SUPPLIER_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : supplierData
	})
		.then(function(response)
		{
			return true;
		})
		.catch(function(error)
		{
			/*
			if(error.response.status === 401){
				dispatch({
					type    : SET_SESSION_EXPIRED,
					payload : true
				});

			}
			throw error;

			 */
		});
}
