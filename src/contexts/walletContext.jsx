import { createContext } from "react";

const WalletContext = createContext({
  account: "",
  balance: null,
  isWallwtConnected: false,
  connectwallet: () => {},
  disconnectwallet: () => {},
});

export default WalletContext;
