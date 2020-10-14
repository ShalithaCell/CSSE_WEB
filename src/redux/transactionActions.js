import { ADD_TRANS, VIEW_TRANS, UPDATE_TRANS, DELETE_TRANS } from './actionTypes';
import axios from 'axios';
import { ADD_TRANSACTION_ENDPOINT, VIEW_TRANSACTION_ENDPOINT, UPDATE_TRANSACTION_ENDPOINT, DELETE_TRANSACTION_ENDPOINT } from '../config';
import { decrypt } from '../services/EncryptionService';
import { GetSession } from '../services/sessionManagement';
import { SetSessionExpiredStatus } from './systemActions';
import { useState } from 'react';
import { SET_SESSION_EXPIRED } from '../redux/actionTypes';

export const addTrans = (values) => async (dispatch) => {

	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token);

	const success = false;
	let resData;

	console.log(token);
	const transObj = {
		Description : values.description,
		User_ID     : values.userid,
		Quantity    : values.qty,
		Unit_price  : values.unit,
		Total       : values.total
	}

	//API call
	await axios({
		method  : 'post',
		url     : ADD_TRANSACTION_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : transObj
	})

		.then(function (response) {
			console.log(response);
			//   dispatch({
			//  	    type    : ADD_TRANS,
			//          payload : response.data
			//      });
			//      return true;
		})
		.catch(function (error) {
			console.log(error);
			if (error.response.status === 401) {
				dispatch({
					type    : SET_SESSION_EXPIRED,
					payload : true
				})
			}
			throw error;
		});

}

export const viewTrans = () => async (dispatch) => {
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token);

	let responseData;

	axios({
		method  : 'get',
		url     : VIEW_TRANSACTION_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token }
	})
		.then(function (response) {
			dispatch({
				type    : VIEW_TRANS,
				payload : response.data
			});

			return response.data;
		})
		.catch(function (error) {
			console.log(error);
			
/*									if(error.response.status === 401){
			
										dispatch({
											type    : SET_SESSION_EXPIRED,
											payload : true
										});
										return
									}
									throw error;
								*/}

		);
}

//  export const setUserState = ( data ) => (dispatch) =>
//  {
//  	dispatch({
//  	    type    : ADD_TRANS,
//  		payload : data
//  	});
//  }

export const updateTrans = (transData) => async (dispatch) => {

	console.log(transData);
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	axios({
		method  : 'post',
		url     : UPDATE_TRANSACTION_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : transData 
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

export const deleteTrans = (transId) => async (dispatch) => {

	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	let responseData;

	//API call
	await axios({
		method  : 'post',
		url     : DELETE_TRANSACTION_ENDPOINT,
		headers : {
			Authorization : 'Bearer ' + token
		},
		data : { transId }
	})
		.then(function (response) {
			responseData = true;
		})
		.catch(function (error) {
			if (error.response.status === 401) {
				dispatch({
					type    : SET_SESSION_EXPIRED,
					payload : true
				});

			} else if (error.response.status === 409) {
				responseData = false;
			}
			throw error;
		});

	return responseData;

}