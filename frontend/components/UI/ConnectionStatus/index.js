import Link from "next/link";
import {
  client as lensClient,
  challenge,
  authenticate,
} from "../../../clientApi";
import { ethers } from "ethers";
import clsx from "clsx";

import classes from "./ConnectionStatus.module.css";

export default function ConnectionStatus({
  accountAddress,
  accountDisplayName,
  accountDisplayBalance,
  chainName,
  onLensLogout,
  isLoggedInWithLens,
  onOpenChainModal,
  onOpenAccountModal,
  onLensLogin,
}) {
  async function lensLogin(lensaddress) {
    try {
      const challengeInfo = await lensClient.query({
        query: challenge,
        variables: { address: lensaddress },
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(
        challengeInfo.data.challenge.text
      );
      const authData = await lensClient.mutate({
        mutation: authenticate,
        variables: {
          address: lensaddress,
          signature: signature,
        },
      });
      const {
        data: {
          authenticate: { accessToken, refreshToken },
        },
      } = authData;
      onLensLogin(accessToken, refreshToken);
    } catch (err) {
      window.localStorage.removeItem("lens-auth-token");
      console.log("Error signing in: ", err);
    }
  }

  return (
    <div className={classes.connectedContainer}>
      <button
        className={clsx(classes.button, classes.displayNameButton)}
        onClick={onOpenAccountModal}
        type="button"
      >
        {accountDisplayName} ({accountDisplayBalance ?? ""})
      </button>
      <div className={classes.networkProfile}>
        <button
          className={clsx(classes.button, classes.networkProfileButton)}
          onClick={onOpenChainModal}
          type="button"
        >
          {chainName}
        </button>
        <Link href={`/user/${accountAddress}`}>
          <button className={clsx(classes.button, classes.dashBoardButton)}>
            Dashboard
          </button>
        </Link>

        {isLoggedInWithLens ? (
          <button className={classes.button} onClick={onLensLogout}>
            Disconnect Lens
          </button>
        ) : (
          <button
            className={classes.button}
            onClick={() => lensLogin(accountAddress)}
          >
            Login With Lens
          </button>
        )}
      </div>
    </div>
  );
}
