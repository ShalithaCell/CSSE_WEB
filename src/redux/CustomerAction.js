import { GetSession } from '../services/sessionManagement';
import { decrypt } from '../services/EncryptionService';
import axios from 'axios';
import { LIST_CUSTOMER } from '../config';
import { GET_CUSTOMER_ENDPOINT } from '../config';
import { REMOVE_CUSTOMER_ENDPOINT } from '../config';
import { SET_SESSION_EXPIRED, UPDATE_CUSTOMER_LIST } from './actionTypes';

export const CustomerActions = (customer)  => async () =>
{
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	let success = false;
	let resData;

	const customerObj = {
		Fname        : add.cfName,
		Lname        : add.clName,
	    Email        : add.cemail,
		// eslint-disable-next-line camelcase
		Id_number    : add.cidnumber,
		// eslint-disable-next-line camelcase
	    Phone_number : add.cphonenumber
	}
    //api call
	await axios({
		method  : 'post',
		url     : LIST_CUSTOMER,
		headers : { Authorization: 'Bearer ' + token },
		data    : customerObj
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

export const getcustomerDetails = () => async  ( dispatch ) => {

	console.log('List');
	const localData = JSON.parse(GetSession());
	let token =localData.sessionData.token;
	token = decrypt(token);//decrypt thr token

	let responseData;

	//API call
	axios({
		method  : 'get',
		url     : GET_CUSTOMER_ENDPOINT,
		headers : { 
			Authorization : 'Bearer ' + token
		}
	})
		.then(function(response)
		{
			dispatch({
				type    : UPDATE_CUSTOMER_LIST,
				payload : response.data
			});
		})
		.catch(function(error)
		{
			if(error.response.status === 401 ){
				dispatch({
					type    : SET_SESSION_EXPIRED,
					payload : true
				});

			}
			throw error;
		});
}

export const removecustomer = (customerId) => async (dispatch) => {

	console.log('abcde')
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	let responseData;

	//API call
	await axios({
		method  : 'post',
		url     : REMOVE_CUSTOMER_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : { customerId }
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

export const updateCustomer = (customerData) => async (dispatch) =>
{
	console.log(customerData);
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	//API call
	await axios({
		method  : 'post',
		url     : UPDATE_CUSTOMER_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : customerData
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