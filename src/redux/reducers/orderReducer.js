import { ORDER_APPEND, ORDER_ITEMS_APPEND } from "../actionTypes";

// initial state
const initialState = {
    orderHeader : [],
    orderItems  : [],
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
        case ORDER_ITEMS_APPEND:
            return {
                ...state,
                orderItems : [ ...action.payload ],
            };
        default:
            return state;
    }
}
