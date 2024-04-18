import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class DecriptionService {
    public decryptData(encryptedData: string): string {
        const decodedData = CryptoJS.enc.Base64.parse(encryptedData);
        const iv = CryptoJS.lib.WordArray.create(decodedData.words.slice(0, 4));
        const encryptedText = CryptoJS.lib.WordArray.create(
            decodedData.words.slice(4)
        );

        const cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: encryptedText,
            iv,
        });

        const decryptedBytes = CryptoJS.AES.decrypt(
            cipherParams,
            CryptoJS.enc.Hex.parse(this.sha256(environment.encryptionKey)),
            { iv }
        );

        const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
        return decryptedText;
    }

    private sha256(input: string): string {
        return CryptoJS.SHA256(input).toString();
    }

    constructor() {}
}
