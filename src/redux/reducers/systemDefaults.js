import {
	POPUP_DIALOG_FORGOTPASSWORD,
	POPUP_SPINNER,
	SET_PERMISSON_LIST,
	SET_SESSION_EXPIRED,
	UPDATE_USER_NAME_LIST
} from '../actionTypes';

const initialState = {
	popupForgotpwDialog : false,
	loader              : false,
	sessionExpired      : false,
	userNameList        : [],
	permissonLevels     : null
}

export default function(state = initialState, action)
{
	switch (action.type)
	{
		case POPUP_DIALOG_FORGOTPASSWORD :
			return {
				...state,
				popupForgotpwDialog : action.payload
			}
		case POPUP_SPINNER :
			return {
				...state,
				loader : action.payload
			}
		case SET_SESSION_EXPIRED:
			return {
				...state,
				sessionExpired : action.payload
			}
		case UPDATE_USER_NAME_LIST :
			return {
				...state,
				userNameList : action.payload
			}
		case SET_PERMISSON_LIST :
			return {
				...state,
				permissonLevels : action.payload
			}
		default :
			return state;
	}
}
