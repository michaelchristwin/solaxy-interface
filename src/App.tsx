import "./App.css";
import React, { useState, useMemo, useEffect } from "react";
import { RefreshCcw, Settings, Info } from "lucide-react";
import { useAccount, useReadContracts } from "wagmi";
//import {readContracts} from "@wagmi/core"
import {
  TransactionTab,
  useAppContext,
} from "@/providers/app.context-provider";
import { SLX } from "./assets/token-logos";
import ActionButtonText from "./components/action-button-text";
import { ConnectKitButton } from "connectkit";
import OutputPanel from "./components/output-panel";
import InputPanel from "./components/input-panel";
import { sDAIContract, solaxyContract } from "./config/contracts";
import { formatUnits, parseEther } from "viem";

const App: React.FC = () => {
  const { activeTab, inputMode, setActiveTab, setInputMode, selectedToken } =
    useAppContext();
  const { isConnected, address } = useAccount();
  const [inputAmount, setInputAmount] = useState("");

  const [slippageTolerance, setSlippageTolerance] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

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
  const { data: assetsContractsData } = useReadContracts({
    contracts: [
      {
        ...sDAIContract,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...solaxyContract,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...solaxyContract,
        functionName: "previewWithdraw",
        args: [parseEther("1")],
      },
      {
        ...solaxyContract,
        functionName: "previewMint",
        args: [parseEther("1")],
      },
    ],
  });
  const sDAIBalance = assetsContractsData?.[0].result as bigint | undefined;
  const solaxyBalance = assetsContractsData?.[1].result as bigint | undefined;
  const assetSLX = assetsContractsData?.[2].result as bigint | undefined;
  const assetsDAI = assetsContractsData?.[3].result as bigint | undefined;
  console.log(assetSLX && formatUnits(assetSLX, 18));

  const calculateOutputAmount = (input: string): string => {
    if (!input) return "";
    if (isReversed) {
      if (assetsDAI)
        return (Number(formatUnits(assetsDAI, 18)) * Number(input)).toFixed(2);

      return "";
    } else {
      if (assetSLX)
        return (Number(formatUnits(assetSLX, 18)) * Number(input)).toFixed(2);
      return "";
    }
  };
  const [outputAmount, setOutputAmount] = useState(
    calculateOutputAmount(inputAmount)
  );
  useEffect(() => {
    setOutputAmount(calculateOutputAmount(inputAmount));
  }, [inputAmount, activeTab, inputMode]);
  // console.log(balance);

  // Memoized exchange rate calculation

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setInputAmount(value);
    }
  };
  function formatTokenAmount(amount?: bigint, decimals = 18) {
    if (!amount) {
      return "0.00";
    }
    // Format the token amount with the specified number of decimals
    const formattedAmount = formatUnits(amount, decimals);
    // Convert to a number and format to 2 decimal places
    return Number(formattedAmount).toFixed(2);
  }
  const toggleInputMode = () => {
    setInputMode(inputMode === "stable" ? "slx" : "stable");

    setInputAmount(outputAmount);
    setOutputAmount(inputAmount);
    setIsReversed((p) => !p);
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
      return "You send";
    } else {
      // Sell mode

      return "You receive";
    }
  };

  const getOutputLabel = () => {
    if (activeTab === "buy") {
      // Buy mode
      return "You receive";
    } else {
      // Sell mode
      return "You send";
    }
  };

  const getSlippageLabel = () => {
    if (activeTab === "buy") {
      if (inputMode === "stable") return "Min received:";
      return "Max spend:";
    } else {
      if (inputMode === "stable") return "Max burn";
      return "Min collect";
    }
  };

  const bgColors = {
    sell: "bg-gradient-to-br from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 dark:from-red-600 dark:to-yellow-500 dark:hover:from-red-700 dark:hover:to-yellow-600",
    buy: "bg-gradient-to-br from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 dark:from-green-600 dark:to-yellow-500 dark:hover:from-green-700 dark:hover:to-yellow-600",
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-[30px] h-[30px] rounded-full overflow-hidden flex-shrink-0">
            <img
              src={SLX}
              alt={`SLX logo`}
              className="w-full h-full object-cover"
            />
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
      <div
        className={`gap-y-3 relative flex ${
          isReversed ? "flex-col-reverse" : "flex-col"
        }`}
      >
        {/* Input Panel */}
        <InputPanel
          handleInputChange={handleInputChange}
          inputAmount={inputAmount}
          outputAmount={outputAmount}
          isReversed={isReversed}
          getInputLabel={getInputLabel}
          activeTab={activeTab}
          balance={formatTokenAmount(sDAIBalance as bigint)}
        />
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
        <OutputPanel
          handleInputChange={handleInputChange}
          outputAmount={outputAmount}
          inputAmount={inputAmount}
          isReversed={isReversed}
          getOutputLabel={getOutputLabel}
          activeTab={activeTab}
          balance={formatTokenAmount(solaxyBalance as bigint)}
        />
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
            <span>{getSlippageLabel()}</span>
            <span>
              {minReceived}{" "}
              {inputMode === "stable" ? "SLX" : selectedToken.symbol}
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
      {isConnected ? (
        <button
          className={`w-full mt-6 space-x-1 py-3.5 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${bgColors[activeTab]}`}
          onClick={executeTransaction}
          disabled={!inputAmount || parseFloat(inputAmount) === 0}
        >
          <ActionButtonText {...{ activeTab, selectedToken }} />
        </button>
      ) : (
        <ConnectKitButton.Custom>
          {({ show }) => {
            return (
              <button
                onClick={show}
                className={`w-full bg-neutral-800 text-white h-[44px] my-2 rounded-lg text-center`}
              >
                Connect Wallet
              </button>
            );
          }}
        </ConnectKitButton.Custom>
      )}

      {/* Footer */}
      <div className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
        Powered by Solaxy Protocol • v1.0.5
      </div>
    </div>
  );
};

export default App;
