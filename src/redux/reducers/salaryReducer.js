import { ADD_SALARY, VIEW_SALARY, UPDATE_SALARY } from '../actionTypes';

const initialState = {
    list : []
}

export default function(state = initialState, action)
{
    switch (action.type)
    {
        case ADD_SALARY :
             return {
                 ...state,
                 list : [ ...state.list, action.payload ]
            }
        case VIEW_SALARY :
             return{
                 ...state,
                 list : action.payload 
             }
        case UPDATE_SALARY :
             return {
                 ...state,
                 list : [ ...state.list, action.payload ]
            }

        default :
            return state;
    }
}
