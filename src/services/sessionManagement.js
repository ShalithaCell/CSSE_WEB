import { IDENTIFICATION_STORAGE } from '../config';

export function SetSession(obj)
{
	obj.create = new Date();
	let cache = [];
	localStorage.setItem(IDENTIFICATION_STORAGE, JSON.stringify(obj, function(key, value) {
		if (typeof value === 'object' && value !== null) {
			if (cache.indexOf(value) !== -1) {
				// Duplicate reference found, discard key
				return;
			}
			// Store value in our collection
			cache.push(value);
		}
		return value;
	}));
	cache = null;
}

export function GetSession()
{
	if (localStorage.getItem(IDENTIFICATION_STORAGE) === null) {
		return null;
	}else{
		return localStorage.getItem(IDENTIFICATION_STORAGE);
	}
}

export function DestroySession()
{
	localStorage.removeItem(IDENTIFICATION_STORAGE);
}
