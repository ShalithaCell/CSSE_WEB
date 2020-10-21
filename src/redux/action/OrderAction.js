import { app } from "firebase";
import { DIALOG_NEW_ORDER, VIEW_ORDER_TYPE } from "../actionTypes";
import { DATABASE_COLLECTION_CONFIGURATIONS, DATABASE_COLLECTION_ORDERS } from "../../config";

/**
 * handle the add new order dialog visibility with connecting to the redux store
 * @param action
 * @param editID
 * @returns {function(*): void}
 */
export const handleNewOrderDialogStatus = (action, editID) => (dispatch) =>
{
    dispatch({
        type    : DIALOG_NEW_ORDER,
        payload : { action, editID },
    });
};

/**
 * handle the orders table visibility with connecting to the redux store
 * @param action
 * @returns {function(*): void}
 */
export const handleViewOrderType = (action) => (dispatch) =>
{
    dispatch({
        type    : VIEW_ORDER_TYPE,
        payload : action,
    });
};

export const addNewOrder = (orderObj, itemObj) => async (dispatch) =>
{
    await app().firestore()
        .collection(DATABASE_COLLECTION_ORDERS)
        .add({ ...orderObj })
        .then((order) =>
        {
            console.log(order.id);
        });
};
