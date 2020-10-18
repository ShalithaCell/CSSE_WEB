import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';

/**
 * Encrypt the values
 * @param value
 * @returns {CipherParams|PromiseLike<ArrayBuffer>}
 */
export function encrypt(value)
{
    return CryptoAES.encrypt(value, process.env.REACT_APP_SECURITY_KEY);
}

/**
 * decrypt the values
 * @param ciphertext
 * @returns {string}
 */
export function decrypt(ciphertext)
{
    return CryptoAES.decrypt(
        ciphertext, process.env.REACT_APP_SECURITY_KEY,
    ).toString(CryptoENC);
}
