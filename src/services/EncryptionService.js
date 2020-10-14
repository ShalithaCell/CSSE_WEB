import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';
import{ SECRET_KEY } from '../config'

export function encrypt(value)
{
	return CryptoAES.encrypt(value, SECRET_KEY);
}

export  function decrypt(ciphertext)
{
	return CryptoAES.decrypt(ciphertext, SECRET_KEY).toString(CryptoENC);
}
