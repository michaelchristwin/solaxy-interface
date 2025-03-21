import { USD3 } from "~/assets/token-logos";
import { createContext, useState, useContext, type ReactNode } from "react";

export type InputMode = "stable" | "slx";
export type TransactionTab = "mint" | "melt" | "bridge";
export type TransactionMode = "mint" | "melt";
export type TokenStruct = {
  symbol: string;
  address: string;
  logo: string;
  balance: string;
};

interface AppContextType {
  inputMode: InputMode;
  activeTab: TransactionTab;
  transactionMode: TransactionMode;
  selectedToken: TokenStruct;
  setInputMode: (mode: InputMode) => void;
  setTransactionMode: (mode: TransactionMode) => void;
  setActiveTab: (tab: TransactionTab) => void;
  setSelectedToken: (token: TokenStruct) => void;
}

// Create context with a meaningful default or null + type assertion
const AppContext = createContext<AppContextType | null>(null);

// Custom hook for consuming the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}

// Provider component
export function AppContextProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TransactionTab>("mint");
  const [inputMode, setInputMode] = useState<InputMode>("stable");
  const [transactionMode, setTransactionMode] =
    useState<TransactionMode>("mint");
  const [selectedToken, setSelectedToken] = useState<TokenStruct>({
    symbol: "USD3",
    address: "0x0d86883FAf4FfD7aEb116390af37746F45b6f378",
    logo: USD3,
    balance: "0.00",
  });

  return (
    <AppContext.Provider
      value={{
        activeTab,
        inputMode,
        selectedToken,
        transactionMode,
        setTransactionMode(mode) {
          setTransactionMode(mode);
        },
        setActiveTab(tab) {
          setActiveTab(tab);
        },
        setInputMode(mode) {
          setInputMode(mode);
        },
        setSelectedToken(token) {
          setSelectedToken(token);
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
