import { UPDATE_ATTENDANCE_DETAILS_LIST } from '../actionTypes';

const initialState = {
	attendanceList : []
}

export default function(state = initialState, action)
{
	switch (action.type)
	{
		case  UPDATE_ATTENDANCE_DETAILS_LIST :
			return {
				...state,
				attendanceList : action.payload
			}
			break;
		default :
			return state;
	}
}
