import { Web3Storage } from "web3.storage";

export const uploadFile = async () => {
    const client = new Web3Storage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEVFYWZhZTM1ODk0QUY5OTUyZTc1Y2Q2M0MwYTU3N2ZGMzVGNjg1NGQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjEwMTIxOTc4ODMsIm5hbWUiOiJWYXVsdG1pIn0.DK5uB6AMhv8USGhSCnR2WK5d1E8Mop7PkebGM2Zlza0",
  });

  const fileInput = document.querySelector('input[type="file"]');

    const rootCid = await client.put(fileInput[0]);
    const info = await client.status(rootCid);
  console.log(info);

    const res = await client.get(rootCid);   const files = await res.files();   for (const file of files) {
    console.log(`${file.cid} ${file.name} ${file.size}`);
  }
};
