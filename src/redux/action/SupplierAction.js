import { app } from "firebase";
import { DATABASE_COLLECTION_SUPPLIER } from "../../config";
import { SUPPLIER_REMOVE_ALL, SUPPLIER_APPEND, DIALOG_NEW_SUPPLIER } from "../actionTypes";
import reportError from "./ErrorLogAction";

/**
 * Fetch the all suppliers from the database
 * @returns {function(*=): Promise<void>}
 */
export const fetchSuppliers = () => async (dispatch) =>
{
    // remove the existing redux store supplier data
    await dispatch({
        type    : SUPPLIER_REMOVE_ALL,
        payload : null,
    });

    await app().firestore().collection(DATABASE_COLLECTION_SUPPLIER).get()
        .then((snapShot) =>
        {
            snapShot.forEach((doc) =>
            {
                if (doc.exists)
                {
                    const { id } = doc;
                    const data = doc.data();

                    if (data.name !== '')
                    {
                        dispatch({
                            type    : SUPPLIER_APPEND,
                            payload : { ...data, id },
                        });
                    }
                }
            });
        })
        .catch((err) =>
        {
            reportError(err);
        });
};

/**
 * handle new supplier dialog visibility with connecting to the redux store
 * @param action
 * @param editID
 * @returns {function(*): void}
 */
export const handleSupplierAddDialogStatus = (action, editID) => (dispatch) =>
{
    dispatch({
        type    : DIALOG_NEW_SUPPLIER,
        payload : { action, editID },
    });
};

/**
 * save the new supplier to database
 * @param supplierObj
 * @returns {function(*): Promise<void>}
 */
export const addNewSupplier = (supplierObj) => async (dispatch) =>
{
    await app().firestore()
        .collection(DATABASE_COLLECTION_SUPPLIER)
        .add({ ...supplierObj })
        .catch((err) =>
        {
            reportError(err);
        });
};

/**
 * update the existing suppliers
 * @param supplierObj
 * @param id
 * @returns {function(*): Promise<void>}
 */
export const updateSupplier = (supplierObj, id) => async (dispatch) =>
{
    await app().firestore()
        .collection(DATABASE_COLLECTION_SUPPLIER)
        .doc(id)
        .update({ ...supplierObj })
        .catch((err) =>
        {
            reportError(err);
        });
};

/**
 * remove the supplier by document id
 * @param id
 * @returns {function(*): Promise<void>}
 */
export const removeSupplier = (id) => async (dispatch) =>
{
    await app().firestore()
        .collection(DATABASE_COLLECTION_SUPPLIER)
        .doc(id)
        .delete()
        .catch((err) =>
        {
            reportError(err);
        });
};
