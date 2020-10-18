import { ITEM_APPEND } from "../actionTypes";

const initialState = {
    items : [],
};

export default function(state = initialState, action)
{
    switch (action.type)
    {
        case ITEM_APPEND:
            return {
                ...state,
                items : [ ...action.payload ],
            };
        default:
            return state;
    }
}
