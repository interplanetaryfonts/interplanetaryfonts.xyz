import { useEffect, useCallback } from "react";
import {
  client as lensClient,
  refresh,
  challenge,
  authenticate,
} from "../clientApi";
import { ethers } from "ethers";

const useLensToken = (setToken, setIsLensConnected) => {
  // Local storage and state token management
  const storeToken = useCallback(
    (token, refresh) => {
      setToken(token);
      window.localStorage.setItem("lens-auth-token", token);
      window.localStorage.setItem("lens-refresh-token", refresh);
      setIsLensConnected(true);
    },
    [setToken, setIsLensConnected]
  );
  const removeToken = useCallback(() => {
    setToken("");
    window.localStorage.removeItem("lens-auth-token");
    window.localStorage.removeItem("lens-refresh-token");
    setIsLensConnected(false);
  }, [setToken, setIsLensConnected]);
  // Lens session functions
  // Connect
  const lensLogin = async (lensaddress) => {
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
          signature,
        },
      });
      const {
        data: {
          authenticate: { accessToken, refreshToken },
        },
      } = authData;
      storeToken(accessToken, refreshToken);
    } catch (err) {
      removeToken();
      alert("Error signing in, refresh the page and try agai!");
    }
  };
  const refreshRequest = useCallback(async () => {
    // Check for Lens Token already in local storage
    const localStorage = window.localStorage;
    const localToken = localStorage.getItem("lens-auth-token");
    const localRefreshToken = localStorage.getItem("lens-refresh-token");
    // If there's a token the refresh request is started
    if (localToken && localRefreshToken) {
      try {
        // Sets the new token and refresh token
        const refresher = await lensClient.mutate({
          mutation: refresh,
          variables: { refreshToken: localRefreshToken },
        });
        const { accessToken, refreshToken } = refresher.data.refresh;
        storeToken(accessToken, refreshToken);
      } catch (_) {
        // Removes the previous token and sends an alert
        removeToken();
        alert(
          "Couldn't refresh Lens Token, close your session and sign-up again!"
        );
      }
    }
  }, [storeToken, removeToken]);

  // Checks connection when the app starts
  useEffect(() => {
    refreshRequest();
  }, [refreshRequest]);

  return { removeToken, lensLogin };
};

export default useLensToken;
