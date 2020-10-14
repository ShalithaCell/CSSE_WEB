import axios from 'axios';
import {
	ADD_INVENTORY_ENDPOINT,
	REMOVE_INVENTORY_ENDPOINT,
	UPDATE_INVENTORY_ENDPOINT,
	GET_INVENTORY_ENDPOINT } from '../config';
import { GetSession } from '../services/sessionManagement';
import { decrypt } from '../services/EncryptionService';
import { SET_SESSION_EXPIRED, UPDATE_INVENTORY_LIST } from './actionTypes';

//Add New Inventory
export const addInventory = (inventoryData) => async (dispatch) =>
{
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token);

	//console.log('ABC');
	let success = false;
	let resData;

	console.log(token);

	const userObj = {
		PName  : inventoryData.pname,
		Pcode  : inventoryData.pcode,
		Qty_   : inventoryData.qty,
		Uprice : inventoryData.uprice,
		SName  : inventoryData.sname,
		SEmail : inventoryData.semail
	}

	//API call
	await axios({
		method  : 'post',
		url     : ADD_INVENTORY_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : userObj
	})
		.then(function(response)
		{
			//return true;
			console.log("ok");
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

//Get Inventory List
export const getInventoryDetails = ( inventoryId ) => async  ( dispatch ) => {

	console.log("List");
	const localData = JSON.parse(GetSession());
	let token =localData.sessionData.token;
	token = decrypt(token);

	let responseData;

	//API call
	await axios({
		method  : 'get',
		url     : GET_INVENTORY_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token }
	})
		.then(function (response)
		{
			dispatch({
				type    : UPDATE_INVENTORY_LIST,
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
		});
}

//Update Inventory
export const updateInventory = (inventoryData) => async (dispatch) => {

	console.log(inventoryData);
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	//API call
	await axios({
		method  : 'post',
		url     : UPDATE_INVENTORY_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : inventoryData
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

//Remove Inventory
export const removeInventory = (inventoryId) => async (dispatch) => {

	console.log("abcde")
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	let responseData;

	//API call
	await axios({
		method  : 'post',
		url     : REMOVE_INVENTORY_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : { inventoryId }
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
