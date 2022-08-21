import { Vaultmi } from './Vaultmi';
import {
  isReady,
  shutdown,
  Mina,
  PrivateKey,
  PublicKey,
  Party,
  Field,
  Encryption,
  Encoding,
} from 'snarkyjs';
import File from './File';
import {StringCircuitValue} from './helpers/String'
import {EncryptResponse} from './helpers/types'


function createLocalBlockchain() {
  const Local = Mina.LocalBlockchain();
  Mina.setActiveInstance(Local);
  return Local.testAccounts[0].privateKey;
}

async function localDeploy(
  zkAppInstance: Vaultmi,
  zkAppPrivkey: PrivateKey,
  deployerAccount: PrivateKey
) {
  const txn = await Mina.transaction(deployerAccount, () => {
    Party.fundNewAccount(deployerAccount);
    zkAppInstance.deploy({ zkappKey: zkAppPrivkey });
  });
  await txn.send().wait();
}

describe('Vaultmi', () => {
  let deployerAccount: PrivateKey,
    zkAppAddress: PublicKey,
    zkAppPrivateKey: PrivateKey,
    file0: File,
    file1: File,
    zkAppInstance: Vaultmi,
    input: string;

  beforeAll(async () => {
    await isReady;
    deployerAccount = createLocalBlockchain();
    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();

    input = 'bafybeibieq746jmc5ndf2fn24jhk4i2knzadbmb6eatvpnlhcrffzd46bi'
    const input0 = input.slice(0,30)
    const input1 = input.slice(30)

    const ztring0 = new StringCircuitValue(input0);
    const field0 = Field.ofBits(ztring0.toBits());

    const ztring1 = new StringCircuitValue(input1);
    const field1 = Field.ofBits(ztring1.toBits());

    file0 = new File(zkAppAddress, field0, field1);
    file1 = new File(zkAppAddress, field0, field1);

    zkAppInstance = new Vaultmi(zkAppAddress);

    await localDeploy(zkAppInstance, zkAppPrivateKey, deployerAccount);
  });

  afterAll(async () => {
    setTimeout(shutdown, 0);
  });

  it('store files', async () => {
    const txn = await Mina.transaction(deployerAccount, () => {
      zkAppInstance.storeFile0(file0);
      zkAppInstance.storeFile1(file1);
      zkAppInstance.sign(zkAppPrivateKey);
    });
    await txn.send().wait();

    const file0Uploaded = zkAppInstance.file0.get()
    const hash0 = StringCircuitValue.fromBits(file0Uploaded.hash0.toBits()).toString().replace(/\0/g, '')
    const hash1 = StringCircuitValue.fromBits(file0Uploaded.hash1.toBits()).toString().replace(/\0/g, '')

    expect(hash0.concat(hash1)).toEqual(input);
  });
});
