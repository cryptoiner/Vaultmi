import { Field, Group } from "snarkyjs";

export type EncryptResponse = {
  publicKey: Group;
  cipherText: Field[];
}