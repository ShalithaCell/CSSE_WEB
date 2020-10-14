import { UPDATE_REQUEST_DETAILS_LIST } from '../actionTypes';

const initialState = {
	requestList : []
}

export default function(state = initialState, action)
{
	switch (action.type)
	{
		case  UPDATE_REQUEST_DETAILS_LIST :
			return {
				...state,
				requestList : action.payload
			}
			break;
		default :
			return state;
	}
}
