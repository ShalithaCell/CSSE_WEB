import { app } from "firebase";
import { DATABASE_COLLECTION_ITEMS } from "../../config";
import { DIALOG_NEW_ITEM, ITEM_APPEND } from "../actionTypes";
import store from "../store";
import reportError from "./ErrorLogAction";

/**
 * get the all items form the database and saved to the redux store
 * @returns {function(*): Promise<void>}
 */
export const fetchItems = () => async (dispatch) =>
{
    // get the state from the redux store
    const state = store.getState();

    // filter the supplier list
    const { suppliers } = state.supplier;

    const objList = [];

    app().firestore().collection(DATABASE_COLLECTION_ITEMS).get()
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

                    // find the particular supplier
                    const supplier = suppliers.find((s) => s.id === data.supplier);

                    // check supplier is exists
                    if (supplier)
                    {
                        if (data.name !== '')
                        {
                            objList.push({ ...data, id, supplierName: supplier.name });
                        }
                    }
                }
            });

            dispatch({
                type    : ITEM_APPEND,
                payload : objList,
            });
        });
};

/**
 * handle the add new items dialog visibility with connecting to the redux store
 * @param action
 * @param editID
 * @returns {function(*): void}
 */
export const handleItemAddDialogStatus = (action, editID) => (dispatch) =>
{
    dispatch({
        type    : DIALOG_NEW_ITEM,
        payload : { action, editID },
    });
};

/**
 * add new item to the database
 * @param itemObj
 * @returns {function(*): Promise<void>}
 */
export const addNewItem = (itemObj) => async (dispatch) =>
{
    await app().firestore()
        .collection(DATABASE_COLLECTION_ITEMS)
        .add({ ...itemObj })
        .catch((err) =>
        {
            reportError(err);
        });
};
