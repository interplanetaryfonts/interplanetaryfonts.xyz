import { useEffect, useCallback } from "react";
import {
  client as lensClient,
  refresh,
  challenge,
  authenticate,
} from "../clientApi";
import { ethers } from "ethers";

const useLensToken = (setToken, setIsLensConnected) => {
  // Local storage token management
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

  // Lens refresh functions
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
      setToken(accessToken, refreshToken);
    } catch (err) {
      window.localStorage.removeItem("lens-auth-token");
      console.log("Error signing in: ", err);
    }
  };
  const refreshRequest = useCallback(async () => {
    // Check for Lens Token already in local storage
    const localStorage = window.localStorage;
    const localToken = localStorage.getItem("lens-auth-token");
    // If there's a token the refresh request is started
    if (localToken) {
      const localRefreshToken = localStorage.getItem("lens-refresh-token");
      if (localRefreshToken) {
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
          return;
        }
      } else {
        return;
      }
    }
    // Set the session token
    setToken(localStorage);
  }, [storeToken, removeToken, setToken]);

  // Checks connection when the app starts
  useEffect(() => {
    refreshRequest();
  }, [refreshRequest]);

  return { storeToken, removeToken, lensLogin };
};

export default useLensToken;
