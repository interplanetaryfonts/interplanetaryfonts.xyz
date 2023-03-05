// Global imports
import { useEffect, useState } from "react";
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
import useIronSessionRainbowAuthAdapter from "../hooks/useIronSessionRainbowAuthAdapter";

// InterplanetaryFonts GraphQL
import { ApolloProvider } from "@apollo/client";
import { client as ipfontsClient } from "../apollo-client";

// Lens API
import { client as lensClient, refresh } from "../clientApi";

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

// Dummy Data: Will be replaced by our SubGraph response
import { fakeUser, fakeFont } from "../utils/dummyData";

export default function MyApp({ Component, pageProps }) {
  const { address } = useAccount();
  const { authAdapter, authStatus, isConnected } =
    useIronSessionRainbowAuthAdapter();

  const [token, setToken] = useState();

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
    const localToken = lclStrorage.getItem("lens-auth-token");
    if (localToken) {
      const localRefreshToken = lclStrorage.getItem("lens-refresh-token");
      if (localRefreshToken) {
        refreshTkn(localRefreshToken);
      }
      setToken(localToken);
    }
  }, []);

  async function handleLensLogin(token, refresh) {
    setToken(token);
    window.localStorage.setItem("lens-auth-token", token);
    window.localStorage.setItem("lens-refresh-token", refresh);
  }

  async function handleLensLogout() {
    setToken("");
    window.localStorage.removeItem("lens-auth-token");
    window.localStorage.removeItem("lens-refresh-token");
  }

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
            <MainContainer>
              <Disclaimer />
              <NavBar
                handleLensLogin={handleLensLogin}
                handleLensLogout={handleLensLogout}
                token={token}
              />
              <Component
                {...pageProps}
                font={fakeFont}
                user={fakeUser}
                connected={isConnected}
                token={token}
                address={address}
              />
              <Footer />
            </MainContainer>
          </ApolloProvider>
        </RainbowKitProvider>
      </RainbowKitAuthenticationProvider>
    </WagmiConfig>
  );
}
