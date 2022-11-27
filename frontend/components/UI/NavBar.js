import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logoHeader.svg';
import classes from '../../styles/NavBar.module.css';
import Button from '../UI/Button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { client as lensClient, challenge, authenticate } from '../../api';
import { ethers } from 'ethers';

export default function NavBar(props) {
    const [navbarOpen, setNavbarOpen] = useState(false);

    const handleHamburgerMenu = () => {
        setNavbarOpen(!navbarOpen);
    };

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
                    authenticate: { accessToken },
                },
            } = authData;
            console.log({ accessToken });
            props.handleLensLogin(accessToken);
        } catch (err) {
            console.log('Error signing in: ', err);
        }
    }

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
                    <Link href='../../universe'>Universe</Link>
                </div>
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
                        const ready =
                            mounted && authenticationStatus !== 'loading';
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
                                            <Button
                                                onClick={openConnectModal}
                                                type='button'
                                            >
                                                Connect Wallet
                                            </Button>
                                        );
                                    }

                                    if (chain.unsupported) {
                                        return (
                                            <Button
                                                onClick={openChainModal}
                                                type='button'
                                            >
                                                Wrong network
                                            </Button>
                                        );
                                    }

                                    return (
                                        <div
                                            className={
                                                classes['connected-container']
                                            }
                                        >
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
                                            <div
                                                className={
                                                    classes['network-profile']
                                                }
                                            >
                                                <button
                                                    style={{
                                                        borderRight:
                                                            '2px solid var(--red)',
                                                    }}
                                                    onClick={openChainModal}
                                                    type='button'
                                                >
                                                    {chain.name}
                                                </button>
                                                <Link
                                                    href={`/user/${account.address}`}
                                                >
                                                    <button
                                                        style={{
                                                            borderRight:
                                                                '2px solid var(--red)',
                                                        }}
                                                    >
                                                        Profile
                                                    </button>
                                                </Link>

                                                {props.token ? (
                                                    <Link href={`/universe`}>
                                                        <button>
                                                            Universe Profile
                                                        </button>
                                                    </Link>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            lensLogin(
                                                                account.address
                                                            )
                                                        }
                                                    >
                                                        Lens Login
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        );
                    }}
                </ConnectButton.Custom>
                <button
                    className={classes.cancel}
                    onClick={handleHamburgerMenu}
                >
                    Cancel
                </button>
            </div>
        </nav>
    );
}
