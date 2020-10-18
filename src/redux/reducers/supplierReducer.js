import { SUPPLIER_REMOVE_ALL, SUPPLIER_APPEND } from "../actionTypes";

const initialState = {
    suppliers : [],
};

export default function(state = initialState, action)
{
    switch (action.type)
    {
        case SUPPLIER_APPEND:
            return {
                ...state,
                suppliers : [ ...state.suppliers, action.payload ],
            };
        case SUPPLIER_REMOVE_ALL:
            return {
                ...state,
                suppliers : [],
            };
        default:
            return state;
    }
}
