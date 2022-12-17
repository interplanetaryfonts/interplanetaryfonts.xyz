import { Web3Storage, File } from "web3.storage";

function makeStorageClient() {
  return new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
}

export async function storeFilesIPFS(files) {
  const web3StorageFiles = files.map(({ name, buffer }) => {
    return new File([buffer], name);
  });

  const client = makeStorageClient();
  const cid = await client.put(web3StorageFiles);

  return cid;
}
