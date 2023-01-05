import { create } from 'ipfs-http-client'

function makeInfuraStorageClient() {
  const idKeySecretPair = `${process.env.INFURA_IPFS_PROJECT_ID}:${process.env.INFURA_IPFS_KEY_SECRET}`;
  const auth = 'Basic ' + Buffer.from(idKeySecretPair).toString('base64');

  return create({
    host:  process.env.INFURA_IPFS_HOST,
    port: process.env.INFURA_IPFS_PORT,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
  });
}

export async function storeMetadataFileIPFS(file) {
  const client = makeInfuraStorageClient();

  const result = await client.add({
    path : file.path,
    content : file.content
  });

  return result.cid.toString();
}