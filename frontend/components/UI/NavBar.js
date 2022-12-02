import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import logo from '../../public/logoHeader.svg';
import classes from '../../styles/NavBar.module.css';
import Button from '../UI/Button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { client as lensClient, challenge, authenticate, getProfileByAddress, createIPFontsUser } from '../../clientApi';
import { ethers } from 'ethers';

export default function NavBar(props) {
    const router = useRouter();
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
                    authenticate: { accessToken, refreshToken },
                },
            } = authData;
            props.handleLensLogin(accessToken, refreshToken);

            // TODO - check for user existing in our contract using graph call
            // before going on and creating the user 
            const { data : profileData } = await lensClient.query({
                query: getProfileByAddress,
                variables: {
                    owner: lensaddress,
                },
            });

            const lensHandle = profileData?.profiles?.items[0]?.handle;

            if (lensHandle) {
                await createIPFontsUser({ lensAddress: lensaddress, lensHandle });
            }
        } catch (err) {
            window.localStorage.removeItem('lens-auth-token');
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
                    <Link href='/universe' passHref legacyBehavior>
                        <a
                            className={`${classes['nav-link']} ${
                                router.pathname === '/universe'
                                    ? classes['nav-link-active']
                                    : ''
                            }`}
                        >
                            FontsUniverse
                        </a>
                    </Link>
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
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useEffect(() => {
                            props.handleConnected(
                                ...(connected
                                    ? [true, account.address]
                                    : [false, ''])
                            );
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
                                                        Dashboard
                                                    </button>
                                                </Link>

                                                {props.token ? (
                                                    <button
                                                        onClick={
                                                            props.handleLensLogout
                                                        }
                                                    >
                                                        Disconnect Lens
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            lensLogin(
                                                                account.address
                                                            )
                                                        }
                                                    >
                                                        Signup With Lens
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
