import { UPDATE_ROLE_LIST } from '../actionTypes';

const initialState = {
	roleList : []
}

export default function(state = initialState, action)
{
	switch (action.type)
	{
		case UPDATE_ROLE_LIST :
			return {
				...state,
				roleList : action.payload
			}
			break;
		default :
			return state;
	}
}
