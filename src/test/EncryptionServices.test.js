import React from "react";
import { encrypt, decrypt } from "../services/EncryptionServices";

test('encryption decryption test', () =>
{
    const val = 'hello-world';

    const encryptedValue = encrypt(val);

    const decryptValue = decrypt(encryptedValue);

    expect(decryptValue).toBe(val);
});
