import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logoHeader.svg';
import classes from '../../styles/NavBar.module.css';
import Button from '../UI/Button';
/*
Fake data only
import ConnectButton from './ConnectButton';
import ConnectedMenu from './ConnectedMenu';
*/
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function NavBar(props) {
  // use props when not wallet connect
  const [navbarOpen, setNavbarOpen] = useState(false);
  /*
  //When fake data is used
  const [menu, setMenu] = useState(false);
  // Event handlers
  const handleConnectedMenu = () => {
      if (props.connected) {
        setMenu(pastMenu => !pastMenu);
      } else {
        props.connect();
      }
    };
  */

  const handleHamburgerMenu = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <nav className={classes.nav}>
      <div className={classes['nav-logo']}>
        <Link href='/'>
          <a>
            <Image
              src={logo}
              alt='InterplanetaryFonts'
              width={78.91}
              height={100}
              className={classes.logo}
            />
          </a>
        </Link>
        <h5>InterplanetaryFonts</h5>
      </div>
      <button
        className={`${classes['hamburger-button']}`}
        type='button'
        onClick={handleHamburgerMenu}
      >
        <div className={classes['hamburger-line']}></div>
        <div className={classes['hamburger-line']}></div>
        <div className={classes['hamburger-line']}></div>
      </button>
      <div
        className={`${classes['nav-menu']} ${
          !navbarOpen && classes['nav-menu-closed']
        }`}
      >
        <div className='flex flex-wrap items-center'>
          <input
            type='text'
            className='text-md w-72 border-2 px-4 py-2 border-darkblue rounded-full border-dashed text-darkblue-100 placeholder-darkblue hover:border-solid  hover:border-darkblue  focus:border-darkblue  focus:border-solid focus:outline-none'
            placeholder='Search Fonts in the Universe'
          ></input>
        </div>
        {/* <ConnectButton 
            user={props.user}
            connected={props.connected}
            buttonText={props.buttonText}
            onClick={handleConnectedMenu}
          />
          { props.connected && (
            <ConnectedMenu
              menu={menu}
              user={props.user}
              handleDisconnect={handleDisconnect}
            /> */}
        <ConnectButton.Custom>
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
              (!authenticationStatus ||
                authenticationStatus === 'authenticated');
            useEffect(() => {
              props.handleConnected(connected ? true : false);
            }, [connected]);
            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  style: {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <Button onClick={openConnectModal} type='button'>
                        Connect Wallet
                      </Button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <Button onClick={openChainModal} type='button'>
                        Wrong network
                      </Button>
                    );
                  }

                  return (
                    <div className={classes['connected-container']}>
                      <button
                        style={{ borderRadius: 0 }}
                        onClick={openAccountModal}
                        type='button'
                      >
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ''}
                      </button>
                      <div className={classes['network-profile']}>
                        <button
                          style={{ borderRight: '2px solid var(--red)' }}
                          onClick={openChainModal}
                          type='button'
                        >
                          {/*{chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                overflow: 'hidden',
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  style={{ width: 12, height: 12 }}
                                />
                              )}
                            </div>
                          )}*/}
                          {chain.name}
                        </button>
                        <Link href={`/user/${account.address}`}>
                          <button>Profile</button>
                        </Link>
                      </div>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
        <button className={classes.cancel} onClick={handleHamburgerMenu}>
          Cancel
        </button>
      </div>
    </nav>
  );
}
