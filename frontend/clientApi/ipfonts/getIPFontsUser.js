import { readContract } from "@wagmi/core";
import connectContract from "@/utils/connectContract";
import abiJSON from "@/utils/FontProject.json";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export default async function getIPFontsUser({ address }) {
  const ipfontsContract = connectContract();

  if (!ipfontsContract) {
    console.log("Cound not connect to contract");
    return;
  }

  return await readContract({
    address: contractAddress,
    abi: abiJSON.abi,
    functionName: "addressToUser",
    args: [address],
  });
}
