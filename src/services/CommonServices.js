/**
 * Chekc the email is in valid format
 * @param email
 * @returns {boolean}
 * @constructor
 */
function IsValidEmail(email)
{
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))
    {
        return true;
    }
    else
    {
        return false;
    }
}

export default IsValidEmail;
