import { ORDER_APPEND } from "../actionTypes";

// initial state
const initialState = {
    orderHeader : [],
};

export default function(state = initialState, action)
{
    switch (action.type)
    {
        case ORDER_APPEND:
            return {
                ...state,
                orderHeader : [ ...action.payload ],
            };
        default:
            return state;
    }
}
