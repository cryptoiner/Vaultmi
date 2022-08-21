import {
  isReady,
  shutdown,
  PrivateKey,
  PublicKey,
  Encryption,
  Encoding,
  Group,
  Field,
} from 'snarkyjs';
import { EncryptResponse } from './helpers/types';

describe('Vaultmi', () => {
  let zkAppAddress: PublicKey, zkAppPrivateKey: PrivateKey;

  beforeAll(async () => {
    await isReady;
    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();
  });

  afterAll(async () => {
    setTimeout(shutdown, 0);
  });

  it('encrypt and decrypt file', async () => {
    // generate keys
    let privateKey = PrivateKey.random();
    let publicKey = privateKey.toPublicKey();

    // message
    let message = 'This is a secret.';
    let messageFields = Encoding.stringToFields(message);

    // encrypt
    let cipherText = Encryption.encrypt(messageFields, publicKey);

    const cipherJSON = JSON.stringify(cipherText); // this will be saved on the ipfs
    console.log(cipherJSON);
    const cipher: {
      publicKey: Group;
      cipherText: Field[];
    } = JSON.parse(cipherJSON);

    // decrypt
    let decryptedFields = Encryption.decrypt(cipher, privateKey);
    let decryptedMessage = Encoding.stringFromFields(decryptedFields);

    expect(message).toEqual(decryptedMessage);
  });
});
