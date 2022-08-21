import { Web3Storage } from "web3.storage";
let secrets = require("@134dd3v/secrets.js")

const client = new Web3Storage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEVFYWZhZTM1ODk0QUY5OTUyZTc1Y2Q2M0MwYTU3N2ZGMzVGNjg1NGQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjEwMTIxOTc4ODMsIm5hbWUiOiJWYXVsdG1pIn0.DK5uB6AMhv8USGhSCnR2WK5d1E8Mop7PkebGM2Zlza0",
});

const encryptShare = (address, share) => {

}

const decryptShare = (hash ) => {

}


export const uploadFile = async (walletAddress, userAddress) => {
    const fileInput = document.querySelector('input[type="file"]')
    const secretFile = Buffer.from(fileInput).toString()
    const shares = secrets.share(secretFile, 2, 2)
    const primarySharedEncrypted = encryptShare(shares.slice(0,1))
    const secondarySharedEncrypted = encryptShare(shares.slice(1,2))
    const primaryCid = await client.put([new File(primarySharedEncrypted)]);
    const secondaryCid = await client.put([new File(secondarySharedEncrypted)]);
    const infoPrimary = await client.status(primaryCid);
    const infoSecondary = await client.status(secondaryCid);
    return [infoPrimary.cid, infoSecondary.cid]
};

export const downloadFile = async (cid) => {
  const res = await client.get(cid);
  return await res.files()
}
