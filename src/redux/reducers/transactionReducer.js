 import { ADD_TRANS, VIEW_TRANS, UPDATE_TRANS } from '../actionTypes';

 const initialState = {
 	list : []
 }

 export default function(state = initialState, action)
 {
 	switch (action.type)
 	{
 		case ADD_TRANS :
 		 	return {
 		 		...state,
 		 		list : [ ...state.list, action.payload ]
             }
        case VIEW_TRANS :
             return{
                 ...state,
                 list : action.payload 
             }
        case UPDATE_TRANS :
            return{
                ...state,
                list : [ ...state.list, action.payload ]
            } 

 		default :
 			return state;
 	}
 }
