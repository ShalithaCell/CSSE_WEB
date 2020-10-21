import { SET_CONFIGURATIONS } from "../actionTypes";

const initialState = {
    configurations : [],
};

export default function(state = initialState, action)
{
    switch (action.type)
    {
        case SET_CONFIGURATIONS:
            return {
                ...state,
                configurations : action.payload,
            };
        default:
            return state;
    }
}
