/**
 * Dealing with the session and handle session for the application
 * @param obj
 * @constructor
 */
export function SetSession(obj)
{
    // eslint-disable-next-line no-param-reassign
    obj.create = new Date();
    let cache = [];

    localStorage.setItem(
        // eslint-disable-next-line no-mixed-spaces-and-tabs
    	process.env.REACT_APP_IDENTIFICATION_STORAGE,
        JSON.stringify(obj, (key, value) =>
        {
            if (typeof value === 'object' && value !== null)
            {
                if (cache.indexOf(value) !== -1)
                {
                // Duplicate reference found, discard key
                    return;
                }

                // Store value in our collection
                cache.push(value);
            }

            // eslint-disable-next-line consistent-return
            return value;
        }),
    );
    cache = null;
}

/**
 * get session data
 * @returns {string|null}
 * @constructor
 */
export function GetSession()
{
    if (localStorage.getItem(process.env.REACT_APP_IDENTIFICATION_STORAGE) === null)
    {
        return null;
    }
    else
    {
        return localStorage.getItem(process.env.REACT_APP_IDENTIFICATION_STORAGE);
    }
}

/**
 * destroy the session
 * @constructor
 */
export function DestroySession()
{
    localStorage.removeItem(process.env.REACT_APP_IDENTIFICATION_STORAGE);
}
