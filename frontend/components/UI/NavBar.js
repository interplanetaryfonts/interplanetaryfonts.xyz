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
                {/* Connect Button here */}
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
