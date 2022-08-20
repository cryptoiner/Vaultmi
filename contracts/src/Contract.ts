import {
  SmartContract,
  method,
  DeployArgs,
  Permissions,
  PrivateKey,
} from 'snarkyjs';
import FilePart from './FilePart';

export class Contract extends SmartContract {
  deploy(args: DeployArgs) {
    super.deploy(args);
    this.setPermissions({
      ...Permissions.default(),
      editState: Permissions.proofOrSignature(),
    });
  }

  @method validate(filePart: FilePart, privateKey: PrivateKey) {
    return filePart.validate(privateKey);
  }
}
