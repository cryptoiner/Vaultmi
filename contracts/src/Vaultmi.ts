import {
  SmartContract,
  method,
  DeployArgs,
  Permissions,
  state,
  State,
  PublicKey,
} from 'snarkyjs';
import File from './File';

export class Vaultmi extends SmartContract {
  @state(File) file0 = State<File>();
  @state(File) file1 = State<File>();

  deploy(args: DeployArgs) {
    super.deploy(args);
    this.setPermissions({
      ...Permissions.default(),
      editState: Permissions.proofOrSignature(),
    });
  }

  @method storeFile0(_file0: File) {
    this.file0.set(_file0);
  }

  @method storeFile1(_file1: File) {
    this.file1.set(_file1);
  }

  @method isFile0Owner(_publicKey: PublicKey) {
    this.file0.get().isOwner(_publicKey)
  }

  @method isFile1Owner(_publicKey: PublicKey) {
    this.file1.get().isOwner(_publicKey)
  }
}
