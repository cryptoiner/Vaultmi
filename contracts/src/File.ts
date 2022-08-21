import {
  CircuitValue,
  Field,
  prop,
  PublicKey,
} from 'snarkyjs';

class File extends CircuitValue {
  @prop publicKey: PublicKey;
  @prop hash0: Field;
  @prop hash1: Field;

  constructor(publicKey: PublicKey, hash0: Field, hash1: Field) {
    super();

    this.publicKey = publicKey;
    this.hash0 = hash0;
    this.hash1 = hash1;
  }

  isOwner(_publicKey: PublicKey) {
    return _publicKey === this.publicKey
  }
}

export default File;
