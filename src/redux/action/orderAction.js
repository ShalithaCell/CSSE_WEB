import {DIALOG_NEW_ORDER, VIEW_ORDER_TYPE} from "../actionTypes";

// eslint-disable-next-line import/prefer-default-export
export const handleNewOrderDialogStatus = (action, editID) => (dispatch) =>
{
    dispatch({
        type    : DIALOG_NEW_ORDER,
        payload : { action, editID },
    });
};

export const handleViewOrderType = (action) => (dispatch) =>
{
    dispatch({
        type    : VIEW_ORDER_TYPE,
        payload : action,
    });
};
