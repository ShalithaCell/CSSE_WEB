import { app } from "firebase";
import {
    DIALOG_NEW_ORDER,
    DIALOG_VIEW_ORDER,
    ITEM_APPEND,
    ORDER_APPEND,
    ORDER_ITEMS_APPEND,
    VIEW_ORDER_TYPE, VIEW_PAYMENT_DIALOG,
} from "../actionTypes";
import {
    DATABASE_COLLECTION_CONFIGURATIONS,
    DATABASE_COLLECTION_ORDER_ITEMS,
    DATABASE_COLLECTION_ORDERS,
} from "../../config";
import reportError from "./ErrorLogAction";

/**
 * fetch all orders
 * @returns {function(*): Promise<void>}
 */
export const fetchOrders = () => async (dispatch) =>
{
    const objList = [];

    app().firestore().collection(DATABASE_COLLECTION_ORDERS).get()
        .then((snapShot) =>
        {
            snapShot.forEach((doc) =>
            {
                if (doc.exists)
                {
                    // get the collection primary id
                    const { id } = doc;
                    // read the data
                    const data = doc.data();

                    objList.push({ ...data, id });
                }
            });

            dispatch({
                type    : ORDER_APPEND,
                payload : objList,
            });
        })
        .catch((err) =>
        {
            reportError(err);
        });
};

/**
 * fetch all order items
 * @returns {function(*): Promise<void>}
 */
export const fetchOrderItems = () => async (dispatch) =>
{
    const objList = [];

    app().firestore().collection(DATABASE_COLLECTION_ORDER_ITEMS).get()
        .then((snapShot) =>
        {
            snapShot.forEach((doc) =>
            {
                if (doc.exists)
                {
                    // get the collection primary id
                    const { id } = doc;
                    // read the data
                    const data = doc.data();

                    objList.push({ ...data, id });
                }
            });

            dispatch({
                type    : ORDER_ITEMS_APPEND,
                payload : objList,
            });
        })
        .catch((err) =>
        {
            reportError(err);
        });
};

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
 * handle the redux action to popup orders view dialog
 * @param action
 * @param rowData
 * @returns {function(*): void}
 */
export const handleViewOrderDialogStatus = (action, rowData) => (dispatch) =>
{
    dispatch({
        type    : DIALOG_VIEW_ORDER,
        payload : { action, rowData },
    });
};

/**
 * Handle the payment dialog wit redux dispatch
 * @param action
 * @param rowData
 * @returns {function(*): void}
 */
export const handleViewPaymentDialogStatus = (action, rowData) => (dispatch) =>
{
    dispatch({
        type    : VIEW_PAYMENT_DIALOG,
        payload : { action, rowData },
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

/**
 * Add new order to database
 * @param orderObj
 * @param itemObj
 * @returns {function(*): Promise<void>}
 */
export const addNewOrder = (orderObj, itemObj) => async (dispatch) =>
{
    await app().firestore()
        .collection(DATABASE_COLLECTION_ORDERS)
        .add({ ...orderObj })
        .then((order) =>
        {
            const orderItemsObj = [];

            // create proper object to save
            itemObj.map((o) =>
            {
                orderItemsObj.push(
                    { OrderID   : order.id,
                        itemID    : o.id,
                        qty       : o.qty,
                        unitPrice :
                        o.unitPrice,
                        amount : o.amount,
                    },
                );

                return o;
            });

            const db = app().firestore();
            const batch = db.batch();

            orderItemsObj.forEach((doc) =>
            {
                // automatically generate unique id
                const docRef = db.collection(DATABASE_COLLECTION_ORDER_ITEMS).doc();

                batch.set(docRef, doc);
            });

            batch.commit();
        });
};

/**
 * update the order status
 * @param orderID
 * @param statusNumber
 * @returns {function(*): void}
 */
export const updateOrderStatus = (orderID, statusNumber) => async (dispatch) =>
{
    await app().firestore()
        .collection(DATABASE_COLLECTION_ORDERS).doc(orderID)
        .update({ status: statusNumber });
};
