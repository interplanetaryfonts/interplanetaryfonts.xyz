import React from "react";
import ABI from "../../abi.json";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82";

export default function FollowButton(props) {
  const id = props.id;
  async function followUser() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    try {
      const tx = await contract.follow([id], [0x0]);
      await tx.wait();
      console.log("Followed user successfully");
    } catch (err) {
      console.log("Failed to follow user due to", err);
    }
  }
  return (
    <button
      onClick={followUser}
      type="button"
      className="inline-flex items-center px-4 py-1 border border-transparent text-sm text-center justify-center  font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 w-10/12 self-center mb-5"
      children={props.isFollowedByMe ? "Following" : "Follow"}
    ></button>
  );
}
