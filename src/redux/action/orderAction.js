import { DIALOG_NEW_ORDER } from "../actionTypes";

// eslint-disable-next-line import/prefer-default-export
export const handleNewOrderDialogStatus = (action, editID) => (dispatch) =>
{
    dispatch({
        type    : DIALOG_NEW_ORDER,
        payload : { action, editID },
    });
};
