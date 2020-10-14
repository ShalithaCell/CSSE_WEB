import { UPDATE_BRANCH_DETAILS_LIST } from '../actionTypes';

const initialState = {
	branchList : []
}

export default function(state = initialState, action)
{
	switch (action.type)
	{
		case UPDATE_BRANCH_DETAILS_LIST :
			return {
				...state,
				branchList : action.payload
			}
			break;
		default :
			return state;
	}
}