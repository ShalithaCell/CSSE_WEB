import store from '../redux/store';
import { decrypt } from './EncryptionService';
import { GetSession, DestroySession, SetSession } from './sessionManagement';

export function IsAuthenticated( setUserState )
{
	const state = store.getState(); //access to the redux branchActions

	const localData = JSON.parse(GetSession()) //get the localstorage

	let sessionUser = null;

	if(localData != null){ //check the local storage is not empty
		try{
			sessionUser = localData.sessionData; //load localstorage session

			const hours  = Math.abs(new Date() - localData.create) / 36e5; //get session create date and today date difference

			if(hours > 24){ //if session time is more than 24 hours; destroy the session
				DestroySession()
				return false;
			}

			if(sessionUser.token == null){ //check the session token is not valid
				DestroySession()
				return false;
			}

			let token =  sessionUser.token; //get the jwt token (encrypted token)
			token = decrypt(token); //decrypt the token

			delete sessionUser[ 'token' ]; //delete the existing token
			sessionUser.token = token; //set decrypted token

			setUserState(sessionUser);

			return true;
		}
		catch (e)
		{
			console.log('error occurred while authentication. destroyed th session.');
			console.log(e);
			//DestroySession();
		}
	}

	let authToken = state.user; //get redux branchActions user

	if(authToken.authenticated == false ||  authToken.userID == null || authToken.userName == null || authToken.roleID == null || authToken.email == null || authToken.token == null){
		return false;
	}

	SetSession(state.user);

	return true;

}
