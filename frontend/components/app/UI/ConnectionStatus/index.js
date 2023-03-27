import { useContext } from "react";
import Link from "next/link";
import clsx from "clsx";
import classes from "./ConnectionStatus.module.css";
import { LensContext } from "@/store/LensContextProvider";

export default function ConnectionStatus({
  accountAddress,
  accountDisplayName,
  accountDisplayBalance,
  chainName,
  onOpenChainModal,
  onOpenAccountModal,
}) {
  const lensContext = useContext(LensContext);
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

        {lensContext.isLensConnected ? (
          <button className={classes.button} onClick={lensContext.removeToken}>
            Disconnect Lens
          </button>
        ) : (
          <button
            className={classes.button}
            onClick={() => lensContext.lensLogin(accountAddress)}
          >
            Login With Lens
          </button>
        )}
      </div>
    </div>
  );
}
