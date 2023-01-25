import contractABI from './FontProjectV2.json';
import { ethers } from 'ethers';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

let fontContract;

function connectContract() {
  if (fontContract) {
    return fontContract;
  }

  const contractABI = abiJSON.abi;
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      fontContract = new ethers.Contract(contractAddress, contractABI, signer);
    } else {
      throw new Error("Please connect to the Polygon Mumbai network.");
    }

    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();

            fontContract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
        } else {
            throw new Error('Please connect to the Polygon Mumbai network.');
        }
    } catch (error) {
        console.log('ERROR:', error);
    }
    return fontContract;
}

export default connectContract;
