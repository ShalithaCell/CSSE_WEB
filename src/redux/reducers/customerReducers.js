import { UPDATE_CUSTOMER_LIST } from '../actionTypes'

const initialState ={

    customerlist : []
}

export default function(state = initialState, action)
{
	switch (action.type)
	{
		case UPDATE_CUSTOMER_LIST :
			return {
				...state,
				customerlist : action.payload
			}
			break;
		default :
			return state;
	}
}