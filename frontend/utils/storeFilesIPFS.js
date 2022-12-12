import { Web3Storage } from "web3.storage";

function makeStorageClient() {
  return new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
}

export async function storeFilesIPFS(files) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  return cid;
}
