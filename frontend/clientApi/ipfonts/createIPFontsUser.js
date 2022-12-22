import { readContract } from '@wagmi/core'
import connectContract from '../../utils/connectContract';
import abiJSON from "../../utils/FontProject.json";
import { ethers } from 'ethers';
import getIPFontsUser from './getIPFontsUser';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export async function createIPFontsUser({
  address,
  lensHandle,
  email,
  name,
  website,
  bio,
  links
}) {
  // TODO : create nextjs api endpoint that creates profile data json, uploads it to
  // IPFS using web3.storage and returns the IPFS CID. This is for data outside of
  // lensHandle

  const profileInfoCID = '';

  const ipfontsContract = connectContract();

  if (!ipfontsContract) {
    console.log('Cound not connect to contract');
    return;
  }

  const { createdAt } = await getIPFontsUser(address);

  const isRegistered = !ethers.BigNumber.from(createdAt).isZero;
  
  if (!isRegistered) {
    const createdAt = Date.now();

    const txn = await ipfontsContract.createUser(
      lensHandle,
      profileInfoCID,
      createdAt,
      { gasLimit: 900000 }
    );
    console.log("IPFonts : Creating user entity", txn.hash);

    const wait = await txn.wait();
    console.log("IPFonts : User entity created", txn.hash);
  } else {
    console.log('User alread registered');
  }
}
