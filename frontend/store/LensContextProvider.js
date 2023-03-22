import { useState, createContext } from "react";
import useLensToken from "../hooks/useLensToken";

export const LensContext = createContext({
  token: "",
  isLensConnected: false,
  removeToken: () => {},
  lensLogin: () => {},
});

export default function LensContextProvider(props) {
  const [token, setToken] = useState("");
  const [isLensConnected, setIsLensConnected] = useState(false);
  const { removeToken, lensLogin } = useLensToken(setToken, setIsLensConnected);

  return (
    <LensContext.Provider
      value={{
        token,
        isLensConnected,
        removeToken,
        lensLogin,
      }}
    >
      {props.children}
    </LensContext.Provider>
  );
}
