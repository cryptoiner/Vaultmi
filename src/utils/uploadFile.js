import { Web3Storage } from "web3.storage";
// const {
//   Encryption,
//   Encoding
// } = require('snarkyjs');

const client = new Web3Storage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEVFYWZhZTM1ODk0QUY5OTUyZTc1Y2Q2M0MwYTU3N2ZGMzVGNjg1NGQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjEwMTIxOTc4ODMsIm5hbWUiOiJWYXVsdG1pIn0.DK5uB6AMhv8USGhSCnR2WK5d1E8Mop7PkebGM2Zlza0",
});

const encryptShare = (address, share) => {
  // let messageFields = Encoding.stringToFields(share);
  // return Encryption.encrypt(messageFields, address);
}

const decryptShare = (hash) => {
  // let file = downloadFile(hash);
  // let decryptedFields = Encryption.decrypt(file, privateKey);
  // let decryptedMessage = Encoding.stringFromFields(decryptedFields);
}


export const uploadFile = async () => {
  const fileInput = document.querySelector('input[type="file"]')
  const rootCid = await client.put(fileInput.files);
  const info = await client.status(rootCid);
  console.log(info);
  return info.cid
};

export const downloadFile = async (cid) => {
  const res = await client.get(cid);
  return await res.files()
}
