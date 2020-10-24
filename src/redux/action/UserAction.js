import {
    DO_LOGIN,
    DO_LOGOUT,
} from '../actionTypes';
import { GetSession } from '../../services/SessionManagement';
import { decrypt, encrypt } from '../../services/EncryptionServices';
import app from '../../base';
import reportError from "./ErrorLogAction";

/**
 * create new user with email and password
 * @param email
 * @param password
 * @returns {function(*): Promise<null>}
 */
export const createUser = (email, password) => async () =>
{
    let objUser = null;

    await app().auth().createUserWithEmailAndPassword(email, password)
        .then((user) =>
        {
            objUser = user;
        })
        .catch((error) =>
        {
            reportError(error);
        });

    return objUser;
};

/**
 * Application user authentication
 * @param email
 * @param password
 * @returns {function(*): Promise<{data: {authenticated: boolean, role: string,
 * phone: null, roleID: number, userName: string | null, userID: string, email: string | null,
 * orgID: number, token: string},
 * success: boolean, error: boolean}|{data: null, success: boolean, error: boolean}>}
 */
export const doLogin = (email, password) => async (dispatch) =>
{
    let success = false;

    // initial the firebase auth
    const auth = await app.auth();

    await app.auth().signInWithEmailAndPassword(email, password).then((user) =>
    {
        if (user)
        {
            success = true;
        }
        else
        {
            success = false;
        }
    }).catch((error) =>
    {
        reportError(error);
    });

    if (success)
    {
        const user = app.auth().currentUser;

        const userObj = {
            authenticated : true,
            userID        : user.uid,
            userName      : user.email,
            roleID        : 1,
            role          : 'admin',
            email         : user.email,
            orgID         : 1,
            phone         : null,
            token         : user.uid,
        };

        // save data to the redux store
        dispatch({
            type    : DO_LOGIN,
            payload : userObj,
        });

        return { success: true, data: userObj, error: false };
    }
    else
    {
        return { success, data: null, error: true };
    }
};

/**
 * Log out functionality
 * @returns {function(*): void}
 */
export const doLogOut = () => (dispatch) =>
{
    app.auth().signOut().then((r) =>
    {
        dispatch({
            type    : DO_LOGOUT,
            payload : null,
        });
    });
};

export const setUserState = (data) => (dispatch) =>
{
    dispatch({
        type    : DO_LOGIN,
        payload : data,
    });
};

export const resetUserPassword = (email) => async (dispatch) =>
{
    // API call
    // let success = false;
    //
    // let message = '';
    //
    // await axios.post(PASSWORD_RESET_ENDPOINT, { Email: email })
    //     .then((response) => {
    //         success = true;
    //         message = response.data;
    //     })
    //     .catch((error) =>
    //     {
    //         console.log(error.response);
    //         success = false;
    //         message = response.data;
    //     });
    //
    // return { success: success, message: message };
};

export const updateUserList = (currentUserRole) => async (dispatch) =>
{
//     const localData = JSON.parse(GetSession());
//
//     let {token} = localData.sessionData;
//
//     token = decrypt(token); // decrypt the token
//
//     // spinner
//     dispatch({
//         type    : POPUP_SPINNER,
//         payload : true,
//     });
//     console.log('syncing');
//     // API call
//     axios({
//         method  : 'post',
//         url     : SYNC_USER_LIST_ENDPOINT,
//         headers : { Authorization: `Bearer ${  token}` },
//         data    : { roleId: currentUserRole },
//     })
//         .then((response)
//         => {
//             dispatch({
//                 type    : UPDATE_USER_LIST,
//                 payload : response.data,
//             });
//
//             // spinner
//             dispatch({
//                 type    : POPUP_SPINNER,
//                 payload : false,
//             });
//         })
//         .catch((error)
//         => {
//             // spinner
//             dispatch({
//                 type    : POPUP_SPINNER,
//                 payload : false,
//             });
//
//             if (error.response.status === 401)
// {
//                 dispatch({
//                     type    : SET_SESSION_EXPIRED,
//                     payload : true,
//                 });
//             }
//             throw error;
//         });
};

export const createNewUser = (userObj) => async (dispatch) =>
{
//     const localData = JSON.parse(GetSession());
//
//     let {token} = localData.sessionData;
//
//     token = decrypt(token); // decrypt the token
//
//     // spinner
//     dispatch({
//         type    : POPUP_SPINNER,
//         payload : true,
//     });
//
//     let result = false;
//
//     // API call
//     await axios({
//         method  : 'post',
//         url     : REGISTER_USER_ENDPOINT,
//         headers : { Authorization: `Bearer ${  token}` },
//         data    : userObj,
//     })
//         .then((response)
//         => {
//             // spinner
//             dispatch({
//                 type    : POPUP_SPINNER,
//                 payload : false,
//             });
//
//             result = response.data;
//         })
//         .catch((error)
//         => {
//             // spinner
//             dispatch({
//                 type    : POPUP_SPINNER,
//                 payload : false,
//             });
//
//             if (error.response.status === 401)
// {
//                 dispatch({
//                     type    : SET_SESSION_EXPIRED,
//                     payload : true,
//                 });
//             }
//             throw error;
//         });
//
//     return result;
};

export const updateUser = (userObj) => async (dispatch) =>
{
//     const localData = JSON.parse(GetSession());
//
//     let {token} = localData.sessionData;
//
//     token = decrypt(token); // decrypt the token
//
//     // spinner
//     dispatch({
//         type    : POPUP_SPINNER,
//         payload : true,
//     });
//
//     let result = false;
//
//     // API call
//     await axios({
//         method  : 'post',
//         url     : UPDATE_USER_ENDPOINT,
//         headers : { Authorization: `Bearer ${  token}` },
//         data    : userObj,
//     })
//         .then((response)
//         => {
//             // spinner
//             dispatch({
//                 type    : POPUP_SPINNER,
//                 payload : false,
//             });
//
//             result = response.data;
//         })
//         .catch((error)
//         => {
//             // spinner
//             dispatch({
//                 type    : POPUP_SPINNER,
//                 payload : false,
//             });
//
//             if (error.response.status === 401)
// {
//                 dispatch({
//                     type    : SET_SESSION_EXPIRED,
//                     payload : true,
//                 });
//             }
//             throw error;
//         });
//
//     return result;
};

export const getUser = (userID) => async (dispatch) =>
{
//     const localData = JSON.parse(GetSession());
//
//     let {token} = localData.sessionData;
//
//     token = decrypt(token); // decrypt the token
//
//     // spinner
//     dispatch({
//         type    : POPUP_SPINNER,
//         payload : true,
//     });
//
//     let result;
//
//     // API call
//     await axios({
//         method  : 'post',
//         url     : GET_USER_ENDPOINT,
//         headers : { Authorization: `Bearer ${  token}` },
//         data    : { userID },
//     })
//         .then((response)
//         => {
//             // spinner
//             dispatch({
//                 type    : POPUP_SPINNER,
//                 payload : false,
//             });
//
//             result = response.data;
//         })
//         .catch((error)
//         => {
//             // spinner
//             dispatch({
//                 type    : POPUP_SPINNER,
//                 payload : false,
//             });
//
//             if (error.response.status === 401)
// {
//                 dispatch({
//                     type    : SET_SESSION_EXPIRED,
//                     payload : true,
//                 });
//             }
//             throw error;
//         });
//
//     return result;
};

export const removeUser = (userID) => async (dispatch) =>
{
//     const localData = JSON.parse(GetSession());
//
//     let {token} = localData.sessionData;
//
//     token = decrypt(token); // decrypt the token
//
//     // spinner
//     dispatch({
//         type    : POPUP_SPINNER,
//         payload : true,
//     });
//
//     let result = false;
//
//     // API call
//     await axios({
//         method  : 'post',
//         url     : REMOVE_USER_ENDPOINT,
//         headers : { Authorization: `Bearer ${  token}` },
//         data    : { userID },
//     })
//         .then((response)
//         => {
//             // spinner
//             dispatch({
//                 type    : POPUP_SPINNER,
//                 payload : false,
//             });
//
//             result = response.data;
//         })
//         .catch((error)
//         => {
//             // spinner
//             dispatch({
//                 type    : POPUP_SPINNER,
//                 payload : false,
//             });
//
//             if (error.response.status === 401)
// {
//                 dispatch({
//                     type    : SET_SESSION_EXPIRED,
//                     payload : true,
//                 });
//             }
//             throw error;
//         });
//
//     return result;
};

export const confirmUserEmail = (userID, code) => async (dispatch) =>
{
    // spinner
//     dispatch({
//         type    : POPUP_SPINNER,
//         payload : true,
//     });
//
//     let result = false;
//
//     // API call
//     await axios({
//         method : 'post',
//         url    : CONFIRM_EMAIL_USER_ENDPOINT,
//         data   : { userID, code },
//     })
//         .then((response)
//         => {
//             // spinner
//             dispatch({
//                 type    : POPUP_SPINNER,
//                 payload : false,
//             });
//
//             result = response.data;
//         })
//         .catch((error)
//         => {
//             // spinner
//             dispatch({
//                 type    : POPUP_SPINNER,
//                 payload : false,
//             });
//
//             if (error.response.status === 401)
// {
//                 dispatch({
//                     type    : SET_SESSION_EXPIRED,
//                     payload : true,
//                 });
//             }
// else if (error.response.status === 404)
// {
//                 return 0;
//             }
//             console.log(error);
//
// return error;
//         });
//
//     return result;
};

export const checkPasswordResetToken = (token) => async (dispatch) =>
{
    // spinner
//     dispatch({
//         type    : POPUP_SPINNER,
//         payload : true,
//     });
//
//     let result = false;
//
//     // API call
//     await axios({
//         method : 'post',
//         url    : CONFIRM_PASSWORD_RESET_TOKEN_ENDPOINT,
//         data   : { token },
//     })
//         .then((response)
//         => {
//             // spinner
//             dispatch({
//                 type    : POPUP_SPINNER,
//                 payload : false,
//             });
//
//             result = response.data.valid;
//         })
//         .catch((error)
//         => {
//             // spinner
//             dispatch({
//                 type    : POPUP_SPINNER,
//                 payload : false,
//             });
//             console.log(error);
//
// return error;
//         });
//
//     return result;
};

export const resetPassword = (token, password) => async (dispatch) =>
{
    // spinner
//     dispatch({
//         type    : POPUP_SPINNER,
//         payload : true,
//     });
//
//     let result;
//
//     // API call
//     await axios({
//         method : 'post',
//         url    : RESET_USER_PASSWORD_ENDPOINT,
//         data   : { token, password },
//     })
//         .then((response)
//         => {
//             // spinner
//             dispatch({
//                 type    : POPUP_SPINNER,
//                 payload : false,
//             });
//
//             result = response.data.status;
//         })
//         .catch((error)
//         => {
//             // spinner
//             dispatch({
//                 type    : POPUP_SPINNER,
//                 payload : false,
//             });
//             console.log(error);
//
// return error;
//         });
//
//     return result;
};

export const getPermissonLevels = (userID) => async (dispatch) =>
{
//     const localData = JSON.parse(GetSession());
//
//     let {token} = localData.sessionData;
//
//     token = decrypt(token); // decrypt the token
//
//     // API call
//     await axios({
//         method  : 'post',
//         url     : GET_PERMISSON_LEVELS__ENDPOINT,
//         headers : { Authorization: `Bearer ${  token}` },
//         data    : { userID },
//     })
//         .then((response)
//         => {
//             dispatch({
//                 type    : SET_PERMISSON_LIST,
//                 payload : response.data[0],
//             });
//         })
//         .catch((error)
//         => {
//             // spinner
//             dispatch({
//                 type    : POPUP_SPINNER,
//                 payload : false,
//             });
//
//             if (error.response.status === 401)
// {
//                 dispatch({
//                     type    : SET_SESSION_EXPIRED,
//                     payload : true,
//                 });
//             }
//             throw error;
//         });
};
