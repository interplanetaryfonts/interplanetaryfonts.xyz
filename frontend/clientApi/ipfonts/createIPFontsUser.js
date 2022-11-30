import connectContract from '../../utils/connectContract';

export async function createIPFontsUser({
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

  if (ipfontsContract) {
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
    console.log("Error getting contract.");
  }
}
