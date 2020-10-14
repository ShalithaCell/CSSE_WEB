import { UPDATE_BILL_DETAILS_LIST } from '../actionTypes';

const initialState = {
	billLists : []
}

export default function(state = initialState, action)
{
	switch (action.type)
	{
		case UPDATE_BILL_DETAILS_LIST :
			return {
				...state,
				billLists : action.payload
			}
			break;
		default :
			return state;
	}
}