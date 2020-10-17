import { app } from "firebase";
import { DATABASE_COLLECTION_SUPPLIER } from "../../config";
import { SUPPLIER_REMOVE_ALL, SUPPLIER_APPEND, DIALOG_NEW_SUPPLIER } from "../actionTypes";

export const fetchSuppliers = () => async (dispatch) =>
{
    await dispatch({
        type    : SUPPLIER_REMOVE_ALL,
        payload : null,
    });

    app().firestore().collection(DATABASE_COLLECTION_SUPPLIER).get()
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
        });
};

export const handleSupplierAddDialogStatus = (action, editID) => (dispatch) =>
{
    dispatch({
        type    : DIALOG_NEW_SUPPLIER,
        payload : { action, editID },
    });
};

export const addNewSupplier = (supplierObj) => async (dispatch) =>
{
    await app().firestore()
        .collection(DATABASE_COLLECTION_SUPPLIER)
        .add({ ...supplierObj });
};

export const updateSupplier = (supplierObj, id) => async (dispatch) =>
{
    await app().firestore()
        .collection(DATABASE_COLLECTION_SUPPLIER)
        .doc(id)
        .update({ ...supplierObj });
};

export const removeSupplier = (id) => async (dispatch) =>
{
    await app().firestore()
        .collection(DATABASE_COLLECTION_SUPPLIER)
        .doc(id)
        .delete();
};
