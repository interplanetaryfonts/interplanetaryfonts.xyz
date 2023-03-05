import { useState, createContext } from "react";
import useLensToken from "../hooks/useLensToken";

export const LensContext = createContext({
  token: "",
  isLensConnected: false,
  storeToken: () => {},
  removeToken: () => {},
  lensLogin: () => {},
});

export default function LensContextProvider(props) {
  const [token, setToken] = useState("");
  const [isLensConnected, setIsLensConnected] = useState(false);
  const { storeToken, removeToken, lensLogin } = useLensToken(
    setToken,
    setIsLensConnected
  );

  return (
    <LensContext.Provider
      value={{
        token,
        isLensConnected,
        storeToken,
        removeToken,
        lensLogin,
      }}
    >
      {props.children}
    </LensContext.Provider>
  );
}
