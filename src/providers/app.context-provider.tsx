import { USDC } from "@/assets/token-logos";
import { createContext, useState, useContext, ReactNode } from "react";

export type InputMode = "stable" | "slx";
export type TransactionTab = "buy" | "sell";
export type TokenStruct = {
  symbol: string;
  address: string;
  logo: string;
  balance: string;
};

interface AppContextType {
  inputMode: InputMode;
  activeTab: TransactionTab;
  setInputMode: (mode: InputMode) => void;
  setActiveTab: (tab: TransactionTab) => void;
  selectedToken: TokenStruct;
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
  const [activeTab, setActiveTab] = useState<TransactionTab>("buy");
  const [inputMode, setInputMode] = useState<InputMode>("stable");
  const [selectedToken, setSelectedToken] = useState<TokenStruct>({
    symbol: "USDC",
    address: "0xA0b8...eB48",
    logo: USDC,
    balance: "0.00",
  });

  return (
    <AppContext.Provider
      value={{
        activeTab,
        inputMode,
        selectedToken,
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
