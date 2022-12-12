import { Web3Storage, getFilesFromPath } from "web3.storage";

function makeStorageClient() {
  return new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
}

export async function storeFilesIPFS(files) {
  const web3StorageFiles = await Promise.all(files.map(async ({ name, path }) => {
    const file = await getFilesFromPath(path);

    file[0].name = name;
    return file[0];
  }));

  const client = makeStorageClient();
  const cid = await client.put(web3StorageFiles);

  return cid;
}
