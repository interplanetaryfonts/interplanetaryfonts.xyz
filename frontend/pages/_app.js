// Styles
import "../styles/reset.css";
import "../styles/fonts.css";
import "../styles/variables.css";
import "../styles/globals.css";

// Connect wallet modules
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  RainbowKitAuthenticationProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig, useAccount } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

// Custom Hooks
import useIronSessionRainbowAuthAdapter from "../hooks/useIronSessionRainbowAuthAdapter";

// InterplanetaryFonts GraphQL
import { ApolloProvider } from "@apollo/client";
import { client as ipfontsClient } from "../apollo-client";

// Components
import NavBar from "../components/UI/NavBar";
import MainContainer from "../components/UI/MainContainer";
import Footer from "../components/UI/Footer";
import Disclaimer from "../components/UI/Disclaimer";

// Wallet connect objects
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;
const { chains, provider } = configureChains(
  [polygonMumbai],
  [infuraProvider({ infuraId }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "frontend",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

// Contexts
import LensContextProvider from "../store/LensContextProvider";

// Dummy Data: Will be replaced by our SubGraph response
import { fakeUser, fakeFont } from "../utils/dummyData";

export default function MyApp({ Component, pageProps }) {
  const { address } = useAccount();
  const { authAdapter, authStatus, isConnected } =
    useIronSessionRainbowAuthAdapter();

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitAuthenticationProvider
        adapter={authAdapter}
        status={authStatus}
      >
        <RainbowKitProvider
          chains={chains}
          theme={lightTheme({
            accentColor: "#ff3b6a",
            accentColorForeground: "#ffffdd",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "none",
          })}
          modalSize="compact"
        >
          <ApolloProvider client={ipfontsClient}>
            <LensContextProvider>
              <MainContainer>
                <Disclaimer />
                <NavBar />
                <Component
                  {...pageProps}
                  font={fakeFont}
                  user={fakeUser}
                  connected={isConnected}
                  address={address}
                />
                <Footer />
              </MainContainer>
            </LensContextProvider>
          </ApolloProvider>
        </RainbowKitProvider>
      </RainbowKitAuthenticationProvider>
    </WagmiConfig>
  );
}
