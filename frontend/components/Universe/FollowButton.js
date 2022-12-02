import React from 'react';
import ABI from '../../abi.json';
import { ethers } from 'ethers';
import Button from '../UI/Button';

const CONTRACT_ADDRESS = '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82';

export default function FollowButton(props) {
    const id = props.id;
    async function followUser() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
        try {
            const tx = await contract.follow([id], [0x0]);
            await tx.wait();
            console.log('Followed user successfully');
        } catch (err) {
            console.log('Failed to follow user due to', err);
        }
    }
    return (
        <Button onClick={followUser}>
            {props.isFollowedByMe ? 'Following' : 'Follow'}
        </Button>
    );
}
