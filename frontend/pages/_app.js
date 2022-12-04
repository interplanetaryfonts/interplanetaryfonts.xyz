// Global imports
import { useEffect, useState } from 'react';
import '../styles/reset.css';
import '../styles/globals.css';

// Connect wallet modules
import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultWallets,
    RainbowKitProvider,
    lightTheme,
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

// Wallet connect objects
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;
const { chains, provider } = configureChains(
    [chain.polygonMumbai],
    [infuraProvider({ infuraId }), publicProvider()]
);
const { connectors } = getDefaultWallets({
    appName: 'frontend',
    chains,
});
const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

// InterplanetaryFonts GraphQL
import { ApolloProvider } from '@apollo/client';
import { client as ipfontsClient } from '../apollo-client';

// Lens API
import { client as lensClient, refresh } from '../clientApi';

// Components
import NavBar from '../components/UI/NavBar';
import MainContainer from '../components/UI/MainContainer';
import Footer from '../components/UI/Footer';

// Dummy Data
const fakeUser = {
        username: 'gutentype',
        address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Gutenberg.jpg',
        following: 0,
        followers: 1439,
        website: 'https://type-papa.xyz',
        about: 'Johannes Gensfleisch zur Laden zum Gutenberg was a German inventor, printer, publisher, and goldsmith who introduced printing to Europe with his mechanical movable-type printing press.',
        social: [
            { icon: 'RD', url: 'https://app.radicle.xyz/gutentype' },
            { icon: 'GH', url: 'https://github.com/gutentype' },
            { icon: 'TW', url: 'https://twitter.com/gutentype' },
            { icon: 'TG', url: 'https://t.me/gutentype' },
            { icon: 'DC', url: 'https://discordapp.com/users/gutentype#5922' },
            { icon: 'IG', url: 'https://www.instagram.com/gutentype' },
        ],
        created: [
            { txt: 'Sans Serif', url: '/font/test-font' },
            { txt: 'Serif', url: '/font/test-font' },
            { txt: 'Display', url: '/font/test-font' },
        ],
        collabs: [
            {
                txt: 'Bitdoni FontStream',
                url: '/stream/000001',
                cstatus: true,
            },
            {
                txt: 'Blackletther FontStream',
                url: '/stream/000001',
                cstatus: false,
            },
        ],
        treasury: {
            balance: 3260.108848,
            fontStreams: [
                {
                    txt: 'Small Caps',
                    ammount: 32.1529387467288193782,
                    url: '/stream/000001',
                },
                {
                    txt: 'Old Style Figures',
                    ammount: 78.227364004588392097,
                    url: '/stream/000001',
                },
            ],
        },
        collected: [{ txt: 'Some Font Collected', url: '/nft/000001' }],
        funded: [{ txt: 'Some Font Stream', url: '/stream/000001' }],
    },
    fakeFont = {
        nme: 'Paradisio',
        cssname: 'Paradisio',
        style: 'normal',
        weight: 400,
        creators: [
            {
                username: 'gutentype',
                address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
            },
        ],
        description: 'Badass Sans Serif Latin Font with English support',
        ipfs: 'https://ipfs.io/ipfs/QmWC2TeLHdDpKCu8Rip4fjZv1yXvgLBvp8AV7oa54Ajsf6?filename=Paradisio-IF.otf',
        format: 'format',
        streams: [
            { nme: 'Add ligatures', url: '/stream/000001' },
            { nme: 'Add French Support', url: '/stream/000001' },
        ],
        collected: [
            {
                username: 'gutentype',
                address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
            },
        ],
        specimen: [
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            'abcdefghijklmnopqrstuvwxyz',
            '0123456789#?!&·()-.,',
        ],
        preselect: ['Custom', 'Uppercase', 'Lowercase', 'Complete'],
        charset:
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#?!&·()-.,',
        price: 0.5,
    };

export default function MyApp({ Component, pageProps }) {
    const [font] = useState(fakeFont),
        [user] = useState(fakeUser),
        [connected, setConnected] = useState(true),
        [address, setAddress] = useState(),
        [token, setToken] = useState();

    const handleConnected = (bool, currentAddress) => {
        setConnected(bool);
        setAddress(currentAddress);
    };

    useEffect(() => {
        // Lens connection
        async function refreshTkn(prevRefreshToken) {
            try {
                const refresher = await lensClient.mutate({
                    mutation: refresh,
                    variables: { refreshToken: prevRefreshToken },
                });
                const { accessToken, refreshToken } = refresher.data.refresh;
                handleLensLogin(accessToken, refreshToken);
            } catch (err) {
                console.log("Couldn't refresh! ", err);
            }
        }

        const lclStrorage = window.localStorage;
        const localToken = lclStrorage.getItem('lens-auth-token');
        if (localToken) {
            const localRefreshToken = lclStrorage.getItem('lens-refresh-token');
            if (localRefreshToken) refreshTkn(localRefreshToken);
            setToken(localToken);
        }
    }, []);

    async function handleLensLogin(token, refresh) {
        setToken(token);
        window.localStorage.setItem('lens-auth-token', token);
        window.localStorage.setItem('lens-refresh-token', refresh);
    }

    async function handleLensLogout() {
        setToken('');
        window.localStorage.removeItem('lens-auth-token');
        window.localStorage.removeItem('lens-refresh-token');
    }

    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
                chains={chains}
                theme={lightTheme({
                    accentColor: '#ff3b6a',
                    accentColorForeground: '#ffffdd',
                    borderRadius: 'small',
                    fontStack: 'system',
                    overlayBlur: 'none',
                })}
                modalSize='compact'
            >
                <ApolloProvider client={ipfontsClient}>
                    <MainContainer>
                        <NavBar
                            handleConnected={handleConnected}
                            handleLensLogin={handleLensLogin}
                            handleLensLogout={handleLensLogout}
                            token={token}
                        />
                        <Component
                            {...pageProps}
                            font={font}
                            user={user}
                            connected={connected}
                            token={token}
                            address={address}
                        />
                        <Footer />
                    </MainContainer>
                </ApolloProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}
