import { UPDATE_INVENTORY_LIST } from '../actionTypes';

const initialState = {
	inventoryList  : [],
	ReceivedOrders : []
}

export default function(state = initialState, action)
{
	switch (action.type){
		case UPDATE_INVENTORY_LIST:
			return {
				...state,
				inventoryList  : action.payload,
				ReceivedOrders : action.payload
			}
			break;
		default :
			return state;
	}
}