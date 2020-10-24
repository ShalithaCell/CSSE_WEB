import { app } from "firebase";
import { DATABASE_COLLECTION_ERROR_LOG } from "../../config";

const reportError = async (itemObj) =>
{
    app().firestore()
        .collection(DATABASE_COLLECTION_ERROR_LOG)
        .add({ ...itemObj });
};

export default reportError;
