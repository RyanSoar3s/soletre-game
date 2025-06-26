import CryptoJS from 'crypto-js';

export const encrypt = (str: string, password: string) => CryptoJS.AES.encrypt(str, password).toString();

export const decrypt = (cipherStr: string, password: string) => CryptoJS.AES.decrypt(cipherStr, password).toString(CryptoJS.enc.Utf8);
