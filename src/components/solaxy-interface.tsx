import { useState } from "react";

const SolaxyInterface = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [inputMode, setInputMode] = useState("spend"); // 'spend' or 'receive'
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
          if (inputMode === "spend") {
            // Calculate output amount for buying SLX by spending USDC
            setOutputAmount((numValue * mockExchangeRate).toFixed(6));
          } else {
            // Calculate output amount for buying USDC by spending SLX
            setOutputAmount((numValue / mockExchangeRate).toFixed(6));
          }
        } else {
          // Active tab is sell
          if (inputMode === "spend") {
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
    setInputMode(inputMode === "spend" ? "receive" : "spend");
    // Swap input and output values
    setInputAmount(outputAmount);
    setOutputAmount(inputAmount);
  };

  const handleSlippageChange = (value: number) => {
    setSlippageTolerance(value);
  };

  const getInputCurrency = () => {
    if (activeTab === "buy") {
      return inputMode === "spend" ? "USDC" : "SLX";
    } else {
      return inputMode === "spend" ? "SLX" : "USDC";
    }
  };

  const getOutputCurrency = () => {
    if (activeTab === "buy") {
      return inputMode === "spend" ? "SLX" : "USDC";
    } else {
      return inputMode === "spend" ? "USDC" : "SLX";
    }
  };

  const getActionLabel = () => {
    if (activeTab === "buy") {
      return inputMode === "spend" ? "Deposit" : "Mint";
    } else {
      return inputMode === "spend" ? "Redeem" : "Withdraw";
    }
  };

  const executeTransaction = () => {
    alert(
      `Executing ${getActionLabel()}: ${inputAmount} ${getInputCurrency()} → ${outputAmount} ${getOutputCurrency()}`
    );
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-6 rounded-xl bg-gray-50 dark:bg-[#1A1B1B] shadow-lg">
      {/* Logo */}
      <div className="mb-6 flex items-center justify-center">
        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
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
      <div className="flex w-full mb-6 bg-gray-200 rounded-lg p-1">
        <button
          className={`flex-1 py-2 rounded-md ${
            activeTab === "buy" ? "bg-white dark:bg-neutral-800 shadow-sm" : ""
          }`}
          onClick={() => setActiveTab("buy")}
        >
          Buy SLX
        </button>
        <button
          className={`flex-1 py-2 rounded-md ${
            activeTab === "sell" ? "bg-white dark:bg-neutral-800 shadow-sm" : ""
          }`}
          onClick={() => setActiveTab("sell")}
        >
          Sell SLX
        </button>
      </div>

      {/* Input/Output Panel */}
      <div className="w-full space-y-4">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">
              {inputMode === "spend" ? "You spend" : "You receive"}
            </span>
            <span className="text-gray-600">
              Balance: 1000.00 {getInputCurrency()}
            </span>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              className="w-full text-2xl bg-transparent outline-none"
              placeholder="0.00"
              value={inputAmount}
              onChange={handleInputChange}
            />
            <div className="flex-shrink-0 bg-gray-100 px-3 py-1 rounded-md text-gray-700 font-medium">
              {getInputCurrency()}
            </div>
          </div>
        </div>

        {/* Swap Direction Button */}
        <div className="flex justify-center">
          <button
            onClick={toggleInputMode}
            className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">
              {inputMode === "spend" ? "You receive" : "You spend"}
            </span>
            <span className="text-gray-600">
              Balance: 800.00 {getOutputCurrency()}
            </span>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              className="w-full text-2xl bg-transparent outline-none"
              placeholder="0.00"
              value={outputAmount}
              disabled
            />
            <div className="flex-shrink-0 bg-gray-100 px-3 py-1 rounded-md text-gray-700 font-medium">
              {getOutputCurrency()}
            </div>
          </div>
        </div>
      </div>

      {/* Bonding Curve Preview */}
      <div className="w-full mt-6 p-4 bg-white rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-600 mb-2">
          Bonding Curve Preview
        </h3>
        <div className="h-24 bg-gray-50 rounded-md flex items-center justify-center relative overflow-hidden">
          {/* Simple curve visualization */}
          <svg viewBox="0 0 100 40" className="w-full h-full">
            <path
              d="M0,40 Q50,0 100,40"
              fill="none"
              stroke="#FBBF24"
              strokeWidth="2"
            />
          </svg>
          {/* Price indicator */}
          <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
            1 USDC ≈ {mockExchangeRate} SLX
          </div>
        </div>
      </div>

      {/* Transaction Settings */}
      <div className="w-full mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Slippage Tolerance</span>
          <div className="flex space-x-2">
            {[0.1, 0.5, 1.0].map((value) => (
              <button
                key={value}
                className={`px-2 py-1 text-xs rounded ${
                  slippageTolerance === value
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-gray-100"
                }`}
                onClick={() => handleSlippageChange(value)}
              >
                {value}%
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Min. received:</span>
          <span>
            {(
              parseFloat(outputAmount || "") *
              (1 - slippageTolerance / 100)
            ).toFixed(6)}{" "}
            {getOutputCurrency()}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button
        className="w-full mt-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg"
        onClick={executeTransaction}
        disabled={!inputAmount || parseFloat(inputAmount) === 0}
      >
        {getActionLabel()} {getOutputCurrency()}
      </button>
    </div>
  );
};

export default SolaxyInterface;
