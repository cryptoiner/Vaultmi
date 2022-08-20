import {
  CircuitValue,
  Encoding,
  prop,
  PublicKey,
  Field,
  Encryption,
  PrivateKey,
  Group,
} from 'snarkyjs';

type CipherText = {
  publicKey: Group;
  cipherText: Field[];
};

class FilePart extends CircuitValue {
  @prop publicKey: PublicKey;
  @prop ipfsHashEncrypted: CipherText;

  constructor(publicKey: PublicKey, ipfsHash: string) {
    super();

    this.publicKey = publicKey;
    console.log('0', JSON.stringify(this.publicKey));

    let ipfsHashEncoded = Encoding.stringToFields(ipfsHash);
    console.log('1', JSON.stringify(ipfsHashEncoded));
    this.ipfsHashEncrypted = Encryption.encrypt(ipfsHashEncoded, publicKey);
    console.log('2', JSON.stringify(this.ipfsHashEncrypted));
  }

  validate(privateKey: PrivateKey) {
    const hashDecripted = Encryption.decrypt(
      this.ipfsHashEncrypted,
      privateKey
    );
    console.log('3', JSON.stringify(this.ipfsHashEncrypted));
    console.log('4', JSON.stringify(privateKey.toPublicKey()));
    const decryt = Encoding.stringFromFields(hashDecripted);
    console.log('5', decryt);
    const hashReEncripted = Encryption.encrypt(
      hashDecripted,
      privateKey.toPublicKey()
    );
    console.log('6', JSON.stringify(hashReEncripted));
    return decryt;
  }
}

export default FilePart;
