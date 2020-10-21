/* eslint-disable no-console */
import store from '../redux/store';
import { decrypt } from "./EncryptionServices";
import { GetSession, DestroySession, SetSession } from './SessionManagement';

/**
 * Check is the application already authenticated or not
 * @param setUserState
 * @returns {boolean}
 * @constructor
 */
function IsAuthenticated(setUserState)
{
    const state = store.getState(); // access to the redux branchActions

    const localData = JSON.parse(GetSession()); // get the localstorage

    let sessionUser = null;

    if (localData != null)
    { // check the local storage is not empty
        try
        {
            sessionUser = localData.sessionData; // load localstorage session

            // eslint-disable-next-line max-len
            const hours = Math.abs(new Date() - localData.create) / 36e5; // get session create date and today date difference

            if (hours > 24)
            { // if session time is more than 24 hours; destroy the session
                DestroySession();

                return false;
            }

            if (sessionUser.token == null)
            { // check the session token is not valid
                DestroySession();

                return false;
            }

            const { token } = sessionUser; // get the jwt token (encrypted token)

            // token = decrypt(token); // decrypt the token

            delete sessionUser.token; // delete the existing token
            sessionUser.token = token; // set decrypted token

            setUserState(sessionUser);

            return true;
        }
        catch (e)
        {
            console.log('error occurred while authentication. destroyed th session.');
            console.log(e);
            // DestroySession();
        }
    }

    const authToken = state.user; // get redux branchActions user

    if (authToken.authenticated === false || authToken.userID == null
		|| authToken.userName == null || authToken.roleID == null
		|| authToken.email == null || authToken.token == null)
    {
        return false;
    }

    SetSession(state.user);

    return true;
}

export default IsAuthenticated;
