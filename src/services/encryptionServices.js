import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';

export function encrypt(value)
{
    return CryptoAES.encrypt(value, process.env.REACT_APP_SECURITY_KEY);
}

export function decrypt(ciphertext)
{
    return CryptoAES.decrypt(
        ciphertext, process.env.REACT_APP_SECURITY_KEY,
    ).toString(CryptoENC);
}
