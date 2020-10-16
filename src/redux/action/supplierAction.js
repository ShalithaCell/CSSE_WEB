import { app } from "firebase";
import { DATABASE_COLLECTION_SUPPLIER } from "../../config";
import { SUPPLIER_REMOVE_ALL, SUPPLIER_APPEND } from "../actionTypes";

// eslint-disable-next-line import/prefer-default-export
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

                    dispatch({
                        type    : SUPPLIER_APPEND,
                        payload : { ...data, id },
                    });
                }
            });
        });
};
