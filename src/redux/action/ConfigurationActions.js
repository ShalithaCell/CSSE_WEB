import { app } from "firebase";
import { DATABASE_COLLECTION_CONFIGURATIONS } from "../../config";
import { SET_CONFIGURATIONS } from "../actionTypes";
import reportError from "./ErrorLogAction";

const syncConfigurations = () => async (dispatch) =>
{
    const configurationObject = [];

    app().firestore().collection(DATABASE_COLLECTION_CONFIGURATIONS).get()
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

                    configurationObject.push({ ...data, id });
                }

                dispatch({
                    type    : SET_CONFIGURATIONS,
                    payload : configurationObject,
                });
            });
        })
        .catch((err) =>
        {
            reportError(err);
        });
};

export default syncConfigurations;
