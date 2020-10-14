import { UPDATE_ORG_DETAILS_LIST } from '../actionTypes';

const initialState = {
	orgList : []
}

export default function(state = initialState, action)
{
	switch (action.type)
	{
		case UPDATE_ORG_DETAILS_LIST :
			return {
				...state,
				orgList : action.payload
			}
			break;
		default :
			return state;
	}
}