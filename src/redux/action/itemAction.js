import { app } from "firebase";
import { DATABASE_COLLECTION_ITEMS } from "../../config";
import { DIALOG_NEW_ITEM, ITEM_APPEND } from "../actionTypes";
import store from "../store";

// eslint-disable-next-line import/prefer-default-export
export const fetchItems = () => async (dispatch) =>
{
    // get the state from the redux store
    const state = store.getState();

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

export const handleItemAddDialogStatus = (action, editID) => (dispatch) =>
{
    dispatch({
        type    : DIALOG_NEW_ITEM,
        payload : { action, editID },
    });
};

export const addNewItem = (itemObj) => async (dispatch) =>
{
    await app().firestore()
        .collection(DATABASE_COLLECTION_ITEMS)
        .add({ ...itemObj });
};
