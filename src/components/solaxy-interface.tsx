import { useState } from "react";
import { RefreshCw } from "lucide-react";

import TokensDropdown from "./tokens-dropdown";

type BuyMode = "stable" | "slx";
const SolaxyInterface = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [inputMode, setInputMode] = useState<BuyMode>("stable"); // 'spend' or 'receive'
  const [inputAmount, setInputAmount] = useState("");
  const [outputAmount, setOutputAmount] = useState("");
  const [slippageTolerance, setSlippageTolerance] = useState(0.5);

  // Mock exchange rate for preview calculations
  const mockExchangeRate = 1.25; // 1 USDC = 1.25 SLX (example rate)

  // Handle input change event
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Validate input to allow only numbers and decimal points
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setInputAmount(value);

      // Calculate preview based on input mode and active tab
      if (value) {
        const numValue = parseFloat(value);
        if (activeTab === "buy") {
          if (inputMode === "stable") {
            // Calculate output amount for buying SLX by spending USDC
            setOutputAmount((numValue * mockExchangeRate).toFixed(6));
          } else {
            // Calculate output amount for buying USDC by spending SLX
            setOutputAmount((numValue / mockExchangeRate).toFixed(6));
          }
        } else {
          // Active tab is sell
          if (inputMode === "stable") {
            // Calculate output amount for selling SLX by spending SLX
            setOutputAmount((numValue / mockExchangeRate).toFixed(6));
          } else {
            // Calculate output amount for selling USDC by spending USDC
            setOutputAmount((numValue * mockExchangeRate).toFixed(6));
          }
        }
      } else {
        // Clear output amount if input is empty
        setOutputAmount("");
      }
    }
  };

  const toggleInputMode = () => {
    setInputMode(inputMode === "stable" ? "slx" : "stable");
    // Swap input and output values
    setInputAmount(outputAmount);
    setOutputAmount(inputAmount);
  };

  const handleSlippageChange = (value: number) => {
    setSlippageTolerance(value);
  };

  const executeTransaction = () => {
    console.log("lol");
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-6 rounded-xl bg-gray-50 dark:bg-zinc-900 shadow-lg dark:shadow-zinc-800/30">
      {/* Logo */}
      <div className="mb-6 flex items-center justify-center">
        <div className="w-12 h-12 bg-yellow-400 dark:bg-yellow-500 rounded-full flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 text-white"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
        <span className="ml-2 text-2xl font-bold text-gray-800 dark:text-white">
          SOLAXY
        </span>
      </div>

      {/* Tab Selector */}
      <div className="flex w-full mb-6 bg-gray-200 dark:bg-zinc-800 rounded-lg p-1">
        <button
          className={`flex-1 py-2 rounded-md text-gray-700 dark:text-gray-200 transition-colors ${
            activeTab === "buy"
              ? "bg-white dark:bg-zinc-700 shadow-sm text-gray-900 dark:text-white"
              : "hover:bg-gray-100 dark:hover:bg-zinc-750"
          }`}
          onClick={() => setActiveTab("buy")}
        >
          Buy SLX
        </button>
        <button
          className={`flex-1 py-2 rounded-md text-gray-700 dark:text-gray-200 transition-colors ${
            activeTab === "sell"
              ? "bg-white dark:bg-zinc-700 shadow-sm text-gray-900 dark:text-white"
              : "hover:bg-gray-100 dark:hover:bg-zinc-750"
          }`}
          onClick={() => setActiveTab("sell")}
        >
          Sell SLX
        </button>
      </div>

      {/* Input/Output Panel */}
      <div className="w-full space-y-4">
        <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700">
          <div className="flex justify-between mb-2 w-full">
            <span className="text-gray-600 dark:text-gray-300">
              {inputMode === "stable" ? "You pay" : "Mint"}
            </span>
            <input
              type="text"
              className="w-[20%] placeholder:text-end text-2xl bg-transparent outline-none text-gray-800 dark:text-gray-100"
              placeholder="0.00"
              value={inputAmount}
              onChange={handleInputChange}
            />
          </div>

          {inputMode === "stable" ? (
            <TokensDropdown />
          ) : (
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="green"
                >
                  <circle cx="12" cy="12" r="12" fill="green" />
                  <path
                    d="M7 12l3 3 7-7"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <span className="font-medium">SLX</span>
            </div>
          )}

          <div className="flex items-center"></div>
        </div>

        {/* Swap Direction Button */}
        <div className="flex justify-center">
          <button
            onClick={toggleInputMode}
            className="bg-gray-200 dark:bg-zinc-700 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-zinc-600 text-gray-700 dark:text-gray-200 transition-colors"
          >
            <RefreshCw className={`w-4 h-4`} />
          </button>
        </div>

        <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700">
          <div className="flex justify-between mb-2 w-full">
            <span className="text-gray-600 dark:text-gray-300">
              {inputMode === "stable" ? "You receive" : "You pay"}
            </span>
            <input
              type="text"
              className="w-[20%] placeholder:text-end text-2xl bg-transparent outline-none text-gray-800 dark:text-gray-100"
              placeholder="0.00"
              value={inputAmount}
              onChange={handleInputChange}
            />
          </div>

          {inputMode === "stable" ? (
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="green"
                >
                  <circle cx="12" cy="12" r="12" fill="green" />
                  <path
                    d="M7 12l3 3 7-7"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <span className="font-medium">SLX</span>
            </div>
          ) : (
            <TokensDropdown />
          )}
        </div>
      </div>

      {/* Transaction Settings */}
      <div className="w-full mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Slippage Tolerance
          </span>
          <div className="flex space-x-2">
            {[0.1, 0.5, 1.0].map((value) => (
              <button
                key={value}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  slippageTolerance === value
                    ? "bg-yellow-200 dark:bg-yellow-600 text-yellow-800 dark:text-yellow-100"
                    : "bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zinc-600"
                }`}
                onClick={() => handleSlippageChange(value)}
              >
                {value}%
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
          <span>Min. received:</span>
          <span>
            {outputAmount
              ? (
                  parseFloat(outputAmount) *
                  (1 - slippageTolerance / 100)
                ).toFixed(6)
              : "0.000000"}{" "}
            SLX
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button
        className="w-full mt-6 py-3 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white font-medium rounded-lg transition-colors"
        onClick={executeTransaction}
        disabled={!inputAmount || parseFloat(inputAmount) === 0}
      >
        Buy SLX
      </button>
    </div>
  );
};

export default SolaxyInterface;
