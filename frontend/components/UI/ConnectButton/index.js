import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import clsx from 'clsx';
import Button from '../Button';
import ConnectionStatus from '../ConnectionStatus';

import classes from './ConnectButton.module.css';

export default function ConnectButton({
  handleConnected,
  handleLensLogout,
  isLoggedInWithLens,
  onLensLogin
}) {
  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        if (connected) {
          handleConnected(true, account.address);
        } else {
          handleConnected(false, '');
        }

        const wrapperClasses = clsx({
          [classes.wrapperLoading] : !ready
        });

        let onButtonClick;
        let onButtonText;

        if (!connected) {
          onButtonClick = openConnectModal;
          onButtonText = 'Connect Wallet';
        }

        if (chain?.unsupported) {
          onButtonClick = openChainModal;
          onButtonText = 'Wrong network';
        }

        return (
          <div className={wrapperClasses}>
            {!connected || chain?.unsupported ? (
              <Button
                onClick={onButtonClick}
                type='button'
              >
                {onButtonText}
              </Button>
            ) : (
              <ConnectionStatus
                accountAddress={account.address}
                accountDisplayName={account.displayName}
                accountDisplayBalance={account.displayBalance}
                chainName={chain?.name}
                onLensLogout={handleLensLogout}
                isLoggedInWithLens={isLoggedInWithLens}
                onOpenChainModal={openChainModal}
                onOpenAccountModal={openAccountModal}
                onLensLogin={onLensLogin}
              />
            )}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
}
