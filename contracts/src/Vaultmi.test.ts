import { Vaultmi } from './Vaultmi';
import {
  isReady,
  shutdown,
  Mina,
  PrivateKey,
  PublicKey,
  Party,
  Field,
} from 'snarkyjs';
import File from './File';
import {StringCircuitValue} from './helpers/String'

function createLocalBlockchain() {
  const Local = Mina.LocalBlockchain();
  Mina.setActiveInstance(Local);
  return Local.testAccounts[0].privateKey;
}

function segmentHash(ipfsHashFile: string) {
  // The StringCircuitValue only support 31 chars so we decided to segment in groups of 30 chars
  const ipfsHash0 = ipfsHashFile.slice(0,30) // first part of the ipfsHash
  const ipfsHash1 = ipfsHashFile.slice(30) // second part of the ipfsHash

  const ztring0 = new StringCircuitValue(ipfsHash0);
  const field0 = Field.ofBits(ztring0.toBits());

  const ztring1 = new StringCircuitValue(ipfsHash1);
  const field1 = Field.ofBits(ztring1.toBits());

  return {field0, field1}
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
    ipfsHashFile0: string,
    ipfsHashFile1: string;

  beforeAll(async () => {
    await isReady;
    deployerAccount = createLocalBlockchain();
    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();

    ipfsHashFile0 = 'bafybeibieq746jmc5ndf2fn24jhk4i2knzadbmb6eatvpnlhcrffzd46bi'
    ipfsHashFile1 = 'bafybeic46up5ny7esfxes7zuvq74c7uirdn6bnwl6lwvryrnuhaogxpj4e'

    const ipfsHashSegmented0 = segmentHash(ipfsHashFile0)
    const ipfsHashSegmented1 = segmentHash(ipfsHashFile1)

    file0 = new File(zkAppAddress, ipfsHashSegmented0.field0, ipfsHashSegmented0.field1); 
    file1 = new File(zkAppAddress, ipfsHashSegmented1.field0, ipfsHashSegmented1.field1);

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

    expect(hash0.concat(hash1)).toEqual(ipfsHashFile0);
  });
});
