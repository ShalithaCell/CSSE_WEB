import { app } from "firebase";
import { DIALOG_NEW_ORDER, ITEM_APPEND, ORDER_APPEND, VIEW_ORDER_TYPE } from "../actionTypes";
import {
    DATABASE_COLLECTION_CONFIGURATIONS,
    DATABASE_COLLECTION_ORDER_ITEMS,
    DATABASE_COLLECTION_ORDERS,
} from "../../config";

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
