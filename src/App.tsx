import "./App.css";
import React, { useState, useMemo } from "react";
import { RefreshCcw, Settings, Info } from "lucide-react";

import TokensPopup from "@/components/tokens-popup";
import {
  InputMode,
  TokenStruct,
  TransactionTab,
  useAppContext,
} from "@/providers/app.context-provider";
import { SLX } from "./assets/token-logos";

const App: React.FC = () => {
  const { activeTab, inputMode, setActiveTab, setInputMode, selectedToken } =
    useAppContext();
  const [inputAmount, setInputAmount] = useState("");
  const [slippageTolerance, setSlippageTolerance] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);

  // Memoized exchange rate calculation
  const exchangeRates = useMemo(
    () => ({
      buy: {
        stable: 1.25, // 1 USDC = 1.25 SLX
        slx: 0.8, // 1 SLX = 0.8 USDC
      },
      sell: {
        stable: 0.8, // 1 SLX = 0.8 USDC
        slx: 1.25, // 1 USDC = 1.25 SLX
      },
    }),
    []
  );

  // Calculate output amount based on input
  const calculateOutputAmount = (input: string): string => {
    if (!input) return "";

    const rate = exchangeRates[activeTab][inputMode];
    const numValue = parseFloat(input);
    return (numValue * rate).toFixed(6);
  };

  const outputAmount = useMemo(
    () => calculateOutputAmount(inputAmount),
    [inputAmount, activeTab, inputMode]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setInputAmount(value);
    }
  };

  const toggleInputMode = () => {
    setInputMode(inputMode === "stable" ? "slx" : "stable");
    setInputAmount(outputAmount);
  };

  const executeTransaction = () => {
    // Placeholder for actual transaction logic
    console.log("Transaction initiated", {
      tab: activeTab,
      inputMode,
      inputAmount,
      outputAmount,
      slippageTolerance,
    });
  };

  // Calculate transaction details
  const minReceived = useMemo(() => {
    if (!outputAmount) return "0.000000";
    return (parseFloat(outputAmount) * (1 - slippageTolerance / 100)).toFixed(
      6
    );
  }, [outputAmount, slippageTolerance]);

  const conversionRate = useMemo(() => {
    const rate = exchangeRates[activeTab][inputMode];
    return inputMode === "stable"
      ? `1 USDC ≈ ${rate} SLX`
      : `1 SLX ≈ ${rate} USDC`;
  }, [activeTab, inputMode, exchangeRates]);

  // Get input and output labels based on token positions and active tab
  const getInputLabel = () => {
    if (activeTab === "buy") {
      // Buy mode
      if (inputMode === "stable") return "You pay";
      return "Mint";
    } else {
      // Sell mode
      if (inputMode === "slx") return "Redeem";
      return "You receive";
    }
  };

  const getOutputLabel = () => {
    if (activeTab === "buy") {
      // Buy mode
      if (inputMode === "stable") return "You receive";
      return "You pay";
    } else {
      // Sell mode
      if (inputMode === "slx") return "You receive";
      return "You pay";
    }
  };
  const bgColors = {
    sell: "bg-gradient-to-br from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 dark:from-red-600 dark:to-yellow-500 dark:hover:from-red-700 dark:hover:to-yellow-600",
    buy: "bg-gradient-to-br from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 dark:from-green-600 dark:to-yellow-500 dark:hover:from-green-700 dark:hover:to-yellow-600",
  };
  const getActionButtonText = (
    inputMode: InputMode,
    activeTab: TransactionTab,
    selectedToken: TokenStruct
  ) => {
    if (activeTab === "buy") {
      if (inputMode === "stable")
        return (
          <div
            className={`w-full flex items-center justify-center space-x-1.5`}
          >
            <p>Deposit {selectedToken.symbol}</p>
            <div className="w-[22px] h-[22px] rounded-full overflow-hidden flex-shrink-0">
              <img
                src={selectedToken.logo}
                alt={`${selectedToken.symbol} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );
      return (
        <div className={`w-full flex items-center justify-center space-x-1.5`}>
          <p>Mint SLX</p>
          <div className="w-[22px] h-[22px] rounded-full overflow-hidden flex-shrink-0">
            <img
              src={SLX}
              alt={`SLX logo`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      );
    } else {
      if (inputMode === "stable")
        return (
          <div
            className={`w-full flex items-center justify-center space-x-1.5`}
          >
            <p>Withdraw {selectedToken.symbol}</p>
            <div className="w-[22px] h-[22px] rounded-full overflow-hidden flex-shrink-0">
              <img
                src={selectedToken.logo}
                alt={`${selectedToken.symbol} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );
      return (
        <div className={`w-full flex items-center justify-center space-x-1.5`}>
          <p>Redeem SLX</p>
          <div className="w-[22px] h-[22px] rounded-full overflow-hidden flex-shrink-0">
            <img
              src={SLX}
              alt={`SLX logo`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-2">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 22L19 12M12 22L5 12M12 22L12 15M19 12L12 2M19 12L12 15M5 12L12 2M5 12L12 15M12 2L12 15"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            SOLAXY
          </h1>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-6">
        {(["buy", "sell"] as TransactionTab[]).map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2.5 rounded-md font-medium transition-all ${
              activeTab === tab
                ? "bg-white dark:bg-gray-700 text-yellow-600 dark:text-yellow-400 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} SLX
          </button>
        ))}
      </div>

      {/* Transaction Interface */}
      <div className="space-y-2 relative">
        {/* Input Panel */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {getInputLabel()}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Balance: 0.00
            </span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <input
              type="text"
              className="text-left text-2xl font-medium bg-transparent outline-none w-full text-gray-800 dark:text-gray-100"
              placeholder="0.00"
              value={inputAmount}
              onChange={handleInputChange}
            />
            <div className="ml-2">
              {inputMode === "stable" ? (
                <TokensPopup />
              ) : (
                <div className="py-2 px-3 bg-white dark:bg-gray-700 font-medium flex items-center justify-center space-x-2 w-[150px] rounded-[30px] border">
                  <div className="w-[22px] h-[22px] rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={SLX}
                      alt={`SLX logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>SLX</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mode Toggle Button */}
        <div className="flex justify-center -my-1 z-10 absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
          <button
            onClick={toggleInputMode}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            <RefreshCcw className="w-4 h-4 text-yellow-600 dark:text-yellow-400 active:animate-spin" />
          </button>
        </div>

        {/* Output Panel */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {getOutputLabel()}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Balance: 0.00
            </span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <input
              type="text"
              readOnly
              value={outputAmount}
              className="text-left text-2xl font-medium bg-transparent outline-none w-full text-gray-800 dark:text-gray-100"
              placeholder="0.00"
            />
            <div className="ml-2">
              {inputMode === "stable" ? (
                <div className="py-2 px-3 bg-white border dark:bg-gray-700 font-medium flex items-center justify-center space-x-2 w-[150px] rounded-[30px]">
                  <div className="w-[22px] h-[22px] rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={SLX}
                      alt={`SLX logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>SLX</span>
                </div>
              ) : (
                <TokensPopup />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rate information */}
      <div className="mt-3 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 px-1">
        <div className="flex items-center">
          <span>{conversionRate}</span>
          <Info className="w-3 h-3 ml-1 text-gray-400" />
        </div>
      </div>

      {/* Transaction Settings - Toggleable */}
      {showSettings && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Slippage Tolerance
            </span>
            <div className="flex space-x-1">
              {[0.1, 0.5, 1.0].map((value) => (
                <button
                  key={value}
                  className={`px-3 py-1 rounded-md text-xs transition-colors ${
                    slippageTolerance === value
                      ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                  onClick={() => setSlippageTolerance(value)}
                >
                  {value}%
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
            <span>Min. received:</span>
            <span>
              {minReceived} {inputMode === "stable" ? "SLX" : "USDC"}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
            <span>Price impact:</span>
            <span className="text-green-600 dark:text-green-400">
              &lt; 0.01%
            </span>
          </div>
        </div>
      )}

      {/* Action Button */}
      <button
        className={`w-full mt-6 space-x-1 py-3.5 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${bgColors[activeTab]}`}
        onClick={executeTransaction}
        disabled={!inputAmount || parseFloat(inputAmount) === 0}
      >
        {getActionButtonText(inputMode, activeTab, selectedToken)}
      </button>

      {/* Footer */}
      <div className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
        Powered by Solaxy Protocol • v1.0.5
      </div>
    </div>
  );
};

export default App;
