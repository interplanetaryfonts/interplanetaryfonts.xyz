import Link from 'next/link';
import classes from './ConnectionStatus.module.css';

export default function ConnectionStatus({
  accountAddress,
  accountDisplayName,
  accountDisplayBalance,
  onLensLogout,
  isLoggedInWithLens,
  onOpenChainModal,
  onOpenAccountModal
}) {


  return (
    <div className={classes.connectedContainer}>
      <button
        className={classes.displayNameButton}
        onClick={onOpenAccountModal}
        type='button'
      >
        {accountDisplayName}
        {accountDisplayBalance ?? ''}
      </button>
      <div className={classes.networkProfile}>
        <button
          className={classes.networkProfileButton}
          onClick={onOpenChainModal}
          type='button'
        >
          {chain.name}
        </button>
        <Link
          href={`/user/${accountAddress}`}
        >
          <button className={classes.button}>
            Dashboard
          </button>
        </Link>

        {isLoggedInWithLens ? (
          <button
            onClick={onLensLogout}
          >
            Disconnect Lens
          </button>
        ) : (
          <button
            onClick={() =>
              lensLogin(
                accountAddress
              )
            }
          >
            Login With Lens
          </button>
        )}
      </div>
    </div>
  );
}