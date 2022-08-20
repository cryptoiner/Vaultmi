import { Contract } from './Contract';
import {
  isReady,
  shutdown,
  Mina,
  PrivateKey,
  PublicKey,
  Party,
} from 'snarkyjs';
import FilePart from './FilePart';

/*
 * This file specifies how to test the `Add` example smart contract. It is safe to delete this file and replace
 * with your own tests.
 *
 * See https://docs.minaprotocol.com/zkapps for more info.
 */

function createLocalBlockchain() {
  const Local = Mina.LocalBlockchain();
  Mina.setActiveInstance(Local);
  return Local.testAccounts[0].privateKey;
}

async function localDeploy(
  zkAppInstance: Contract,
  zkAppPrivkey: PrivateKey,
  deployerAccount: PrivateKey
) {
  const txn = await Mina.transaction(deployerAccount, () => {
    Party.fundNewAccount(deployerAccount);
    zkAppInstance.deploy({ zkappKey: zkAppPrivkey });
  });
  await txn.send().wait();
}

describe('Contract', () => {
  let deployerAccount: PrivateKey,
    zkAppAddress: PublicKey,
    zkAppPrivateKey: PrivateKey,
    filePart: FilePart;

  const ipfsHash =
    'bafybeic46up5ny7esfxes7zuvq74c7uirdn6bnwl6lwvryrnuhaogxpj4e';

  beforeEach(async () => {
    await isReady;
    deployerAccount = createLocalBlockchain();
    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();

    filePart = new FilePart(zkAppPrivateKey.toPublicKey(), ipfsHash);
  });

  afterAll(async () => {
    // `shutdown()` internally calls `process.exit()` which will exit the running Jest process early.
    // Specifying a timeout of 0 is a workaround to defer `shutdown()` until Jest is done running all tests.
    // This should be fixed with https://github.com/MinaProtocol/mina/issues/10943
    setTimeout(shutdown, 0);
  });

  it('validate decrypt', async () => {
    const zkAppInstance = new Contract(zkAppAddress);
    let hash = '';
    console.log('filePart', JSON.stringify(filePart));

    await localDeploy(zkAppInstance, zkAppPrivateKey, deployerAccount);

    const txn = await Mina.transaction(deployerAccount, () => {
      hash = zkAppInstance.validate(filePart, zkAppPrivateKey);
      console.log('hash', hash);
      zkAppInstance.sign(zkAppPrivateKey);
    });
    await txn.send().wait();

    expect(ipfsHash).toEqual(hash);
  });
});
