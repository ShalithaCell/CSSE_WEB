import { UPDATE_SUPPLIER_DETAILS_LIST } from '../actionTypes';

const initialState = {
	supplierLists : []
}

export default function(state = initialState, action)
{
	switch (action.type)
	{
		case UPDATE_SUPPLIER_DETAILS_LIST :
			return {
				...state,
				supplierLists : action.payload
			}
			break;
		default :
			return state;
	}
}